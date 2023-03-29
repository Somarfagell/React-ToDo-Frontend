import React from "react";
import { sendData, getData, getStatistics } from "../misc/functions"; 
import "../css/Modal.css"

export default function Modal({data,setData}){

    const handleSubmit = (e) => {
        //Prevent the submit action
        e.preventDefault();
        //Sent to the back the information
        const text = e.target.text.value;
        const value = e.target.priority.value;
        const date =  e.target.dueDate.value+'T00:00:00';

        //Send the new data
        const todo = {"text":text,"priority":value,"dueDate":date};
        sendData(todo);
        //retrieve the new data
        const specs = {
            "specifications": [data[1]["text"],data[1]["priority"],data[1]["status"],data[1]["prioritySort"],data[1]["dateSort"]],
            "actualPage": data[2]
        }
        let response = getData(specs)
        let stats = getStatistics();

        response.then((result) => {
            stats.then((res) => {
                //Update the data of the state and close modal
            setData([result["content"],{"text":specs["specifications"][0],"priority":specs["specifications"][1],"status":specs["specifications"][2],"prioritySort":data[1]["prioritySort"],"dateSort":data[1]["dateSort"]},result["page"],result["pageSize"],false,data[5],res])
            }).catch((err) => { 
            });
        }).catch((err) => {
            alert("Error getting the data");
        });
        //return
    }
    
    const closeModal = () => {
        //Set false the modal flag
        setData([data[0],data[1],data[2],data[3],false,data[5], data[6]]);
    }

    return(
        <div className="modalContainer">
            <form onSubmit={handleSubmit} className='formContainer'>
                <label> Name<input type="text" maxLength={120} name="text"></input></label>
                <label> Due Date<input type="date" name="dueDate" min={Date.now()}></input></label>
                <div className=''>
                        <label className=''>Priority : </label>
                        <select name="priority" id="priority" className="">
                            <option value={3}>High</option>
                            <option value={2}>Medium</option>
                            <option value={1}>Low</option>
                        </select>
                    </div>
                <button type="submit">Create ToDo</button>
                <button type="button" onClick={closeModal}>Close</button>
            </form>
        </div>
    );
}