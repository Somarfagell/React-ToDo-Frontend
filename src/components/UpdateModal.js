import React, { useState } from "react";
import { updateData, deleteData, getData } from "../misc/functions";

export default function UpdateModal({ modal, showModal, stateData, setState }) {
    const data = modal[1];
    const [boton, setBoton] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        //Hidding the modal to update data
        //get the data from the form
        if (boton === 'update') {
            //fetching data from the back
            const text = e.target.text.value;
            const value = e.target.priority.value;
            const date = e.target.dueDate.value + 'T00:00:00';

            //Send the new data
            const todo = { "text": text, "priority": value, "dueDate": date };

            updateData(data['id'], todo).then((result) => {
                //deleting based on the id to tha back
                deleteData(data['id']).then((result) => {
                    //updating the state data
                    //retrieve the new data
                    const specs = {
                        "specifications": [stateData[1]["text"], stateData[1]["priority"], stateData[1]["status"], stateData[1]["prioritySort"], stateData[1]["dateSort"]],
                        "actualPage": stateData[2]
                    }
                    let response = getData(specs)
                    response.then((result) => {
                        //Update the data of the state and close modal
                        setState([result["content"], { "text": specs["specifications"][0], "priority": specs["specifications"][1], "status": specs["specifications"][2], "prioritySort": stateData[1]["prioritySort"], "dateSort": stateData[1]["dateSort"] }, result["page"], result["pageSize"], stateData[4], stateData[5]])
                    }).catch((err) => {
                        alert("Error getting the data");
                    });
                }).catch((err) => {
                    console.log("not Updated");
                })
            });
        }
        else if (boton === 'delete') {
            //deleting based on the id to tha back
            deleteData(data['id']).then((result) => {
                //updating the state data
                //retrieve the new data
                const specs = {
                    "specifications": [stateData[1]["text"], stateData[1]["priority"], stateData[1]["status"], stateData[1]["prioritySort"], stateData[1]["dateSort"]],
                    "actualPage": stateData[2]
                }
                let response = getData(specs)
                response.then((result) => {
                    //Update the data of the state and close modal
                    setState([result["content"], { "text": specs["specifications"][0], "priority": specs["specifications"][1], "status": specs["specifications"][2], "prioritySort": stateData[1]["prioritySort"], "dateSort": stateData[1]["dateSort"] }, result["page"], result["pageSize"], stateData[4], stateData[5]])
                }).catch((err) => {
                    alert("Error getting the data");
                });
            }).catch((err) => {
            });
        }


        //closing the modal
        showModal([!modal[0], null])
    }

    const updateButton = () => {
        setBoton('update')
    }

    const deleteButton = () => {
        setBoton('delete')
    }

    return (
        <div className="modalContainer">
            <form onSubmit={handleSubmit} className='formContainer'>
                <label> Name<input type="text" maxLength={120} name="text"></input></label>
                <label> Due Date<input type="date" name="dueDate" ></input></label>
                <div className=''>
                    <label className=''>Priority : </label>
                    <select name="priority" id="priority" className="">
                        <option value={3}>High</option>
                        <option value={2}>Medium</option>
                        <option value={1}>Low</option>
                    </select>
                </div>
                <button type="submit" name="update" onClick={updateButton}>Update</button>
                <button type="submit" name="delete" onClick={deleteButton}>Delete</button>
                <button type='button' name="close" onClick={() => { showModal([!modal[0], null]) }}>Close</button>
            </form>
        </div>
    );
}