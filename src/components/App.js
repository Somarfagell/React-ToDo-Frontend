import { useState } from 'react';
import '../css/App.css';
import Header from './Header.js';
import Modal from './Modal.js';


function App() {
  //Data goes as follows: [ [Data to map], [Filtered data], page, totalPages, showCreateModal, showUpdateModal]
  const[data,setData] = useState([[],{"text":"","priority":"All","status":"All"},0,0,false,false]);

  const showNewModal = () => {
    //Only update the showCreateModal
    setData([data[0],data[1],data[2],data[3],true,data[5]]);
  }
  
  return (
    <>
      <Header setData={setData} data={data}/>
      <button type='button' className='buttonToDo' onClick={showNewModal}>+ New To Do</button>
      {data[4]? <Modal setData={setData} data={data}/> : null}
    </>
  );
}

export default App;
