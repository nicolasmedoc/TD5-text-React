import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// get the data in asyncThunk
export const getProjectionData = createAsyncThunk('projectionData/fetchData', async () => {
    const response = await fetch('http://localhost:5000/getProjection');
    const responseJson = await response.json();
    return responseJson.map((item,i)=>{return {xValue:item[0],yValue:item[1],index:i}});
    // when a result is returned, extraReducer below is triggered with the case getProjectionData.fulfilled
})

export const dataSetSlice = createSlice({
  name: 'dataSet',
  initialState: [],
  reducers: {
      // add reducer if needed
  },
  extraReducers: builder => {
    builder.addCase(getProjectionData.fulfilled, (state, action) => {
      // Add any fetched house to the array
      return action.payload
    })
  }
})

// Action creators are generated for each case reducer function
// export const { updateSelectedItem } = dataSetSlice.actions

export default dataSetSlice.reducer