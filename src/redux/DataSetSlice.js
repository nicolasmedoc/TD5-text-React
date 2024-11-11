import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// get the data in asyncThunk
export const getProjectionData = createAsyncThunk('projectionData/fetchData', async (args,thunkAPI) => {
  const params = new URLSearchParams(args).toString();
  const response = await fetch('http://localhost:5000/getProjection?'+params);
  const responseJson = await response.json();
  return responseJson.projection.map((item,i)=>{
    return {xValue:item[0], yValue:item[1], index:i, category:responseJson.categories[i]};
  });
  // when a result is returned, extraReducer below is triggered with the case getProjectionData.fulfilled
})

export const dataSetSlice = createSlice({
  name: 'dataSet',
  initialState: [],
  reducers: {
      // add reducer if needed
  },
  extraReducers: builder => {
    builder
        .addCase(getProjectionData.pending, (state, action)=>{})
        .addCase(getProjectionData.fulfilled, (state, action) => {
          return action.payload
        })
        .addCase(getProjectionData.rejected, (state, action)=>{})
  }
})

// Action creators are generated for each case reducer function
// export const { reducerName } = dataSetSlice.actions

export default dataSetSlice.reducer