import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState,  useEffect} from 'react'
import axios from 'axios'

// ============================= Main App===================
function App(props) {

  // const [dataTypes, setDataTypes]=useState();
  const [updateData, setUpdateData]=useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState();
  const [data, setData]=useState([]);
  const [resourceType, setResourceType] = useState();
  const [dataToSend, setDataToSend] = useState({});
  const [requestMethode, setRequestMethode]= useState('GET')
  const [successMessage, setSuccessMessage] = useState()
  const [newTask, setNewtask]=useState();
  const[deleteTask, setDeleteTask]= useState();

    useEffect( () => {
            
            if(deleteTask){
              var url = `http://10.0.0.99:8000/api/task/${taskToUpdate}`;
            }else if(['true', 'false', ''].includes(resourceType)){
              url = `http://10.0.0.99:8000/api/tasks/${resourceType}`;
            }else{
              
              url = `http://10.0.0.99:8000/api/tasks/`;
            }            
            if(updateData && taskToUpdate){
              url = `http://10.0.0.99:8000/api/task/${taskToUpdate}`
              // setRequestMethode(''); 
            }

            //PUT request
            if(requestMethode==="PUT"){
              //Avoid display the UpdateCreatForm by set newTask to Undifined
              setNewtask();
              axios.put(url, dataToSend)
              .then(res=>{
                  setData(res.data);
                  console.log(res.statusText)
                  //set the succeful message
                  setSuccessMessage(res.statusText)
              })
  
              .catch(error =>{
                  console.log(error.message);
                  console.log(error.request);
                  // setSuccessMessage(error.statusText)
              })
            }else if(requestMethode==='DELETE'){
              // setNewtask();
              axios.delete(url, dataToSend)
              .then(res=>{
                  setData(res.data);
                  console.log(res.statusText)
                  //set the succeful message
                  setSuccessMessage(res.statusText)
              })
  
              .catch(error =>{
                  console.log(error.message);
                  console.log(error.request);
              })
            }else if (requestMethode==='GET'){
              //Avoid display the UpdateCreatForm by set newTask to Undifined
              setNewtask();
              setSuccessMessage('')
              //get request
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
    ,[resourceType, updateData, taskToUpdate,requestMethode, deleteTask]);

    const taskHandlerAll = ()=>{
      setRequestMethode("GET")
      setResourceType('');
      setDeleteTask(false);
      setUpdateData(false);
    }

    const taskHandlerCompleted = ()=>{
      setRequestMethode('GET');
      setResourceType('completed');
      setDeleteTask(false);
      setUpdateData(false);
      
    }

    const taskHandlerIncompleted = ()=>{
      setRequestMethode('GET');
      setResourceType('incompleted');
      setDeleteTask(false);
      setUpdateData(false);
      
    }

    const taskHandlerNew = ()=>{
      setRequestMethode('POST');
      setDeleteTask(false);
      setNewtask(true);
    }

    //Delete task
    const onDeleteHandler = (taskId)=>{
      setRequestMethode('DELETE');
      setTaskToUpdate(taskId);
      setDeleteTask(true)
    }

    //Update task
    const handler = (taskId)=>{
      setUpdateData(true);
      setTaskToUpdate(taskId);

    }
    
    const handlerOnChange = (e)=>{
      let dataValue = data
      const name = e.target.name;
      const value = e.target.type==='checkbox'? e.target.checked:e.target.value;
      dataValue[name]=value;
      setDataToSend(dataValue);
      // delete dataValue.id;
      console.log(dataToSend);
      
    }

    const handlerOnSubmit = (e)=>{
      console.log(dataToSend)
      //change the request type PUT or POST
      if(newTask){
        setRequestMethode("POST")
      }else{
      setRequestMethode('PUT');
      }
      e.preventDefault();

    }
    
    // console.log(dataToSend)
  return (
    <div className='container'>
      <div className='bg-secondary container-fluid mb-2 navbar'>
        <button className='btn bg-primary m-5 text-center' onClick={taskHandlerAll}>All The Taks</button>

        <button className='btn bg-primary m-5' onClick={taskHandlerCompleted}>Completed Taks</button>

        <button className='btn bg-primary m-5' onClick={taskHandlerIncompleted}>No Completed Taks</button>
        
        <button className='btn bg-success m-5' onClick={taskHandlerNew}>Add Taks</button>

      </div>

      <Displayer
        data={data}
        update={updateData}
        deleteTask={deleteTask}
        onClick={handler}
        onChange={handlerOnChange} onSubmit={handlerOnSubmit} 
        successMessage={successMessage}
        newTaskBoolean={newTask}
        onDelete={onDeleteHandler}
       />
            
    </div>
    )
}



// ============================= Display App===================
function Displayer(props){

  if(props.newTaskBoolean){
    //create new task
    return <UpdateCreateForm onChange={props.onChange} onSubmit={props.onSubmit}/>
  }
  if(props.deleteTask){
    return <h3 className='text-center text-success'>Your successfully delete the task!!</h3>
  }

  if(props.successMessage){
    return <h2 className='text-center text-success'>You are successfully update the task!</h2>
  }else if(props.update){
    return <UpdateCreateForm data={props.data} onChange={props.onChange} onSubmit={props.onSubmit}/>;
  }else if(props.data.length===0){
    return <h3>Hello!! {props.data.length}</h3>
  }else if(props.data.length>2){
    return <Output data={props.data} onClick={props.onClick} onDelete ={props.onDelete}/>
  }else{
    return <UpdateCreateForm onChange={props.onChange} onSubmit={props.onSubmit}/>
  }
}





// ============================= updatCreateForm App===================
function UpdateCreateForm(props){

  let value = ''
  if(props.data) {value = props.data};
  return (

  <div className='container bg-secondary'>
    <form  onSubmit={(e)=>props.onSubmit(e)}>
      {/* <label> Author:</label> */}
      <input type='text' className='form-control-plaintext bg-white p-2' name='author' hidden defaultValue={value.id} onChange={(e)=>props.onChange(e)}/>
      <br/>
      <label className='ms-5'>Title:</label>
      <input type='text' className='form-control-plaintext bg-white' name='title'  defaultValue={value.title} onChange={(e)=>props.onChange(e)}/>
      <br/>
      <label> Description:</label>
      <textarea name='description' className='form-control-plaintext bg-white'  defaultValue={value.description} onChange={(e)=>props.onChange(e)}/>
      <br/>
      <label> completed :</label>
      <input type='checkbox' className='form-control-plaintext bg-white' name='completed'  defaultChecked={value.completed} onChange={(e)=>props.onChange(e)}/>

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
            <UpdateButhton  id={item.id} onClick={(n=item.id)=>props.onClick(n)} onDelete={(n=item.id)=>props.onDelete(n)}/>
          </div>
          
      </div>
  )))
}


// ============================= Update Button===================
function UpdateButhton(props){
  return (
    <div>
      <button className='btn bg-success m-5 text-center' onClick={()=>props.onClick()}> Update</button>

    <button className='btn bg-danger m-5 text-center' onClick={()=>props.onDelete()} > Delete</button>
    </div>
  )
}
export default App;











