import { createSlice } from '@reduxjs/toolkit'

const initialState = []

export const personSlice = createSlice({
  name: 'persons',
  initialState,
  reducers: {
    personAdded: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(firstName, lastName) {
        return {
          payload: {
            id: nanoid(),
            firstName,
            lastName
          }
        }
      }
    },
    personUpdated(state, action) {
      const { id, firstName, lastName } = action.payload
      const existingPerson = state.find(person => person.id === id)
      if (existingPerson) {
        existingPerson.firstName = firstName
        existingPerson.lastName = lastName
      }
    }
  }
})


export const { personAdded, personUpdated } = personSlice.actions

export default personSlice.reducer