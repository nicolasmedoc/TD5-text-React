import './App.css';
import ScatterplotContainer from "./components/scatterplot/ScatterplotContainer";
import { useEffect} from 'react';
import {getProjectionData} from "./redux/DataSetSlice";
import {getClusterTree} from "./redux/HierarchySlice";
import {useDispatch} from "react-redux";
import HierarchyContainer from "./components/hierarchy/HierarchyContainer";
// here import other dependencies

// a component is a piece of code which render a part of the user interface
function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    console.log("App useEffect");
  })
  useEffect(()=>{
    dispatch(getProjectionData());
    dispatch(getClusterTree());
    return ()=>{
    }
  },[]) // empty dependencies [] <=> component did mount
  return (
    <div className="App">
      {console.log("App rendering")}
      <div id="view-container" >
      {/*<div id="view-container" className="row">*/}
        {/*<ScatterplotContainer/>*/}
        <HierarchyContainer/>
      </div>
    </div>
  );
}

export default App;
