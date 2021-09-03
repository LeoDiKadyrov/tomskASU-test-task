import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { personUpdated } from './personSlice'
import { selectPersonById } from './personSlice'


export const EditPersonForm = ({ match }) => {
  const { personId } = match.params

  const person = useSelector(state => selectPersonById(state, personId))

  const [firstName, setFirstName] = useState(person.firstName)
  const [lastName, setLastName] = useState(person.lastName)

  const dispatch = useDispatch()
  const history = useHistory()

  const onFirstNameChanged = e => setFirstName(e.target.value)
  const onLastNameChanged = e => setLastName(e.target.value)

  const onSavePersonClicked = () => {
    if (firstName && lastName) {
      dispatch(personUpdated({ id: personId, firstName, lastName }))
      history.push(`/persons/${personId}`)
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Firstname:</label>
        <input
          type="text"
          id="personFirstName"
          name="personFirstName"
          placeholder="Enter your name"
          value={firstName}
          onChange={onFirstNameChanged}
        />
        <label htmlFor="postContent">Lastname:</label>
        <input
          id="personLastName"
          name="personLastName"
          placeholder="Enter your lastname"
          value={lastName}
          onChange={onLastNameChanged}
        />
      </form>
      <button type="button" onClick={onSavePersonClicked}>
        Save Post
      </button>
    </section>
  )
}