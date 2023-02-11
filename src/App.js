import './App.css';
import { useState } from "react"

function App() {
  let [value, setValue] = useState("");//input value added by ueser
  let [show, setShow] = useState([]);//array created with all input task added
  let [updateBtn, setUpdateBtn] = useState(true);
  const [Edit, setIsEdit] = useState();

  // console.log(show)

  // For adding task in task-wrapper
  let addTask = () => {

    if (value.length === 0) {
      alert("enter some task")
    } else if (value && !updateBtn) {
      setShow(
        show.map((e) => {
          if (e.id === Edit) {
            return { ...show, name: value }
          }
          return e;
        })
      )
      setUpdateBtn(true);
      setValue("")
      setIsEdit(null);
    }
    else {
      const allInput = { id: new Date().getTime().toString(), name: value }
      let added = [...show, allInput]
      setShow(added);
      setValue("")
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
    // console.log(newEditItem)
    setUpdateBtn(false);
    setValue(newEditItem.name)
    setIsEdit(id);
  }


  // for clearing all the data after click on clearAll
  let clearAllData = () => {
    setShow([]);
  }

  return (
    <div className='container-fluid'>
      <h1 className='heading'>To Do List</h1>
      <div className="top">
        <div className='input-wrapper'>
          <input type="text" className="form-control" value={value} onChange={(e) => setValue(e.target.value)} />
          {
            // This button chanes conditionally for adding and updating
            updateBtn ? <button className="btn btn-secondary mx-2" onClick={addTask}>Add</button> :
              <button className="btn btn-success mx-2" onClick={addTask}>update</button>
          }
          {/* <button className="btn btn-primary mx-2" onClick={addTask}>Add</button> */}
        </div>

      </div>
      {/* all taska are added here */}
      <div className="tasks-wrapper">
        <div>
          {
            show.map((e, i) => (
              <div className='mt-3' key={e.id}>
                <div className='task-name'>
                  <h4 className='tasks mt-2' >{e.name}</h4>
                </div>
                <div className='edit-delete'>
                  {/* this is edit button */}
                  <i className="fa-solid fa-pen-to-square" onClick={() => editTask(e.id)} ></i>
                  {/* this is task delete button */}
                  <i className="fa-solid fa-trash-can mx-2" title='delete' onClick={() => removeTask(e.id)}></i>
                </div>
              </div>

            ))
          }
          <div className='button-wrapper'>
            {/* for clearing all the data */}
            <button className='btn btn-danger' onClick={clearAllData}>clearAll</button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
