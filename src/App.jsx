import { useState } from 'react'

// import './App.css'

function App() {
  const [text, setText] = useState('')
  const [todo,setTodo] = useState([])


  function addtodo(e) {

    e.preventDefault()
    if(!text) return
    setTodo([...todo,text])
 setText("")
}

  function deleteTodo(e) {
    
    const index = todo.indexOf(e.target.closest('li').children[0].textContent)
    
     todo.splice(index,1)
    
    setTodo([...todo])

  }

  function updateTodo(e) {

   const defaulValue = e.target.closest('li').children[0].textContent
    const index = todo.indexOf(e.target.closest('li').children[0].textContent)
    
    todo.splice(index,1,window.prompt("update you todo") || defaulValue)
    
    setTodo([...todo])
    
  }


  return (
    <div style={{width:'100%',textAlign:'center'}}>
      <form onSubmit={addtodo}  >
        <h1>Todo App</h1>
        <input type="text" value={text} onChange={ (e)=>{setText(e.target.value)}} />
        <button type="submit">Add</button>

        {todo.map((el,i) => {
          return <div key={crypto.randomUUID()}>
            <li ><span>{todo[i]}</span> <button type='button' value ="text" onClick={deleteTodo}>delete</button>
            <button type='button' onClick={updateTodo}>Update</button></li>
            
          </div>
        })}
     </form>
    </div>
  )
}


export default App
