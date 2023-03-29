import React from "react";
import { updateStatusData, getData, getStatistics } from "../misc/functions";
import '../css/ToDo.css'

export default function ToDo({ data, setData, stateData, setModal}) {

    const updateStatus = () => {
        //Update the done status
        updateStatusData(!data['done'], data['id']).then(() => {
            //refresh the data
            const specs = {
                "specifications": [stateData[1]["text"], stateData[1]["priority"], stateData[1]["status"], stateData[1]["prioritySort"], stateData[1]["dateSort"]],
                "actualPage": stateData[2]
            }
            let response = getData(specs)
            let stats = getStatistics();

            response.then((result) => {
                //Update the data of the state and close modal
                stats.then((res) => {
                    setData([result["content"], { "text": specs["specifications"][0], "priority": specs["specifications"][1], "status": specs["specifications"][2], "prioritySort": specs["specifications"][3], "dateSort": specs["specifications"][4] }, result["page"], result["pageSize"], data[4], data[5],res])
                }).catch((err) => { 
                });
            }).catch((err) => {
                alert("Error getting the data");
            });
        }
        );

        return
    }

    const showEditModal = () => {
        setModal([true,data]);
    }

    const weeks = ((new Date(data['dueDate'].replace(/-/g, "/").slice(0, 10)) - new Date()) / (1000 * 3600 * 24)) / 7;
    return (
        <><tr style={{ backgroundColor: weeks <= 1 ? '#EA5455' : weeks <= 2 && weeks > 1 ? '#F2CD5C' : "#DFFFD8" }}>
            <td className="centered"><input type='checkbox' onChange={updateStatus} checked={data['done']} className='controlled'></input></td>
            <td className="padded">{data['text']}</td>
            <td className="padded">{data['priority'] === 1 ? "Low": data['priority'] === 2 ? "Medium":"High"}</td>
            <td className="padded">
                {data['dueDate'].slice(0,10)+" "+ data['dueDate'].slice(11)}
            </td>
            <td className="buttonContainer">
                <button onClick={showEditModal} className='updateButton'>Edit/Delete</button>
            </td>
        </tr>
        </>
    );
}