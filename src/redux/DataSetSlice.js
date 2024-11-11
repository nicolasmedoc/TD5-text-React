import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// get the data in asyncThunk
export const getProjectionData = createAsyncThunk('projectionData/fetchData', async (args,thunkAPI) => {
    // when a result is returned, extraReducer below is triggered with the case getProjectionData.fulfilled
})

export const dataSetSlice = createSlice({
  name: 'dataSet',
  initialState: [],
  reducers: {
      // add reducer if needed
  },
})

// Action creators are generated for each case reducer function
// export const { reducerName } = dataSetSlice.actions

export default dataSetSlice.reducer