import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState,  useEffect} from 'react'
import axios from 'axios'

// ============================= Main App===================
function App(props) {

  // const [dataTypes, setDataTypes]=useState();
  let init = {
    'author':1,
    'description':'',
    'title':'',
    'completed':false
  }//Initial data for new task

  const [updateData, setUpdateData]=useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState();
  const [data, setData]=useState([]);
  const [resourceType, setResourceType] = useState();
  const [dataToSend, setDataToSend] = useState({});
  const [requestMethode, setRequestMethode]= useState('GET')
  const [successMessage, setSuccessMessage] = useState()
  const [newTask, setNewtask]=useState();
  const[deleteTask, setDeleteTask]= useState();
  const [newTaskData, setNewtaskData]= useState(init);

    useEffect( () => {
            
            if(deleteTask || (updateData && taskToUpdate)){
              var url = `http://10.0.0.99:8000/api/task/${taskToUpdate}`;
            }else if(['completed', 'incompleted', ''].includes(resourceType) && !newTask){
              url = `http://10.0.0.99:8000/api/tasks/${resourceType}`;
            }else if(newTask){
              //Make a POST request to this endpoint;
              url = `http://10.0.0.99:8000/api/task/`
            }else{
              
              url = `http://10.0.0.99:8000/api/tasks/`;
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
                  // setData(res.data);
                  console.log(res.statusText)
                  //set the succeful message
                  setSuccessMessage(res.statusText)
                  //Display all Task after delete.
                  setRequestMethode('GET');
              })
  
              .catch(error =>{
                  console.log(error.message);
                  console.log(error.request);
              })
            }else if (requestMethode==='GET'){
              //Avoid display the UpdateCreatForm by set newTask to Undifined
              // setNewtask();
              // setSuccessMessage('')
              //get request
              axios.get(url)
              .then(res=>{
                setData(res.data);
                setNewtask(false)

              })

              .catch(error =>{
                  console.log(error.message);
                  console.log(error.request);
              })
            }else if(requestMethode==="POST"){
              //Create a new Task;
              axios.post(url, newTaskData)
              .then(res=>{
                  setData(res.data);
                  console.log(res.statusText)
                  //set the succeful message
                  setSuccessMessage('')
                  //reset the Request type after success
                  setRequestMethode('GET');
              })
  
              .catch(error =>{
                  console.log(error.message);
                  console.log(error.request);
                  // setSuccessMessage(error.statusText)
              })
            }
        
    }
    ,[resourceType, updateData, taskToUpdate,requestMethode, deleteTask, newTaskData]);

    const taskHandlerAll = ()=>{
      setSuccessMessage();
      setRequestMethode("GET");
      setResourceType('');
      setDeleteTask(false);
      setUpdateData(false);
      setNewtask(false);
    }

    const taskHandlerCompleted = ()=>{
      setSuccessMessage();
      setRequestMethode('GET');
      setResourceType('completed');
      setDeleteTask(false);
      setUpdateData(false);
      setNewtask(false);
      
    }
    const taskHandlerIncompleted = ()=>{
      setSuccessMessage();
      setRequestMethode('GET');
      setResourceType('incompleted');
      setDeleteTask(false);
      setUpdateData(false);
      setNewtask(false);
      
    }

    const taskHandlerNew = ()=>{
      // setData({});
      setRequestMethode('');
      setSuccessMessage();
      setDeleteTask(false);
      setNewtask(true);
      setUpdateData(false)
      
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
    
    const handlerOnChangeForNewTask = (e)=>{
      let name = e.target.name;
      let value = e.target.type==='checkbox'? e.target.checked:e.target.value;
      setNewtaskData({
        ...newTaskData,
        [name]:value
      })
      console.log(newTaskData)
    
    }

    const handlerOnChange = (e)=>{
      // let dataV = {}
      const name = e.target.name;
      const value = e.target.type==='checkbox'? e.target.checked:e.target.value;
      // dataV[name]= value;
      setDataToSend({...data, [name]:value});
      console.log(dataToSend)
      
    }

    const handlerOnSubmit = (e)=>{
      //change the request type PUT or POST
      if(newTask){
        setRequestMethode("POST")
        console.log(newTaskData)
        

      }else if(updateData){
        setRequestMethode('PUT');
        console.log(dataToSend)
      }
      e.preventDefault();

    }
    
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
        method = {requestMethode}//don't need just for debuging
        
        onChange={newTask || data.length===0?handlerOnChangeForNewTask:handlerOnChange}
      
        onSubmit={handlerOnSubmit} 
        successMessage={successMessage}
        newTaskBoolean={newTask}
        onDelete={onDeleteHandler}
       />
            
    </div>
    )
}



// ============================= Display App===================
function Displayer(props){

  if(props.newTaskBoolean || props.data.length===0){
    //create new task
    return <UpdateCreateForm onChange={props.onChange} onSubmit={props.onSubmit}/>
  }else if(props.deleteTask){
    return <h3 className='text-center text-success'>Your successfully delete the task!!</h3>
  }else if(props.successMessage){
    return <h2 className='text-center text-success'>You are successfully update the task!</h2>
  }else if(props.update){
    return <UpdateCreateForm data={props.data} onChange={props.onChange} onSubmit={props.onSubmit}/>;
  }else if(props.data.length>0){
    return <Output data={props.data} onClick={props.onClick} onDelete ={props.onDelete}/>
  }
  else{
    // return <UpdateCreateForm onChange={props.onChange} onSubmit={props.onSubmit}/>
    return <h2>Nothing to display</h2>
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

  const deleteTask= ()=>{
    let confirmationOfDeleteTask = window.confirm('Are you sure you want to this task?')
    if(confirmationOfDeleteTask){
      return props.onDelete()
    }
  }
  return (
    <div>
      <button className='btn bg-success m-5 text-center' onClick={()=>props.onClick()}> Update</button>

    <button className='btn bg-danger m-5 text-center' onClick={()=>deleteTask()}> Delete</button>
    </div>
  )
}
export default App;











