
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Form, {Output} from './myForm';


function Getdata(props){
    const [data, setData]=useState([])
    useEffect( () => {
        if(props.dataType!=='Nothing'){
            const pre_url = 'http://10.0.0.99:8000/api/tasks/'
            const url = pre_url + props.dataType
            axios.get(url)
            .then(res=>{
                setData(res.data);
                console.log(res.request.responseURL);
            })

            .catch(error =>{
                console.log(error.message);
                console.log(error.request);
            })
        }else{
            console.log('Noything to fetch this time!')
        }
        
    }
    ,[props.dataType,])
    if(props.dataType==='Nothing'){
        
        return <Form/>
    }else{
        return <Output data={data}/>;
    }
    
}
export default Getdata;

