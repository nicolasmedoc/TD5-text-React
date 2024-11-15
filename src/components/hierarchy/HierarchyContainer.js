import './Hierarchy.css'
import { useEffect, useRef } from 'react';
import {useSelector, useDispatch} from 'react-redux'

import HierarchyD3 from './Hierarchy-d3';

// TODO: import action methods from reducers

function HierarchyContainer(){
    const visData = useSelector(state => state.clusterTree)
    const dispatch = useDispatch();

    // every time the component re-render
    useEffect(()=>{
        console.log("HierarchyContainer useEffect (called each time matrix re-renders)");
    }); // if no dependencies, useEffect is called at each re-render

    const divContainerRef=useRef(null);
    const visD3Ref = useRef(null)

    const getCharSize = function(){
        // fixed size
        // return {width:900, height:900};
        // getting size from parent item
        let width;// = 800;
        let height;// = 100;
        if(divContainerRef.current!==undefined){
            width=divContainerRef.current.offsetWidth;
            // width = '100%';
            height=divContainerRef.current.offsetHeight;
            // height = '100%';
        }
        return {width:width,height:height};
    }

    // did mount called once the component did mount
    useEffect(()=>{
        console.log("HierarchyContainer useEffect [] called once the component did mount");
        const visD3 = new HierarchyD3(divContainerRef.current);
        visD3.create({size:getCharSize()});
        visD3Ref.current = visD3;
        return ()=>{
            // did unmout, the return function is called once the component did unmount (removed for the screen)
            console.log("HierarchyContainer useEffect [] return function, called when the component did unmount...");
            const visD3 = visD3Ref.current;
            visD3.clear()
        }
    },[]);// if empty array, useEffect is called after the component did mount (has been created)

    // did update, called each time dependencies change, dispatch remain stable over component cycles
    useEffect(()=>{
        console.log("HierarchyContainer useEffect with dependency [visData,dispatch], called each time visData changes...");
        const visD3 = visD3Ref.current;

        const handleOnEvent1 = function(payload){
            // do something
            // call dispatch(reducerAction1(payload));
        }
        const handleOnEvent2 = function(payload){
            // do something
            // call dispatch(reducerAction1(payload));
        }
        const controllerMethods={
            handleOnEvent1: handleOnEvent1,
            handleOnEvent2: handleOnEvent2,
        }
        visD3.renderVis(visData,controllerMethods);
    },[visData,dispatch]);// if dependencies, useEffect is called after each data update, in our case only visData changes.

    return(
        // <div ref={divContainerRef} className="hierarchyDivContainer col2">
        <div ref={divContainerRef} className="hierarchyDivContainer">

        </div>
    )
}

export default HierarchyContainer;