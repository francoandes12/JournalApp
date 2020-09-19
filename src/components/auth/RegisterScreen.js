import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from './../../hooks/useForm/useForm'
import isEmail from 'validator/lib/isEmail'
import { useDispatch, useSelector } from 'react-redux'
import { setError, removeError } from '../../actions/ui'
import { startRegisterWithEmail } from '../../actions/auth'
export const RegisterScreen = () => {
  const dispatch = useDispatch()
  const { msgError } = useSelector((state) => state.ui)
  const initialForm = {
    name: '',
    email: '',
    password: '',
    password2: ''
  }
  const [{ name, email, password, password2 }, handleInputChange] = useForm(
    initialForm
  )
  const handleRegister = (e) => {
    e.preventDefault()
    if (isFormValid()) {
      dispatch(startRegisterWithEmail(email, password, name))
    }
  }
  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError('name is required'))
      console.log('name is required')
      return false
    } else if (!isEmail(email)) {
      dispatch(setError('email is not valid'))
      console.log('email is not valid')
      return false
    } else if (password !== password2 || password.length < 5) {
      dispatch(setError('password should be at least 6 characters and match'))
      console.log('password should be at least 6 characters and match')
      return false
    }
    dispatch(removeError())
    return true
  }
  return (
    <div className='animate__animated animate__fadeIn  animate__faster'>
      <h3 className='auth__title'>Register</h3>
      <form onSubmit={handleRegister}>
        {msgError && <div className='auth__alert-error'>{msgError}</div>}
        <input
          value={name}
          onChange={handleInputChange}
          autoComplete='off'
          className='auth__input'
          type='text'
          placeholder='name'
          name='name'
        />
        <input
          value={email}
          onChange={handleInputChange}
          autoComplete='off'
          className='auth__input'
          type='email'
          placeholder='email'
          name='email'
        />
        <input
          autoComplete='off'
          value={password}
          onChange={handleInputChange}
          className='auth__input'
          type='password'
          placeholder='password'
          name='password'
        />
        <input
          autoComplete='off'
          value={password2}
          onChange={handleInputChange}
          className='auth__input'
          type='password'
          placeholder='Confirm password'
          name='password2'
        />
        <button className='btn btn-primary btn-block mb-5' type='submit'>
          Register
        </button>
        <Link className='link' to='auth/login'>
          Already registered?
        </Link>
      </form>
    </div>
  )
}
