import { useState, useEffect} from 'react';
import { getData } from '../misc/functions';
import '../css/App.css';
import Header from './Header.js';
import List from './List';
import Modal from './Modal.js';


function App() {
  //Data goes as follows: [ [Data to map], [Filtered data], page, totalPages, showCreateModal, showUpdateModal]
  const [data, setData] = useState([[], { "text": "", "priority": "All", "status": "All", "prioritySort": "asc", "dateSort": "" }, 0, 0, false, false]);

  const showNewModal = () => {
    //Only update the showCreateModal
    setData([data[0], data[1], data[2], data[3], true, data[5]]);
  }

  //Initialy fetch the data to the back so it isn't empty
  const refresh = () => {
    const specs = {
      "specifications": [data[1]["text"], data[1]["priority"], data[1]["status"], data[1]["prioritySort"], data[1]["dateSort"]],
      "actualPage": data[2]
    }
    //Get the data from the form
    let response = getData(specs)
    response.then((result) => {
      //Update the data of the state
      setData([result["content"], { "text": specs["specifications"][0], "priority": specs["specifications"][1], "status": specs["specifications"][2], "prioritySort": data[1]["prioritySort"], "dateSort": data[1]["dateSort"] }, result["page"], result["pageSize"], data[4], data[5]])
    }).catch((err) => {
      alert("Error getting the data");
    });

  }

  useEffect(() => {
    refresh();
    
  }, [])



  return (
    <>
      <Header setData={setData} data={data} />
      <button type='button' className='buttonToDo' onClick={showNewModal}>+ New To Do</button>
      {data[4] ? <Modal setData={setData} data={data} /> : null}
      <List data={data} setData={setData} />
    </>
  );
}

export default App;
