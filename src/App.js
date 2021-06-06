import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from 'react'
import Getdata from './fetcher'

function App(props) {
  const [dataTypes, setDataTypes]=useState(props.dataType)
    return (
    <div>
        <button className='btn bg-primary m-3' onClick={()=>setDataTypes('')}>All The Taks</button>
        <button className='btn bg-primary m-3' onClick={()=>setDataTypes('true')}>Completed Taks</button>
        <button className='btn bg-primary m-3' onClick={()=>setDataTypes('False')}>No Completed Taks</button>
        <Getdata dataType={dataTypes}/>
    </div>
    )
}

export default App;
