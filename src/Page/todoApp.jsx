import { useEffect, useState,useRef } from "react"
import { deleteDoc,updateDoc } from "firebase/firestore";
import { collection, addDoc ,where,doc,query} from "firebase/firestore"; 
import { onAuthStateChanged ,signOut} from "firebase/auth";
import { auth,db } from "../fireBaseConfig";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from "react-router-dom";
import LoadingBtn from "../component/LoadingBtn";


import {getDocs } from "firebase/firestore"; 

function TodoApp({location,setLocation}) {
 





  const [text, setText] = useState('')
  const [todo,setTodo] = useState([])
  const [docid, setDocId] = useState([])
  const [loading, isLoading] = useState(false)
 
  useEffect(function(){
    setLocation(window.location.pathname)
    onAuthStateChanged(auth, (user) => {
      if (user) {
       
        const uid = user.uid;
        
        getTodos(user)
        
      } else {
       navigate('/login')
      }
    });
  
    async function getTodos(user) {
      
      let allTodos ='';
      let addDocId=''
     
     
  const q = query(collection(db, "todos"), where("uid", "==", user.uid))
  
      const querySnapshots = await getDocs(q)
  
      querySnapshots.forEach((doc) => {
        
          allTodos += `"${doc.data().title}`
          addDocId += `"${doc.id}`
        
        });
  
  
      setTodo(allTodos.split('"').slice(1))
       setDocId(addDocId.split('"').slice(1))
     
      
    }
    
  },[])
    
  
  const navigate = useNavigate()

 
  
   async function addtodo(e) {
  
      e.preventDefault()
      if(!text) return
      isLoading(true)
      try {
        const docRef = await addDoc(collection(db, "todos"), {
          title: text,
          uid: auth.currentUser.uid,
          id:Math.random(),
        });
isLoading(false)
        setTodo([...todo, text])
        setDocId([...docid, docRef.id])
       
      } catch (e) {
        alert("Error adding document: ", e);
        isLoading(false)
      }

   setText("")
  }
  
   async function deleteTodo(e) {
      
     let todoref = e.target.closest('.li')
     let  todorefParent = e.target.closest('.empty')
     let parent = e.target.closest('.li').closest(".space-y-4")
     let index = todo.indexOf(todoref.firstElementChild.firstElementChild.textContent )
      
     if (!todoref) return
     console.log(todorefParent)
     console.log(todoref)
     
     const userRef = doc(db,'todos',todoref.id)
     
     try{
       await deleteDoc(userRef).then((res) => {
         console.log('sucessfully Deleted')
          todo.splice(index,1)
         todoref.remove()
         todorefParent.className = ''
       });
       
     }catch (e) {
       console.log(e.message)
     }
  }
  

  //// specific function updating todos but this not the good way bcoz we are breaking DRY  rule
  
  
  let editableRef = useRef(false)
  
  async function forUpdatingTodos(UserUid) {
   
    let allTodos ='';
    let addDocId=''
   
const q = query(collection(db, "todos"), where("uid", "==", UserUid))

    const querySnapshots = await getDocs(q)

    querySnapshots.forEach((doc) => {
      
        allTodos += `"${doc.data().title}`
        addDocId += `"${doc.id}`
      
      });


    setTodo(allTodos.split('"').slice(1))
     setDocId(addDocId.split('"').slice(1))
     
    
  }


///// UPDATE TODO FUNCTION

  
   async function updateTodo(e) {
  
   
   
     let todoref = e.target.closest('.li') 
     let defaulValue = todoref.firstElementChild.querySelectorAll('span')[0]
     let extraInfo = todoref.firstElementChild.querySelectorAll('span')[1]
     let inputField = todoref.firstElementChild.firstElementChild
     
   
     
    //  inputRef = inputField
  
    


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
       await updateDoc(doc(db, "todos", todoref.id), {
         title: inputField.value || defaulValue.textContent
       }).then((updated) => {
        inputField.setAttribute("disabled", true);
         
        inputField.style.display= 'none'
         defaulValue.style.display = 'block'
         extraInfo.style.display='none'
          forUpdatingTodos(auth.currentUser.uid)
         
       });
     }
     editableRef = !editableRef
     
    }

  return (
    <>
      

      <form onSubmit={addtodo} className="min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
      <div className="absolute top-[20%] bg-white rounded-lg shadow-md w-full max-w-2xl p-8">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Todo App</h1>

        <div className="mb-4">
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
              placeholder="Add a new todo"
              value={text} onChange={ (e)=>{setText(e.target.value)}}
          />
         
            

            {loading ? <LoadingBtn/>:
    <button  type="submit" 
    className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
  >
    Add Todo
  </button> 
            
          }
        </div>
         
        <div className="space-y-4">
          {/* Todo Cards */}
            {todo.length > 0 ? todo.map((el, i) => (
            
              
            <div  id={docid[i]} 
            key={crypto.randomUUID()}
              
              className={`empty bg-gradient-to-r from-pink-100 to-pink-200 p-3 rounded-md shadow-md hover:shadow-lg transition transform hover:scale-105`}
            >
              
              <div id={docid[i]}  className="li flex items-center justify-between">
                <div className="flex flex-col gap-2">
                 
                    <input   className=" outline-none hidden bg-transparent text-gray-800" disabled />
                    <span>{todo[i]}</span>
                    <span className="hidden font-semibold text-xs ">click again on Edit button to save changes</span>
                </div>
                <div className="flex space-x-2">
                  <button ref={editableRef} onClick={updateTodo} className="text-blue-500 hover:text-blue-700 cursor-pointer">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button onClick={deleteTodo} className="text-red-500 hover:text-red-700 cursor-pointer">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
                </div>
                </div>
           
          )):<h1>Todos not found</h1>}
        </div>
      </div>
    </form>
      
      
     
      
    </>

  )
}

export default TodoApp
