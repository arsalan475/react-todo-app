
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';


 

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
  
 function updateTodo(e) {
  
   
    let  todoref = e.target.closest('.li') 
    let index = todo.indexOf(todoref.firstElementChild.firstElementChild.textContent )
     
     console.log(index)


     
     const updatedValue = prompt('Update todo')   
     todo.splice(index,1,updatedValue || todoref.firstElementChild.firstElementChild.textContent)

     todoref.firstElementChild.firstElementChild.textContent = updatedValue || todoref.firstElementChild.firstElementChild.textContent
      
    }

  return (
    <>
      

      <form onSubmit={addtodo} className=" min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
        <div className="absolute top-[20%] bg-white rounded-lg shadow-md w-full max-w-2xl p-8">
          <div className='text-center mb-5'>
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
            className="mt-2 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition"
          >
            Add Todo
          </button>
        </div>

        <div className="space-y-4">
          {/* Todo Cards */}
          {todo.map((el,i) => (
            <div 
            key={crypto.randomUUID()}
              
              className={` bg-gradient-to-r from-pink-100 to-pink-200 p-4 rounded-md shadow-md hover:shadow-lg transition transform hover:scale-105`}
            >
              <div  className="li flex items-center justify-between">
                <div className="flex items-center">
                 
                  <span className="text-lg text-gray-800">{todo[i]}</span>
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
