import React from 'react'
import { NotesAppBar } from './NotesAppBar'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from './../../hooks/useForm/useForm'
import { useEffect } from 'react'
import { useRef } from 'react'
import { activeNote, startDeleting } from '../../actions/notes'

export const NoteScreen = () => {
  const { active: note } = useSelector((state) => state.notes)
  const [formValues, handleInputChange, reset] = useForm(note)
  const { body, title } = formValues
  const activeId = useRef(note.id)
  const dispatch = useDispatch()
  useEffect(() => {
    if (activeId.current !== note.id) {
      reset(note)
      activeId.current = note.id
    }
  }, [note, reset])
  useEffect(() => {
    dispatch(activeNote(formValues.id, { ...formValues }))
  }, [dispatch, formValues])
  const handleDelete = () => {
    dispatch(startDeleting(note.id))
  }
  return (
    <div className='notes__main-content'>
      <NotesAppBar />
      <div className='notes__content'>
        <input
          className='notes__title-input'
          type='text'
          placeholder='some awesome title'
          autoComplete='off'
          onChange={handleInputChange}
          value={title}
          name='title'
        />
        <textarea
          className='notes__textarea'
          onChange={handleInputChange}
          value={body}
          name='body'
          placeholder='whats happened today'></textarea>
        {note.url && (
          <div className='notes__image'>
            <img src={note.url} alt='imagen' />
          </div>
        )}
      </div>
      <button className='btn btn-danger' onClick={handleDelete}>
        Borrar
      </button>
    </div>
  )
}
