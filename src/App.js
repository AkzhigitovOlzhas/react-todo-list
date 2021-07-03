import React, { useEffect } from "react";
import ToDoList from "./ToDo/TodoList";
import Context from "./context";
import AddTodo from "./ToDo/AddTodo";
import Loader from "./Loader";
import Modal from "./Modal/Modal";

function App() {

  const [todos,setTodos] = React.useState([]);
  const [loading,setLoading] = React.useState(true);

useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=3')
    .then(response => response.json())
    .then(todos => {
      setTimeout(() => {
        setTodos(todos) 
        setLoading(false) 
      }, 1000);
    })
},[])

  function toggleTodo(id) { 
    setTodos(todos.map(el => {
      if(el.id === id){ 
        el.complited = !el.complited;  
      }
      return el;
    }))
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo=>todo.id!==id))
  }

  function addTodo(title) {
    setTodos(
      todos.concat([
        {
          title,
          id: Date.now(),
          complited:false,
        }
      ])
    )
  }

  return (
  <Context.Provider value={{removeTodo}}>  
    <div className="wrapper"> 
      <h1 className='title'>ToDo List</h1>
      <Modal/>
      <AddTodo onCreate={addTodo} />

      {loading && <Loader/>}
      {todos.length?<ToDoList todos={todos} onToggle={toggleTodo}/>:!loading?<p style={{color:'white',background:'black',padding:'10px'}}>No todos!</p>:null}
      
    </div>
  </Context.Provider>
  );
}

export default App;
