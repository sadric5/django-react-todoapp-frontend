
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

function Form(){

    const handleSubmit= (e) => {
        e.preventDefault();
    }

    const handleOnchange = (e) =>{
        console.log(e.target.value)
    }
    return (
        <form  onSubmit={e => {handleSubmit(e)}}>
            <h1>Hello</h1>
            <label htmlFor='name'> Your nane </label>
            <input type='text' id='name' onChange={e =>{handleOnchange(e)}}/>
            <input type="submit" value="send"/>
        </form>
    )
}

export {Form as default, Output};
// export default Form;