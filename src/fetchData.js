import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

// import ReactDOM from 'react-dom'
import axios from 'axios'
import output from'./dataHandler'

class Fetcher extends React.Component{
    constructor(props){
        props = super(props);
        this.state = {
            data:[],
        };
    }

    geData(){
        axios.get('http://localhost:8000/api/tasks/true')
        .then(res=>{
            console.log(res.data)
           this.setState({data:res.data});
        //    console.log(this.state.data)
        })

        .catch(error =>{
            console.log(error.message);
        })
    }

    componentDidMount(){
        this.geData();
    }

    // output(data){
    //     return (data.map(item =>(
    //         <div className='task' key={item.id}>
    //             <h1>{item.author}</h1>
    //             <h5>{item.title}</h5>
    //             <p>{item.description}</p>
    //         </div>
    //     )))
    // }
    
    render(){
        return (
            <div className='lol'>
                {
                    // this.state.data.length>1 && (this.output(this.state.data))
                    this.state.data.length>1 && (output(this.state.data))

                }
            </div>
        )
        }
        
    // }s

}

export default Fetcher;