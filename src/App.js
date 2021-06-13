import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState,  useEffect} from 'react'
import axios from 'axios'

// ============================= Main App===================
function App(props) {

  const [dataTypes, setDataTypes]=useState('')
  const [updateData, setUpdateData]=useState(false)
  const [data, setData]=useState([])
  const [resourceType, setResourceType] = useState('')

    useEffect( () => {
            let url = `http://10.0.0.99:8000/api/tasks/${resourceType}`
            if(updateData) url = `http://10.0.0.99:8000/api/task/1`
            axios.get(url)
            .then(res=>{
                setData(res.data);
            })

            .catch(error =>{
                console.log(error.message);
                console.log(error.request);
            })
        
    }
    ,[resourceType, updateData])

    const taskHandler = ()=>{
      setUpdateData(false);
      setResourceType('');
    }

    const taskHandler1 = ()=>{
      setUpdateData(false);
      setResourceType('true');
    }

    const taskHandler2 = ()=>{
      setUpdateData(false);
      setResourceType('false');
    }

    const taskHandler3 = ()=>{
      setUpdateData(false);
      setResourceType('Nothing');
    }

    const handler = ()=>{
      setUpdateData(true);

    }
  
  return (
    <div className='container'>
      <div className='bg-secondary container-fluid mb-2 navbar'>
        <button className='btn bg-primary m-5 text-center' onClick={taskHandler}>All The Taks</button>

        <button className='btn bg-primary m-5' onClick={taskHandler1}>Completed Taks</button>

        <button className='btn bg-primary m-5' onClick={taskHandler2}>No Completed Taks</button>
        
        <button className='btn bg-success m-5' onClick={taskHandler3}>Add Taks</button>

      </div>

      <Displayer data={data} update={updateData} onClick ={handler}/>
            
    </div>
    )
}



// ============================= Display App===================
function Displayer(props){

  if(props.update){
    return <UpdateCreateForm data={props.data}/>;
  }else if(props.data.length===0){
    return <h3>Hello!! {props.data.length}</h3>
  }else if(props.data.length>2){
    return <Output data={props.data} onClick ={props.onClick}/>
  }else{
    return <h3>HI THERE</h3>
  }
}





// ============================= updatCreateForm App===================
function UpdateCreateForm(props){

  let value = ''
  if(props.data) value = props.data;
  return (

  <div className='container bg-secondary'>
  <form  >
    {/* {console.log(value)} */}
    <label> Author:</label>
    <input type='text' className='form-control-plaintext bg-white p-2' name='author' value={value.id}/>
    <br/>
    <label className='ms-5'>Title:</label>
    <input type='text' className='form-control-plaintext bg-white' name='title'  value={value.title}/>
    <br/>
    <label> Description:</label>
    <textarea name='description' className='form-control-plaintext bg-white'  value={value.description}/>
    <br/>
    <label> completed :</label>
    <input type='checkbox' className='form-control-plaintext bg-white' name='completed'  defaultChecked={value.completed}/>

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

          <div>
            <UpdateButhton  id={item.id} onClick={props.onClick}/>
          </div>
          
      </div>
  )))
}


// ============================= Update Button===================
function UpdateButhton(props){
  return (
    <div>
      <button className='btn bg-success m-5 text-center' onClick={props.onClick}> Update</button>

      <button className='btn bg-danger m-5 text-center' > Delete</button>
    </div>
  )
}
export default App;











