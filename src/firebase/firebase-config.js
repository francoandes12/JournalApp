import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
const firebaseConfig = {
  apiKey: 'AIzaSyBrEebIgKVnZLRBkrKpdcs6tLYdqejeuUY',
  authDomain: 'journal-app-41370.firebaseapp.com',
  databaseURL: 'https://journal-app-41370.firebaseio.com',
  projectId: 'journal-app-41370',
  storageBucket: 'journal-app-41370.appspot.com',
  messagingSenderId: '360755909003',
  appId: '1:360755909003:web:a5145a62be81b9b7ef9f8e'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const googleProvider = new firebase.auth.GoogleAuthProvider()

const githubProvider = new firebase.auth.GithubAuthProvider()

export { db, googleProvider, firebase, githubProvider }
