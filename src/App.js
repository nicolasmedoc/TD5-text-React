import './App.css';
import ScatterplotContainer from "./components/scatterplot/ScatterplotContainer";
import { useEffect} from 'react';
import ControlBar from "./components/ControlBar/ControlBar";
// here import other dependencies

// a component is a piece of code which render a part of the user interface
function App() {
  useEffect(()=>{
    console.log("App useEffect");
  })

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
