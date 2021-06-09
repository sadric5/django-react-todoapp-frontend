import React from 'react';
import axios from 'axios';
import './form.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
function Output(props){

    // function b (ev, id){
    //     return console.log(ev);
    // }

    function hello(){
        console.log('Hello world!')
    }

    return (props.data.map(item =>(
        <div className='card task text-center m-4 border-5 bg-light' key={item.id}>
            <h1 className='data-display text-success' hidden>{item.author}</h1>
            <h5 className='text-info'>{item.title}</h5>
            <p className='card-body bg-'>{item.description}</p>
            <span className='text-danger'>{item.create_at}</span>
            <div>
                <button className='btn bg-success m-4 update' onClick={hello()}>Update {item.id}</button>
                <button className='btn bg-danger m-4 delete'>Delete {item.id}</button>
            </div>

        </div>
    )))
}

class Form extends React.Component{
    constructor(props){
        super(props);
        this.state={
            author: 'sadric',
            title: '',
            description: '',
            completed: 'false',
            errors : '',
            statusCode: '',
        };

        // this.handleOnchange=this.handleOnchange.bind(this);
        // this.handleSubmit= this.handleSubmit.bind(this);
    }
    handleSubmit= (e) => {
        console.log(this.state.description);
        axios.post('http://10.0.0.99:8000/api/task/', {
            author: this.state.author,
            title: this.state.title,
            description: this.state.description,
            completed: this.state.completed,
        })
          .then((response) => {
            console.log(response.status);
            this.setState({statusCode: response.status})

          }, (error) => {
            console.log(error.message);
            console.log(error.request.response);
            this.setState({errors :error.request.response});
                // JSON.parse(error.request.response)}
          });


        e.preventDefault();
    }

    handleOnChange = (e) =>{

        let name = e.target.name;
        let val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.setState({[name]:val});
    }

    render(){
        if (this.state.errors){
            return (
                <div className='container'>
                    <h1>ERROR: </h1>
                    <span className='text-danger'>{this.state.errors}</span>
                    
                <form  onSubmit={this.handleSubmit}>
                    <label> Author:</label>
                    <input type='text' className='form-control-plaintext bg-white' name='author' onChange={this.handleOnChange}/>
                    <br/>
                    <label className='ms-5'>Title:</label>
                    <input type='text' className='form-control-plaintext bg-white' name='title' onChange={this.handleOnChange}/>
                    <br/>
                    <label> Description:</label>
                    <textarea name='description' className='form-control-plaintext bg-white' onChange={this.handleOnChange}/>
                    <br/>
                    <label> completed :</label>
                    <input type='checkbox' className='form-control-plaintext bg-white' name='completed' onChange={this.handleOnChange}/>
        
                    <br/>
                    <input className='ms-4 text-success' type="submit" value="send"/>
                </form>
                </div>
            )

        }else if(this.state.statusCode){
           return <p className='text-success'> You're successfully created a new task.</p>
        }else{
            return (
                <div className='container'>
                <form  onSubmit={this.handleSubmit}>
                    <label> Author:</label>
                    <input type='text' className='form-control-plaintext bg-white' name='author' onChange={this.handleOnChange}/>
                    <br/>
                    <label className='ms-5'>Title:</label>
                    <input type='text' className='form-control-plaintext bg-white' name='title' onChange={this.handleOnChange}/>
                    <br/>
                    <label> Description:</label>
                    <textarea name='description' className='form-control-plaintext bg-white' onChange={this.handleOnChange}/>
                    <br/>
                    <label> completed :</label>
                    <input type='checkbox' className='form-control-plaintext bg-white' name='completed' onChange={this.handleOnChange}/>
        
                    <br/>
                    <input className='ms-4 text-success' type="submit" value="send"/>
                </form>
                </div>
            )
        }
        
    }
    
}

export {Form as default, Output};
// export default Form;