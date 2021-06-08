import React from 'react';
import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
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

class Form extends React.Component{
    constructor(props){
        super(props);
        this.state={
            author: 'sadric',
            title: '',
            description: '',
            completed: 'false',
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
            console.log(response);
            console.log(response.request.response);

          }, (error) => {
            console.log(error.message);
            console.log(error.request.response);
          });


        console.log(this.state.author +" " +this.state.completed)
        e.preventDefault();
    }

    handleOnChange = (e) =>{

        let name = e.target.name;
        // console.log(e.target.checked)
        let val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.setState({[name]:val});
    }

    render(){
        return (
            <div className='container'>
                <h1> Hi </h1>

            <form  onSubmit={this.handleSubmit}>
                <label> Author:</label>
                <input type='text' name='author' onChange={this.handleOnChange}/>
                <br/>
                <label className='ms-5'>Title:</label>
                <input type='text' name='title' onChange={this.handleOnChange}/>
                <br/>
                <label> Description:</label>
                <textarea name='description' onChange={this.handleOnChange}/>
                <br/>
                <label> completed :</label>
                <input type='checkbox' defaultChecked={this.state.completed} name='completed' onChange={this.handleOnChange}/>
    
                <br/>
                <input className='ms-4 text-success' type="submit" value="send"/>
            </form>
            </div>
        )
    }
    
}

export {Form as default, Output};
// export default Form;