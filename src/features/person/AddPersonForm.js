import React , { useState } from 'react'
import { useDispatch } from 'react-redux'

import { addNewPerson } from './personSlice'

export const AddPersonForm = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const dispatch = useDispatch()

    const onFirstNameChanged = e => setFirstName(e.target.value)
    const onLastNameChanged = e => setLastName(e.target.value)

    // const onSavePersonClicked = () => {
    //     if (firstName && lastName) {
    //         dispatch(personAdded(firstName, lastName))
    //     }
    //     setFirstName('')
    //     setLastName('')
    // }

    const canSave =
    [firstName, lastName].every(Boolean) && addRequestStatus === 'idle'

  const onSavePersonClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending')
        await dispatch(addNewPerson({ firstName, lastName })).unwrap()
        setFirstName('')
        setLastName('')
      } catch (err) {
        console.error('Failed to save the post: ', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

    return(
        <div>
            <form>
                <input 
                    type="text" 
                    placeholder="Enter firstname"
                    id="personFirstName"
                    name="personFirstName"
                    value={firstName}
                    onChange={onFirstNameChanged} />
                <input 
                    type="text" 
                    placeholder="Enter lastname"
                    id="personLastName"
                    name="personLastName"
                    value={lastName}
                    onChange={onLastNameChanged} />
                <button type="button" onClick={onSavePersonClicked}>Add Person</button>
            </form>
        </div>
    )
}