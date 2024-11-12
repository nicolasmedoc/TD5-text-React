import './App.css';
import ScatterplotContainer from "./components/scatterplot/ScatterplotContainer";
import { useEffect} from 'react';
import {getProjectionData} from "./redux/DataSetSlice";
import {useDispatch} from "react-redux";
// here import other dependencies

// a component is a piece of code which render a part of the user interface
function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    console.log("App useEffect");
  })
  useEffect(()=>{
    dispatch(getProjectionData());
    window.addEventListener("resize", () => {
      console.log("resize event")
      /**
       * Try to clear the resizeend timeout.
       * In the timeout callback: call any reducer action
       *
       */
      clearTimeout(window.resizeend);
      window.resizeend = setTimeout(() => {
        console.log("resizeend Timeout")
        // call dispatch(reducerFunction)
      }, 500);
    });

    return ()=>{
      window.removeEventListener("resize", () => {});
    }
  },[]) // empty dependencies [] <=> component did mount
  return (
    <div className="App">
      {console.log("App rendering")}
      <div id="view-container" className="row">
        <ScatterplotContainer/>
      </div>
    </div>
  );
}

export default App;
