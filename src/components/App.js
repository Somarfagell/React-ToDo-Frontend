import { useState } from 'react';
import '../css/App.css';
import Header from './Header.js';
import List from './List';
import Modal from './Modal.js';


function App() {
  //Data goes as follows: [ [Data to map], [Filtered data], page, totalPages, showCreateModal, showUpdateModal]
  const[data,setData] = useState([[],{"text":"","priority":"All","status":"All","prioritySort":"asc","dateSort":""},0,0,false,false]);

  const showNewModal = () => {
    //Only update the showCreateModal
    setData([data[0],data[1],data[2],data[3],true,data[5]]);
  }
  
  return (
    <>
      <Header setData={setData} data={data}/>
      <button type='button' className='buttonToDo' onClick={showNewModal}>+ New To Do</button>
      {data[4]? <Modal setData={setData} data={data}/> : null}
      <List data={data} setData={setData}/>
    </>
  );
}

export default App;
