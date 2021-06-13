import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState,  useEffect} from 'react'
import Getdata, {FetchData} from './getDataFromApi'
import axios from 'axios'
// import Form, {Output} from './myForm';

// ============================= Main App===================
function App(props) {

  const [dataTypes, setDataTypes]=useState('')
  const [updatData, setUpdateData]=useState(false)
 
  const [data, setData]=useState([])
    useEffect( () => {
        if(props.dataType!=='Nothing'){
            const enpoint = 'http://10.0.0.99:8000/api/'
            const pre_url = enpoint+'tasks/'
            const url = pre_url + props.dataType
            axios.get(url)
            .then(res=>{
                setData(res.data);
            })

            .catch(error =>{
                console.log(error.message);
                console.log(error.request);
            })
        }
        
    }
    ,[dataTypes])

  
  return (
    <div className='container'>
      <div className='bg-secondary container-fluid mb-2 navbar'>
        <button className='btn bg-primary m-5 text-center' onClick={()=>setDataTypes('')}>All The Taks</button>

        <button className='btn bg-primary m-5' onClick={()=>setDataTypes('true')}>Completed Taks</button>

        <button className='btn bg-primary m-5' onClick={()=>setDataTypes('False')}>No Completed Taks</button>
        
        <button className='btn bg-success m-5' onClick={() =>setDataTypes('Nothing')}>Add Taks</button>

        <button className='btn bg-primary m-5 text-center' onClick={()=>setUpdateData(true)}> Update</button>

        <button className='btn bg-primary m-5 text-center' onClick={()=>setUpdateData(false)}> Delete</button>
      </div>

      {displayer(updatData, 'Sadric')}
      
    </div>
    )
}



// ============================= Display App===================
function displayer(pros){
  if(pros){
    return <UpdateCreateForm name='Sadric'/>
  }
}





// ============================= updatCreateForm App===================
function UpdateCreateForm(props){
  return (
  <div className='container bg-secondary'>
  <form  >
      <label> Author:</label>
      <input type='text' className='form-control-plaintext bg-white' name='author'/>
      <br/>
      <label className='ms-5'>Title:</label>
      <input type='text' className='form-control-plaintext bg-white' name='title'/>
      <br/>
      <label> Description:</label>
      <textarea name='description' className='form-control-plaintext bg-white'/>
      <br/>
      <label> completed :</label>
      <input type='checkbox' className='form-control-plaintext bg-white' name='completed'/>

      <br/>
      <input className='ms-4 text-success' type="submit" value="send"/>
  </form>
  </div>)
}




// ============================= DisplayData App===================
function Output(props){

  return (props.data.map(item =>(
      <div className='card task text-center m-4 border-5 bg-light' key={item.id}>
          <h1 className='data-display text-success' hidden>{item.author}</h1>
          <h5 className='text-info'>{item.title}</h5>
          <p className='card-body bg-'>{item.description}</p>
          <span className='text-danger'>{item.create_at}</span>
          
      </div>
  )))
}
export default App;






























{/* 
        
        </div>
        <div className='container bg-light'>
          <Getdata dataType={dataTypes}/>
        </div> */}
