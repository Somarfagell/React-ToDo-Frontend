import React from "react";

export default function Modal({data,setData,id}){
    const newData = data;

    const handleSubmit = (e) => {
        e.preventDefault();
        setData([data[0],data[1],data[2],data[3],false,data[5]]);
    }

    return(
        <div className="ToDoContainer">
            <form onSubmit={handleSubmit}>
                <label> Name<input type="text" maxLength={120} name="text"></input></label>
                <label> Due Date<input type="date" name="dueDate"></input></label>
                <div className='priorityWrapper'>
                        <label className='labelStyle'>Priority : </label>
                        <select name="priority" id="priority" className="prioritySelect">
                            <option value="All">All</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>
                <button type="submit">Create ToDo</button>
            </form>
        </div>
    );
}