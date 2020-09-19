import { types } from './../types/types'
import {
  firebase,
  googleProvider,
  githubProvider
} from '../firebase/firebase-config'
import { startLoading, finishLoading } from './ui'
import Swal from 'sweetalert2'
import { noteLogout } from './notes'
export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName
  }
})

export const startLogin = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading())
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName))
        dispatch(finishLoading())
      })
      .catch((e) => {
        dispatch(finishLoading())
        Swal.fire('Error', e.message, 'error')
      })
  }
}
export const startGoogleLogin = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName))
      })
  }
}
export const startGithubLogin = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(githubProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName))
      })
  }
}
export const startRegisterWithEmail = (email, password, name) => {
  return (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name })
        dispatch(login(user.uid, user.displayName))
      })
      .catch((e) => {
        console.log(e)
        Swal.fire('Error', e.message, 'error')
      })
  }
}
export const startLogout = () => {
  return async (dispatch) => {
    await firebase.auth().signOut()
    dispatch(logout())
    dispatch(noteLogout())
  }
}
export const logout = () => ({
  type: types.logout
})
