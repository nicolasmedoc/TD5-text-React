import './App.css';
import ScatterplotContainer from "./components/scatterplot/ScatterplotContainer";
import { getProjectionData } from './redux/DataSetSlice';
import { useDispatch } from 'react-redux';
import { useEffect} from 'react';

// here import other dependencies

// a component is a piece of code which render a part of the user interface
function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    console.log("App useEffect");
  })

  useEffect(()=>{
    dispatch(getProjectionData());
  },[])

  return (
    <div className="App">
        {console.log("App rendering")}
        <ScatterplotContainer/>
    </div>
  );
}

export default App;
