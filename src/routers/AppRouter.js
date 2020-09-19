import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import { AuthRouter } from './AuthRouter'
import { JournalScreen } from './../components/journal/JournalScreen'
import { firebase } from '../firebase/firebase-config'
import { useDispatch } from 'react-redux'
import { login } from './../actions/auth'
import Loader from 'react-loader-spinner'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'
import { startLoadingNotes } from './../actions/notes'

export const AppRouter = () => {
  const dispatch = useDispatch()
  const [checking, setChecking] = useState(true)
  const [isLogged, setIsLogged] = useState(false)
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName))
        setIsLogged(true)
        dispatch(startLoadingNotes(user.uid))
      } else {
        setIsLogged(false)
      }
      setChecking(false)
    })
  }, [dispatch, setChecking, setIsLogged])
  if (checking) {
    return (
      <Loader
        className='loading'
        type='Rings'
        color='#5c62c9'
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
    )
  }
  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute isAuth={isLogged} path='/auth' component={AuthRouter} />
          <PrivateRoute
            isAuth={isLogged}
            exact
            path='/'
            component={JournalScreen}
          />
          <Redirect to='/auth/login' />
        </Switch>
      </div>
    </Router>
  )
}
