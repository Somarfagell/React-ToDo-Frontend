import React from "react";
import '../css/Header.css';
import {getData} from "../misc/functions";

export default function Header({data,setData}){
    //Data goes as follows: [ [Data to map], [Filtered data], page, totalPages, showCreateModal, showUpdateModal]
    const handleSubmitHeader = (e) => {
        e.preventDefault();
        //Get the specifications
        const text = e.target.text.value;
        const value = e.target.priority.value;
        const state = e.target.state.value; 

        const specs = {
            "specifications": [text,value,state,data[1]["prioritySort"],],
            "actualPage": data[2]
        }
        //Get the data from the form
        let response = getData(specs)
        response.then((result) => {
            //Update the data of the state
            setData([result["content"],{"text":specs["specifications"][0],"priority":specs["specifications"][1],"status":specs["specifications"][2],"prioritySort":data[1]["prioritySort"],"dateSort":data[1]["dateSort"]},result["page"],result["pageSize"],data[4],data[5]])
        }).catch((err) => {
            alert("Error getting the data");
        });
    }

    return (
        <>
            <div className="header">
                <form action="GET" onSubmit={handleSubmitHeader}>
                    <label className='labelStyle'>Name : <input type="text" name="text" className='nameInput' maxLength={120} /></label>
                    <div className='priorityWrapper'>
                        <label className='labelStyle'>Priority : </label>
                        <select name="priority" id="priority" className="prioritySelect">
                            <option value="All">All</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>

                    <div className='stateWrapper'>
                        <label className='labelStyle'>State :</label>
                        <select name="state" id="state" className="stateSelect">
                            <option value="All">All</option>
                            <option value="Done">Done</option>
                            <option value="Undone">Undone</option>                
                        </select>
                        <button type="submit" className='search'>Search</button>
                    </div>
                </form>
            </div>
        </>
    );
}