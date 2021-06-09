import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from 'react'
import Getdata from './fetcher'

function App(props) {
  document.title='Todo List'
  const [dataTypes, setDataTypes]=useState(props.dataType)
    return (
    <div className='container'>
      <div className='bg-secondary container-fluid mb-2 navbar'>
        <button className='btn bg-primary m-5 text-center' onClick={()=>setDataTypes('')}>All The Taks</button>
        <button className='btn bg-primary m-5' onClick={()=>setDataTypes('true')}>Completed Taks</button>
        <button className='btn bg-primary m-5' onClick={()=>setDataTypes('False')}>No Completed Taks</button>
        <button className='btn bg-success m-5' onClick={() =>setDataTypes('Nothing')}>Add Taks</button>
        </div>
        <div className='container bg-light'>
          <Getdata dataType={dataTypes}/>
        </div>
    </div>
    )
}

export default App;
