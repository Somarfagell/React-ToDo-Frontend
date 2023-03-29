import React, { useState } from "react";
import '../css/List.css';
import ToDo from "./ToDo";
import { getData } from "../misc/functions";
import UpdateModal from "./UpdateModal";

export default function List({data, setData}){
    //Header titles to render them 
    let header = ['Status', 'Name', 'Priority', 'Due Date', 'Actions'];
    const [modal, showModal] = useState([false,null]);

    const modifyConf = (e) => {
        let configs = []
        //Check the corresponding button to alter the state and refresh it with the new data
        if(e.target.name === "descPriority"){
            configs = [data[0],{"text":data[1]['text'],"priority":data[1]['priority'],"status":data[1]['status'],"prioritySort":'asc',"dateSort":data[1]['dateSort']},data[2],data[3],data[4],data[5]]
        }else if(e.target.name === "ascPriority"){
            configs = [data[0],{"text":data[1]['text'],"priority":data[1]['priority'],"status":data[1]['status'],"prioritySort":'desc',"dateSort":data[1]['dateSort']},data[2],data[3],data[4],data[5]]
        }else if(e.target.name === "descDate"){
            configs = [data[0],{"text":data[1]['text'],"priority":data[1]['priority'],"status":data[1]['status'],"prioritySort":data[1]['prioritySort'],"dateSort":'asc'},data[2],data[3],data[4],data[5]]
        }else if(e.target.name === "ascDate"){
            configs = [data[0],{"text":data[1]['text'],"priority":data[1]['priority'],"status":data[1]['status'],"prioritySort":data[1]['prioritySort'],"dateSort":'desc'},data[2],data[3],data[4],data[5]]
        }
        //refreshing the data
        const specs = {
            "specifications": [configs[1]['text'],configs[1]['priority'],configs[1]['status'],configs[1]['prioritySort'],configs[1]['dateSort']],
            "actualPage": data[2]
        }
        let response = getData(specs)
        response.then((result) => {
            //Update the data of the state
            setData([result["content"],configs[1],result["page"],result["pageSize"],data[4],data[5]])
        }).catch((err) => {
            alert("Error getting the data");
        });
    }

    return(
        <div className="tableContainer">
            <table className="table">
                <thead>
                    <tr>
                    <th className="title">{header[0]}</th>
                    <th className="title">{header[1]}</th>
                    <th className="title">
                        {header[2]} 
                        <button className="listButton" name="descPriority" onClick={modifyConf}>{'<'}</button>
                        <button className="listButton" name="ascPriority" onClick={modifyConf}>{'>'}</button>
                    </th>
                    <th className="title">
                        {header[3]}
                        <button className="listButton" name="descDate" onClick={modifyConf}>{'<'}</button>
                        <button className="listButton" name="ascDate" onClick={modifyConf}>{'>'}</button>
                    </th>
                    <th className="title">{header[4]}</th>
                    </tr>
                </thead>
                <tbody>
                    {data[0].map((todo, index)=>{
                        return <ToDo key={index} data = {todo} setData={setData} stateData={data} modal={modal} setModal={showModal}/>
                    })}
                </tbody>
            </table>
            {modal[0] ? <UpdateModal modal={modal} showModal={showModal} stateData={data} setState={setData}/> : null}
        </div>
    );
}