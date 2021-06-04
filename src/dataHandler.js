
import 'bootstrap/dist/css/bootstrap.min.css';


function output(data){
    // console.log(props.name)
    return (data.map(item =>(
        <div className='task' key={item.id}>
            <h1 className='bg-primary lol'>{item.author}</h1>
            <h5>{item.title}</h5>
            <p>{item.description}</p>
        </div>
    )))
}

export default output;