const url = "http://localhost:8080/todos";
//Data goes as follows: [ [Data to map], [Filtered data], page, totalPages, showCreateModal, showUpdateModal]

export const getData = async (specs) => {
    const response = await fetch(url+'?text='+specs["specifications"][0]+'&priority='+specs["specifications"][1]+'&status='+specs["specifications"][2]+'&page='+specs["actualPage"]);
    const res = await response.json(); //extract JSON from the http response
    //return the data
    return(res);
}

export const updateData = async (updateData) => {
    const response = await fetch(url+'todos', {
        method: 'GET',
        body: JSON.stringify(updateData), // Object type ToDo
        headers: {
            'Content-Type': 'application/json'
        }
    });
    //return the data
    const data = await response.json(); //extract JSON from the http response
}

export const updateStatusData = async (statusData) => {
    //
    const response = await fetch(url+'todos', {
        method: 'GET',
        body: JSON.stringify(data), // Object type ToDo
        headers: {
            'Content-Type': 'application/json'
        }
    });
    //return the data
    const data = await response.json(); //extract JSON from the http response
}

export const pruebas = async (message) => {
    console.log(message);
}
