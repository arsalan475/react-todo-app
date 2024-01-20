import { useEffect, useState,useRef, useContext } from "react"
import { deleteDoc,updateDoc } from "firebase/firestore";
import { collection, addDoc ,where,doc,query,Timestamp,orderBy} from "firebase/firestore"; 
import { onAuthStateChanged} from "firebase/auth";
import { auth,db } from "../fireBaseConfig";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate} from "react-router-dom";
import LoadingBtn from "../component/LoadingBtn";
import CircularIndeterminat from "../component/Loader"
import MiniLoader from '../component/MiniLoader'
import {getDocs } from "firebase/firestore"; 
import UserContext from "../Context/Context";


function TodoApp({location,setLocation}) {
 





  const [text, setText] = useState('')
  const [todo,setTodo] = useState([])
  const [docid, setDocId] = useState([])
  const [loading, isLoading] = useState(false);
  const [loadingAllTodos, setLoadingForAllTodos] = useState(false)
  const [miniLoad,setMiniLoad] = useState(false)
  const { isUser, setIsUser } = useContext(UserContext)
  const [operation,setOperation] = useState('')
  useEffect(function(){
    setLocation(window.location.pathname)
   
    onAuthStateChanged(auth, (user) => {
      if (user) {
       
        const uid = user.uid;

        setIsUser(true)
        navigate('/todoApp')
        setLoadingForAllTodos(true)
        getTodos(user)
        
      } else {
       navigate('/login')
      }
    });
  
    async function getTodos(user) {
      
      let allTodos ='';
      let addDocId=''
      
     
  const q = query(collection(db, "todos"), where("uid", "==", user.uid),orderBy("timeStamp", "desc"))

  try {  
      const querySnapshots = await getDocs(q)
  

  

        querySnapshots.forEach((doc) => {
        
          allTodos += `"${doc.data().title}`
          addDocId += `"${doc.id}`
        
        });
        setLoadingForAllTodos(false)

      } catch (error) {
        setLoadingForAllTodos(false)
alert(error.message)
      }
  
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
          timeStamp: Timestamp.fromDate(new Date()),
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
     let defaulValue = todoref.firstElementChild.querySelectorAll('span')[0]
     let  todorefParent = e.target.closest('.empty')
    //  let parent = e.target.closest('.li').closest(".space-y-4")
     let index = todo.indexOf(defaulValue.textContent)
     setOperation('deleting')
     setMiniLoad(true)
     console.log(todoref.id)
     try { 
     const userRef = doc(db, 'todos', todoref.id)
     
     
       await deleteDoc(userRef).then((res) => {
       

         todo.splice(index, 1)
        docid.splice(index,1)

         todorefParent.className = ''
         console.log(todoref.id)
         todoref.remove()
         setMiniLoad(false)
        
       });
     } catch (e) {
       alert(e)
       setMiniLoad(false)
     }


     
  }
  

  //// specific function updating todos but this not the good way bcoz we are breaking DRY  rule
  
  
  let editableRef = useRef(false)
  
  async function forUpdatingTodos(UserUid) {
   
    let allTodos ='';
    let addDocId=''
   
const q = query(collection(db, "todos"), where("uid", "==", UserUid))
try {
    const querySnapshots = await getDocs(q)

   
      querySnapshots.forEach((doc) => {
      
        allTodos += `"${doc.data().title}`
        addDocId += `"${doc.id}`
      
      });
    } catch (error) {
      alert(error.message)
    }

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
       setOperation('updating')
      setMiniLoad(true);
       try{
       await updateDoc(doc(db, "todos", todoref.id), {
         title: inputField.value || defaulValue.textContent
       }).then((updated) => {
         inputField.setAttribute("disabled", true);
         
         inputField.style.display = 'none'
         defaulValue.style.display = 'block'
         extraInfo.style.display = 'none'
         setMiniLoad(false);
         forUpdatingTodos(auth.currentUser.uid)
         
         
       })
      } catch(error){
         setMiniLoad(false)
         alert(error.message)
       };
     }
     editableRef = !editableRef
     
    }

  return (
    <>
      

      <form onSubmit={addtodo} className="min-h-screen bg-gradient-to-r from-black-600 to-white-500 flex items-center justify-center">
      <div className="absolute top-[20%] bg-white rounded-lg shadow-md w-full max-w-2xl p-8">
      <h1 className="mb-6 text-3xl text-center font-extrabold text-gray-900  md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Todo App</span></h1>

        <div className="mb-4">
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
              placeholder="Add a new todo"
              value={text} onChange={ (e)=>{setText(e.target.value)}}
          />
         
            

            {loading ? <LoadingBtn/>:
    <button  type="submit" 
    className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
  >
    Add Todo
  </button> 
            
          }
        </div>
         
        <div className="space-y-4">
            {/* Todo Cards */}
            

            {loadingAllTodos ? <CircularIndeterminat/> :  todo.length ? todo.map((el, i) => (
            
              
            <div 
            key={crypto.randomUUID()}
              
              className={`empty bg-gradient-to-r from-slate-100 to-blue-200 p-3 rounded-md shadow-md hover:shadow-lg transition transform hover:scale-105`}
            >
              
              <div id={docid[i]}  className="li flex items-center justify-between">
                <div className="flex flex-col gap-2">
                 
                    <input   className=" outline-none hidden bg-transparent text-gray-800" disabled />
                    <span className="font-semibold">{todo[i]}</span>
                    <span className="hidden text-blue-600 font-semibold text-xs ">click again on Edit button to save changes</span>
                </div>
                <div className="flex space-x-2">
                  <button ref={editableRef} onClick={updateTodo} className="text-blue-500 hover:text-blue-700 cursor-pointer">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button onClick={deleteTodo} className="text-red-500 hover:text-red-700 cursor-pointer">
                    <FontAwesomeIcon  icon={faTrash} />
                  </button>
                </div>
                </div>
                </div>
           
          )):<h1>Todos not found</h1>}
          </div>
          


          {miniLoad ? <MiniLoader operation={operation} message={operation === 'deleting'? 'Deleting':'Updating'} />:"" }
         
        </div>
        
          
       
        

        
    </form>
      
      
    
  
    </>

  )
}

export default TodoApp
