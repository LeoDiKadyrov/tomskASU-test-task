import React , { useState } from 'react'
import { useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import { personAdded } from './personSlice'

export const AddPersonForm = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const dispatch = useDispatch()

    const onFirstNameChanged = e => setFirstName(e.target.value)
    const onLastNameChanged = e => setLastName(e.target.value)

    const onSavePersonClicked = () => {
        if (firstName && lastName) {
            dispatch(
                personAdded({
                    id: nanoid(),
                    firstName,
                    lastName
                })
            )
        }
        setFirstName('')
        setLastName('')
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