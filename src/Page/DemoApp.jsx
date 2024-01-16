
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState,useRef } from 'react';


 

function TodoApp() {
 




  const [text, setText] = useState('')
  const [todo,setTodo] = useState([])
  

  
  
 
  
   function addtodo(e) {
  
      e.preventDefault()
      if(!text) return

     

        setTodo([...todo, text])
        
       
     

   setText("")
  }
  
   function deleteTodo(e) {
      
       let todoref = e.target.closest('.li');

       let index = todo.indexOf(todoref.firstElementChild.firstElementChild.textContent )
     
       todoref.remove()
       todo.splice(index,1)


  
       

  }
  
  let editableRef = useRef(false)


  
  async function updateTodo(e) {
  
   
   
    let todoref = e.target.closest('.li') 
    let defaulValue = todoref.firstElementChild.querySelectorAll('span')[0]
    let extraInfo = todoref.firstElementChild.querySelectorAll('span')[1]
    let inputField = todoref.firstElementChild.firstElementChild
    let index = todo.indexOf(defaulValue.textContent )


    if (editableRef) {
     inputField.removeAttribute("disabled");
      inputField.style.display = 'block';
      inputField.value = defaulValue.textContent
      defaulValue.style.display = 'none'
      inputField.focus()
      extraInfo.style.display='block'
    }
    
    
   
    
   //  const updatedValue = prompt('Update todo')   || inputField.value
    if (editableRef === false) {
      
      inputField.setAttribute("disabled", true);
      inputField.style.display = 'none'
      defaulValue.style.display = 'block'
      extraInfo.style.display = 'none'
       
      console.log(index)
      
      const updatedValue = inputField.value;
      todo.splice(index, 1, updatedValue || defaulValue.textContent)
    

      defaulValue.textContent = updatedValue || defaulValue.textContent
    }
    editableRef = !editableRef
      
    }



   

  return (
    <>
      

      <form onSubmit={addtodo} className=" min-h-screen bg-gradient-to-r from-blue-500 to-slate-500 flex items-center justify-center">
        <div className="absolute top-[20%] bg-white rounded-lg shadow-md w-full max-w-2xl p-8">
          <div className='text-center mb-5'>
          <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Todo App</span></h1>
          <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">This is Demo Version</h1>
          <h1>Register Now For Real Experience</h1>
          </div>
        <div className="mb-4">
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
              placeholder="Add a new todo"
              value={text} onChange={ (e)=>{setText(e.target.value)}}
          />
          <button  type="submit" 
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Add Todo
          </button>
        </div>

        <div className="space-y-4">
          {/* Todo Cards */}
          {todo.map((el,i) => (
            <div 
            key={crypto.randomUUID()}
              
              className={` bg-gradient-to-r font-semibold from-slate-100 to-blue-200 p-4 rounded-md shadow-md hover:shadow-lg transition transform hover:scale-105`}
            >
              <div  className="li flex items-center justify-between">
              <div className="flex flex-col gap-2">
                 
                 <input   className=" outline-none hidden bg-transparent text-gray-800" disabled />
                 <span className="font-semibold">{todo[i]}</span>
                 <span className="hidden text-blue-600 font-semibold text-xs ">click again on Edit button to save changes</span>
             </div>
                <div className="flex space-x-2">
                  <button onClick={updateTodo} className="text-blue-500 hover:text-blue-700 cursor-pointer">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button onClick={deleteTodo} className="text-red-500 hover:text-red-700 cursor-pointer">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
      
     
    </>

  )
}

export default TodoApp




