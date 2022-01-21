import React, {useEffect, useRef, useState} from "react";
import FirebaseStorage from "../data/FirebaseStorage";
import {SafeAreaView} from "react-native";
import {GiftedChat, IMessage, User} from "react-native-gifted-chat";
import {ChatProps} from "../types";

const ChatScreen: React.FC<ChatProps> = (props) => {
    const [messages, setMessages] = useState<IMessage[]>([])
    const prevMessages = useRef<IMessage[]>([]);
    const user = {
        name: props.route.params.name,
        _id: FirebaseStorage.uid,
    } as User;
    useEffect(() => {
        FirebaseStorage.on(messages => {
            const newMessages = GiftedChat.append(prevMessages.current, messages)
            prevMessages.current = newMessages
            setMessages(newMessages)
        })
        return function cleanup() {
            FirebaseStorage.off();
        }
    }, [])
    return <SafeAreaView style={{flex: 1}}>
        <GiftedChat
            messages={messages}
            onSend={FirebaseStorage.send}
            user={user}
        />
    </SafeAreaView>
}

export default ChatScreen