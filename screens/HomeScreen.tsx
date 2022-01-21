import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View,} from 'react-native';
import {HomeProps} from "../types";

const HomeScreen: React.FC<HomeProps> = ({navigation}) => {
    const [name, setName] = useState('')
    return (
        <View>
            <Text style={styles.title}>Enter your name:</Text>
            <TextInput
                style={styles.nameInput}
                placeholder="Boris Johnson"
                onChangeText={setName}
                value={name}
            />
            <TouchableOpacity onPress={onNextPress}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </View>
    );

    function onNextPress() {
        navigation.navigate('Chat', {name});
    }
}

const offset = 24;
const styles = StyleSheet.create({
    title: {
        marginTop: offset,
        marginLeft: offset,
        fontSize: offset,
    },
    nameInput: {
        height: offset * 2,

        margin: offset,
        paddingHorizontal: offset,
        borderColor: '#111111',
        borderWidth: 1,
    },
    buttonText: {
        marginLeft: offset,
        fontSize: offset,
    },
});

export default HomeScreen;
