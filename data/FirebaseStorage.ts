import {getApps} from 'firebase/app';
import firebase from "firebase/compat";

class FirebaseStorage {
    constructor() {
        this.init();
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }

    get ref() {
        return firebase.database().ref('messages');
    }

    get timestamp() {
        return firebase.database.ServerValue.TIMESTAMP;
    }

    init = () => {
        if (!getApps().length) {
            const firebaseConfig = {
                apiKey: "AIzaSyDyMmFzMv1HE7pJ-EyO6eHLDmuuKrCacU0",
                authDomain: "fir-chat-4e842.firebaseapp.com",
                databaseURL: "https://fir-chat-4e842-default-rtdb.firebaseio.com",
                projectId: "fir-chat-4e842",
                storageBucket: "fir-chat-4e842.appspot.com",
                messagingSenderId: "295778429451",
                appId: "1:295778429451:web:22c386c808e3b5a3c2750e",
                measurementId: "G-HT05XS6NXL"
            };
            firebase.initializeApp(firebaseConfig);
            firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
        }
    }

    onAuthStateChanged = (user: firebase.User | null) => {
        if (!user) {
            try {
                firebase.auth().signInAnonymously();
            } catch ({message}) {
                alert(message);
            }
        }
    };

    parse = (snapshot: any) => {
        const {timestamp: numberStamp, text, user} = snapshot.val();
        const {key: _id} = snapshot;
        const timestamp = new Date(numberStamp);
        return {
            _id,
            timestamp,
            text,
            user,
        };
    };

    on = (callback: (messages: any) => void) =>
        this.ref
            .limitToLast(20)
            .on('child_added', snapshot => callback(this.parse(snapshot)));

    send = (messages: any[]) => {
        for (let i = 0; i < messages.length; i++) {
            const {text, user} = messages[i];
            const message = {
                text,
                user,
                timestamp: this.timestamp,
            };
            this.append(message);
        }
    };

    append = (message: any) => this.ref.push(message);

    off() {
        this.ref.off();
    }
}

const instance = new FirebaseStorage()

export default instance;
