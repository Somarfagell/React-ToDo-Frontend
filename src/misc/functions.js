const url = "http://localhost:8080/todos";
//Data goes as follows: [ [Data to map], [Filtered data], page, totalPages, showCreateModal, showUpdateModal]

export const getData = async (specs) => {
    const response = await fetch(url+'?text='+specs["specifications"][0]+'&priority='+specs["specifications"][1]+'&status='+specs["specifications"][2]+'&page='+specs["actualPage"]+'&prioritySort='+specs["specifications"][3]+'&dateSort='+specs["specifications"][4]);
    const res = await response.json(); //extract JSON from the http response
    //return the data
    return(res);
}

export const updateData = async (id, todo) => {
    await fetch(url+'/'+id, {
        method: 'PUT',
        body: JSON.stringify(todo), // Object type ToDo
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return ;
}

export const deleteData = async (id) => {
    await fetch(url+'/'+id, {
        method: 'DELETE',
        body: null, // Object type ToDo
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return ;
}

export const updateStatusData = async (statusData, id) => {
    //In case it is set as DONE
    if(statusData === true){
        await fetch(url+'/'+id+"/done", {
            method: 'PUT',
            body: null, // Object type ToDo
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } else{
    //In Case it is set as UNDONE
        await fetch(url+'/'+id+"/undone", {
            method: 'PUT',
            body: null, // Object type ToDo
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    //return
    return;
}

export const sendData = async (todo) => {
    await fetch(url, {
        method: 'POST',
        body: JSON.stringify(todo), // Object type ToDo
        headers: {
            'Content-Type': 'application/json'
        }
    });
    //return the data
    return;
}
