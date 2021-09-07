import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  persons: [],
  status: 'idle',
  error: null
}

export const fetchPersons = createAsyncThunk('', async () => {
  const response = await fetch("http://localhost:3000/persons");
  return response.json()
})

export const addNewPerson = createAsyncThunk(
  'http://localhost:3000/persons',
  async initialPerson => {
    // We send the initial data to the fake API server
    const response = await fetch('/addNewPerson', { 
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: initialPerson 
    })
    const resJSON = response.json()
    return resJSON
  }
)

export const personSlice = createSlice({
  name: 'persons',
  initialState,
  reducers: {
    personAdded: {
      reducer(state, action) {
        state.persons.push(action.payload)
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
      const existingPerson = state.persons.find(person => person.id === id)
      if (existingPerson) {
        existingPerson.firstName = firstName
        existingPerson.lastName = lastName
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPersons.pending, (state, action) => {
        state.status = 'loading'
        console.log("pending", action);
      })
      .addCase(fetchPersons.fulfilled, (state, action) => {
        state.status = 'succeeded'
        console.log("fulfilled", action);
        state.persons = state.persons.concat(action.payload)
      })
      .addCase(fetchPersons.rejected, (state, action) => {
        state.status = 'failed'
        console.log("rejected", action);
        state.error = action.error.message
      })
      .addCase(addNewPerson.fulfilled, (state, action) => {
        state.persons.push(action.payload)
      })
  },
})


export const { personAdded, personUpdated } = personSlice.actions

export default personSlice.reducer

export const selectAllPersons = state => state.persons.persons

export const selectPersonById = (state, personId) =>
  state.persons.persons.find(person => person.id === personId)