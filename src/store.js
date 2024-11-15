import { configureStore } from '@reduxjs/toolkit'
import dataSetReducer from './redux/DataSetSlice'
import clusterTreeReducer from "./redux/HierarchySlice";
export default configureStore({
  reducer: {
    dataset: dataSetReducer,
    clusterTree: clusterTreeReducer,
    }
})