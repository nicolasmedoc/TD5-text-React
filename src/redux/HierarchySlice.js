import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Calling API in asyncThunk. for more details see https://redux-toolkit.js.org/api/createAsyncThunk
const clusterByCut = (tree, cutDistanceThr, num_cluster=-1, thresholdReached=false)=>{
  // cutDistanceThr is a threshold defined as a rate of the max distance between all the nodes.
  // as suggested by scipy, it would be the 0.7 * max_distance but you can test other values
  let _thresholdReached = thresholdReached
  let _num_cluster = num_cluster;
  // increase num_cluster if distance > cutDistanceThr
  if(!_thresholdReached && tree.distance <= cutDistanceThr){
    _num_cluster = _num_cluster + 1
    _thresholdReached=true;
  }
  if(_thresholdReached) {
    tree.category_dist_cut = _num_cluster;
  }else {
    tree.category_dist_cut = undefined;
  }
  if(tree.children.length > 0){
    tree.children.forEach(child=>{
      const res = clusterByCut(child, cutDistanceThr, _num_cluster, _thresholdReached);
      if(res > _num_cluster){
        _num_cluster = res;
      }
    })
    return _num_cluster;
  }else{
    return _num_cluster;
  }
}
export const getClusterTree = createAsyncThunk('clusterTree/fetchData', async (args, thunkAPI) => {
  const response = await fetch('http://localhost:5000/getClusterTree');
  const responseJson = await response.json();
  let distanceMax = Number.NEGATIVE_INFINITY;
  responseJson.distances.forEach(d=>{
    if (d>distanceMax) distanceMax=d;
  });
  const numClusterMax = clusterByCut(responseJson.cluster_tree,0.6*distanceMax);
  const categories = [];
  for(let i=0 ; i<=numClusterMax ; i++){
    categories.push(i);
  }
  responseJson.categories = categories;
  // add categories to nodes
  return responseJson;
  // when a result is returned, extraReducer is triggered with the case getSomething.fulfilled (see below)
})

export const clusterTreeSlice = createSlice({
  name: 'clusterTree',
  initialState: {},
  reducers: {
  },
  extraReducers: builder => {
    builder.addCase(getClusterTree.fulfilled, (state, action) => {
      return action.payload
    })
  }
})

// Action creators are generated for each case reducer function
// export const { updateAnObject, addValueToAnArray, updateAnArray } = counterSlice.actions

export default clusterTreeSlice.reducer