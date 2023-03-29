import React from "react";
import '../css/Page.css';
import { getData, getStatistics } from "../misc/functions";


export default function Page({ state, setState }) {

    const nextPage = () => {
        refresh(state[2]+1)
    }

    const lastPage = () => {
        refresh(1000)
    }

    const firstPage = () => {
        refresh(0)
    }

    const prevPage = () => {
        if(state[2] > 0)
            refresh(state[2]-1)
    }

    const refresh = (actualPage) => {
        //updating the state data
        //retrieve the new data
        const specs = {
            "specifications": [state[1]["text"], state[1]["priority"], state[1]["status"], state[1]["prioritySort"], state[1]["dateSort"]],
            "actualPage": actualPage
        }
        let response = getData(specs)
        let stats = getStatistics();

        response.then((result) => {
            //Update the data of the state and close modal
            stats.then((res) => {
                setState([result["content"], { "text": specs["specifications"][0], "priority": specs["specifications"][1], "status": specs["specifications"][2], "prioritySort": state[1]["prioritySort"], "dateSort": state[1]["dateSort"] }, result["page"], result["pageSize"], state[4], state[5],res])
            }).catch((err) => {     
            });
        }).catch((err) => {
            alert("Error getting the data");
        });
    }


    return (
        <div className="pageContainer">
            <button className="arrowButton" onClick={firstPage}>
                {'<<'}
            </button>
            <button className="arrowButton" onClick={prevPage}>
                {'<'}
            </button>
            <span>{state[2]+1}</span>
            <button className="arrowButton" onClick={nextPage}>
                {'>'}
            </button>
            <button className="arrowButton" onClick={lastPage}>
                {'>>'}
            </button>
        </div>
    );
}