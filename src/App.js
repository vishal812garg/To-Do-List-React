import './App.css';
import { useState } from "react"

function App() {
  let [task, setTask] = useState("");//input value added by ueser
  let [show, setShow] = useState([]);//array created with all input task added
  let [updateBtn, setUpdateBtn] = useState(true);
  const [isEdit, setIsEdit] = useState();

  // console.log(show)

  // For adding task in task-wrapper
  let addTask = () => {

    if (task.length === 0) {
      alert("enter some")
    } else if (task && !updateBtn) {
      setShow(
        show.map((e) => {
          if (e.id === isEdit) {
            return { ...show, name: task }
          }
          return e;
        })
      )
      setUpdateBtn(true);
      setTask("")
      setIsEdit(null);
    }
    else {
      const allInput = { id: new Date().getTime().toString(), name: task }
      let added = [...show, allInput]
      setShow(added);
      setTask("")
    }


  }

  // for removing element from array and view 
  let removeTask = (index) => {
    // console.log(index)
    let filtered = show.filter((value) => index !== value.id);
    setShow(filtered)
    console.log(filtered)
  }



  // editing tasks using its index number
  let editTask = (id) => {
    const newEditItem = show.find((value) => {
      return value.id === id
    })
    console.log(newEditItem)
    setUpdateBtn(false);
    setTask(newEditItem.name)
    setIsEdit(id);
  }
  // for clearing all the data
  let clearAllData = () => {
    setShow([]);
  }

  return (
    <div className='container-fluid'>
      <h1 className='heading'>To Do List</h1>
      <div className="top">
        <div className='input-wrapper'>
          <input type="text" className="form-control" value={task} onChange={(e) => setTask(e.target.value)} />
          {
            updateBtn ? <button className="btn btn-secondary mx-2" onClick={addTask}>Add</button> :
              <button className="btn btn-success mx-2" onClick={addTask}>update</button>
          }
          {/* <button className="btn btn-primary mx-2" onClick={addTask}>Add</button> */}
        </div>

      </div>
      <div className="tasks-wrapper">
        <div>
          {
            show.map((e, i) => (
              <div className='mt-3' key={e.id}>
                <div className='task-name'>
                  <h4 className='tasks mt-2' >{e.name}</h4>
                </div>
                <div className='edit-delete'>
                  <i className="fa-solid fa-pen-to-square" onClick={() => editTask(e.id)} ></i>
                  <i className="fa-solid fa-trash-can mx-2" title='delete' onClick={() => removeTask(e.id)}></i>
                </div>
              </div>

            ))
          }
          <div className='button-wrapper'>
            <button className='btn btn-danger' onClick={clearAllData}>clear</button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
