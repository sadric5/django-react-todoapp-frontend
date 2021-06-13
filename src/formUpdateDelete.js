
import Getdata from './getDataFromApi'



function UpdateForm(props){

    function updateTask(e){
        e.preventDefault();
        console.log('Update');
        return <Getdata no='true'/>
    }

    function deleteTask(){
        console.log('Delete')
    }

    return (
        <div>
            <form onSubmit={updateTask}>
                <input type='text' name={props.id} value={props.id} readOnly hidden/>
                <br/>
                <button type='submit' className='btn bg-success m-4 update'>
                    Update {props.id}
                </button>
            </form>
            {/* <button className='btn bg-danger m-4 delete' onClick={(deleteTask)}>Delete {props.id}</button> */}
        </div>
    )
}

export {UpdateForm as default, }