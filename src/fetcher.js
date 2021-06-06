
import axios from 'axios';
import React, {useState, useEffect} from 'react'


 

function Getdata(props){
    const [data, setData]=useState([])
    useEffect( () => {
        const pre_url = 'http://localhost:8000/api/tasks/'
        const url = pre_url + props.dataType
        axios.get(url)
        .then(res=>{
            setData(res.data);
        })

        .catch(error =>{
            console.log(error.message);
        })
    }
    ,[props.dataType,])

        return <Output data={data}/>;
}


function Output(props){
    return (props.data.map(item =>(
        <div className='task' key={item.id}>
            <h1 className='data-display'>{item.author}</h1>
            <h5>{item.title}</h5>
            <p>{item.description}</p>
        </div>
    )))
}

export default Getdata;
