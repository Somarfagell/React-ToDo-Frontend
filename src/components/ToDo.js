import React from "react";
import { updateStatusData, getData } from "../misc/functions";

export default function ToDo({ data, setData, stateData }) {

    const updateStatus = () => {
        //Update the done status
        updateStatusData(!data['done'], data['id']).then(() => {
            //refresh the data
            const specs = {
                "specifications": [stateData[1]["text"], stateData[1]["priority"], stateData[1]["status"], stateData[1]["prioritySort"], stateData[1]["dateSort"]],
                "actualPage": stateData[2]
            }
            let response = getData(specs)
            response.then((result) => {
                //Update the data of the state and close modal
                setData([result["content"], { "text": specs["specifications"][0], "priority": specs["specifications"][1], "status": specs["specifications"][2], "prioritySort": specs["specifications"][3], "dateSort": specs["specifications"][4] }, result["page"], result["pageSize"], data[4], data[5]])
            }).catch((err) => {
                alert("Error getting the data");
            });
        }
        );

        return
    }


    const weeks = ((new Date(data['dueDate'].replace(/-/g, "/").slice(0, 10)) - new Date()) / (1000 * 3600 * 24)) / 7;
    return (
        <><tr style={{ backgroundColor: weeks <= 1 ? '#EA5455' : weeks <= 2 && weeks > 1 ? '#F2CD5C' : "#DFFFD8" }}>
            <td><input type='checkbox' onChange={updateStatus} checked={data['done']}></input></td>
            <td>{data['text']}</td>
            <td>{data['priority']}</td>
            <td>
                {data['dueDate']}
            </td>
            <td className="buttonContainer">
                <button onClick={null}>Edit/Delete</button>
            </td>
        </tr>
        </>
    );
}