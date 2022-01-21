import {NativeStackScreenProps} from "@react-navigation/native-stack";

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {
        }
    }
}

export type RootStackParamList = {
    Home: undefined;
    Chat: { name: string };
};

export type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type ChatProps = NativeStackScreenProps<RootStackParamList, 'Chat'>;