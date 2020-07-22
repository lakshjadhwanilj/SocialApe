import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyANoyBDRVFCRq5hwsOxx4uXsPhEWrcIHr0",
    authDomain: "socialape-ef4e5.firebaseapp.com",
    databaseURL: "https://socialape-ef4e5.firebaseio.com",
    projectId: "socialape-ef4e5",
    storageBucket: "socialape-ef4e5.appspot.com",
    messagingSenderId: "378565355802",
    appId: "1:378565355802:web:c248f7bbcf2c8d16e3e4a3",
    measurementId: "G-XYH854ZEXR"
};

// STORE USERS TO FIRESTORE
export const createUserProfileDocument = async (userAuth, additionalData) => {

    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const {
            displayName,
            email
        } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (err) {
            console.error('Error creating user', err.message);
        }
    }
    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;