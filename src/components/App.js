import { useState, useEffect} from 'react';
import { getData, getStatistics } from '../misc/functions';
import '../css/App.css';
import Header from './Header.js';
import List from './List';
import Modal from './Modal.js';
import Page from './Page';
import Statistics from './Statistics';


function App() {
  //Data goes as follows: [ [Data to map], [Filtered data], page, totalPages, showCreateModal, showUpdateModal, statistic-times]
  const [data, setData] = useState([[], { "text": "", "priority": "All", "status": "All", "prioritySort": "asc", "dateSort": "asc" }, 0, 0, false, false, {"total":0,'low':0,'medium':0,'high':0}]);

  const showNewModal = () => {
    //Only update the showCreateModal
    setData([data[0], data[1], data[2], data[3], true, data[5], data[6]]);
  }

  //Initialy fetch the data to the back so it isn't empty
  const refresh = () => {
    const specs = {
      "specifications": [data[1]["text"], data[1]["priority"], data[1]["status"], data[1]["prioritySort"], data[1]["dateSort"]],
      "actualPage": data[2]
    }
    //Get the data from the form
    let response = getData(specs)
    let stats = getStatistics();

    response.then((result) => {
      //Update the data of the state
      stats.then((res) => {
        setData([result["content"], { "text": specs["specifications"][0], "priority": specs["specifications"][1], "status": specs["specifications"][2], "prioritySort": data[1]["prioritySort"], "dateSort": data[1]["dateSort"] }, result["page"], result["pageSize"], data[4], data[5],res])
      }).catch((err) => {
      });
    }).catch((err) => {
    });
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  



  return (
    <>
      <Header setData={setData} data={data} />
      <button type='button' className='buttonToDo' onClick={showNewModal}>+ New To Do</button>
      {data[4] ? <Modal setData={setData} data={data} /> : null}
      <List data={data} setData={setData} />
      <Page state = {data} setState={setData}/>
      <Statistics stats={data[6]}/>
    </>
  );
}

export default App;
