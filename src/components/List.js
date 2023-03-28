import React from "react";
import '../css/List.css';
import ToDo from "./ToDo";

export default function List({data, setData}){
    //Header titles to render them 
    let header = ['Status', 'Name', 'Priority', 'Due Date', 'Actions'];

    return(
        <div className="tableContainer">
            <table className="table">
                <thead>
                    <tr>
                        {header.map((title, index) => {
                            return <th className="title" key={index}>{title}</th>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data[0].map((todo, index)=>{
                        return <ToDo key={index} data = {todo} setData={setData} stateData={data}/>
                    })}
                </tbody>
            </table>
            
        </div>
    );
}