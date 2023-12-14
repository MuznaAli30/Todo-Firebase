


import React, { useEffect, useState } from 'react';
import './App.css';
import InputField from './Components/InputField';
import Box from './Components/Box';
import Header from './Components/Header';
import { db } from "./Firebase";
import { serverTimestamp, collection, addDoc, doc, updateDoc, deleteDoc, getDocs } from 'firebase/firestore';

function App() {
  const [todos, setTodos] = useState([]);

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "item"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    setTodos(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addToDoHandler = async (newTodo) => {
    if (newTodo.trim() !== "") {
      if (!todos.some(todo => todo.todos === newTodo.trim())) {
        try {
          await addDoc(collection(db, "item"), {
            todos: newTodo.trim(),
            timestamp: serverTimestamp(),
            time: new Date().toLocaleTimeString()
          });
          fetchData();
        } catch (error) {
          console.error("Error adding item: ", error);
        }
      }
    }
  };

  


  const editHandler = async (id, newItem) => {
    try {
      await updateDoc(doc(db, "item", id), {
        todos: newItem
      });

    
    } catch (error) {
      console.error("Error updating item: ", error);
    }
  };

  const removeToDo = async (id) => {
    try {
      await deleteDoc(doc(db, "item", id));
      fetchData();
    } catch (error) {
      console.error("Error deleting item: ", error);
    }
  };

  const sortedTodos = [...todos].sort((a, b) => a.todos.localeCompare(b.todos));

  useEffect(() => {
    if (JSON.stringify(sortedTodos) !== JSON.stringify(todos)) {
      setTodos(sortedTodos);
    }
  });

  return (
    <div className="bg-blue-800 h-screen p-3">
      <div className="mx-auto max-w-[80%] min-h-[90vh] shadow-2xl bg-white rounded-3xl shaddow-2xl">
        <div className='text-blue-700 text-center font-bold font-mono sm:text-sm text-xs xl:text-2xl 2xl:text-6xl p-5'>
          <Header/>
        </div>
        <InputField handler={addToDoHandler}/>
        <Box data={todos} removeHandler={removeToDo} editHandler={editHandler} fetchData={fetchData}/>
      </div>
    </div>
  );
}

export default App;

