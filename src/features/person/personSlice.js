import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { id: '1', firstName: 'Abdrahman', lastName: 'Sergaziev' },
  { id: '2', firstName: 'Aidar', lastName: 'Nuranov' },
]

export const personSlice = createSlice({
  name: 'persons',
  initialState,
  reducers: {}
})


// export const { increment } = personSlice.actions

export default personSlice.reducer