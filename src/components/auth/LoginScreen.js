import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from './../../hooks/useForm/useForm'
import { useDispatch, useSelector } from 'react-redux'
import {
  startLogin,
  startGoogleLogin,
  startGithubLogin
} from './../../actions/auth'

export const LoginScreen = () => {
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.ui)
  const [formValues, handleInputChange] = useForm({
    email: '',
    password: ''
  })
  const { email, password } = formValues
  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(startLogin(email, password))
  }
  const handleLoginGoogle = () => {
    dispatch(startGoogleLogin())
  }
  const handleLoginGithub = () => {
    dispatch(startGithubLogin())
  }
  return (
    <div className='animate__animated animate__fadeInUp'>
      <h3 className='auth__title'>Login</h3>
      <form onSubmit={handleLogin}>
        <input
          autoComplete='off'
          className='auth__input'
          name='email'
          onChange={handleInputChange}
          placeholder='email'
          type='email'
          value={email}
        />
        <input
          autoComplete='off'
          className='auth__input'
          name='password'
          onChange={handleInputChange}
          placeholder='password'
          type='password'
          value={password}
        />
        <button
          disabled={loading}
          className='btn btn-primary btn-block'
          type='submit'>
          Login
        </button>
        <div className='auth__social-networks'>
          <p>Login with social networks</p>
          <div className='google-btn' onClick={handleLoginGoogle}>
            <div className='google-icon-wrapper'>
              <img
                className='google-icon'
                src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
                alt='google button'
              />
            </div>
            <p className='btn-text'>
              <b>Sign in with google</b>
            </p>
          </div>
        </div>
      </form>
      <button
        className='btn btn-dark mt-1 btn-block'
        onClick={handleLoginGithub}>
        <i className='fab fa-github'></i>Login with Github
      </button>
      <Link className='link' to='/auth/register'>
        Create new account
      </Link>
    </div>
  )
}
