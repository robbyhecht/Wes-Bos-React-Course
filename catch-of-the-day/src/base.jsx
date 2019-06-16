import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCGNCLpTg6v3mRQM35wUsW8ZsUHsgfmTy0",
    authDomain: "catch-of-the-day-robby-hecht.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-robby-hecht.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

//  This is a named export
export { firebaseApp };

//  This is a default export
export default base;