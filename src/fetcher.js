
import axios from 'axios';
import React, {useState, useEffect} from 'react'


 

function Getdata(props){
    const [data, setData]=useState([])
    useEffect( () => {
        if(props.dataType!=='Nothing'){
            const pre_url = 'http://localhost:8000/api/tasks/'
            const url = pre_url + props.dataType
            axios.get(url)
            .then(res=>{
                setData(res.data);
            })

            .catch(error =>{
                console.log(error.message);
            })
        }else{
            console.log('Noything to fetch this time!')
        }
        
    }
    ,[props.dataType,])
    if(props.dataType==='Nothing'){
        
        return <h1>Hello World!!</h1>
    }else{
        return <Output data={data}/>;
    }
    
}


function Output(props){
    return (props.data.map(item =>(
        <div className='card task text-center m-5 bg-secondary' key={item.id}>
            <h1 className='data-display text-success'>{item.author}</h1>
            <h5 className='text-info'>{item.title}</h5>
            <p className='card-body bg-'>{item.description}</p>
            <span className='text-danger'>{item.create_at}</span>
        </div>
    )))
}

export default Getdata;
