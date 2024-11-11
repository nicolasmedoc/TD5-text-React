import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {getProjectionData} from "../../redux/DataSetSlice";

function ControlBar(){
    const dispatch = useDispatch();
    const projectionTypeList=["euclidean","cosine","euclidean_tfidf"]
    const [selectedProjectionType,setSelectedProjectionType] = useState(projectionTypeList[0]);

    const handleOnChangeSelectedProjectionType = function(event){
        const selectionValue = event.target.value;
        setSelectedProjectionType(selectionValue);
    }

    const handleOnSubmit = function(event){
        // Prevent the browser from reloading the page
        event.preventDefault();
    
        // get the form data and transform it in JSON format
        const form = event.target;
        const formData = new FormData(form);
        const formJSON = Object.fromEntries(formData.entries());

        dispatch(getProjectionData({distance:selectedProjectionType}));
    }
    
    useEffect(()=>{
        console.log("ControlBar useEffect")
    });

    const getSelectOptions = (list)=>{
        return list.map((item)=>{
            return <option value={item}>{item}</option>
        })
    }

    return(
        <>
            {console.log("ControlBar rendering")}
            <form onSubmit={handleOnSubmit}>
                <label>
                    Nb rows
                    <select name="example"
                            defaultValue={selectedProjectionType}
                            onChange={handleOnChangeSelectedProjectionType}
                    >
                        {getSelectOptions(projectionTypeList)}
                    </select>
                </label>

                <button type="submit">Get projection</button>
            </form>
        </>
    )
}

export default ControlBar;