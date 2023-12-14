import React, { useState } from 'react';
import { db } from "../Firebase";
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';

export default function Items(props) {
  const [editing, setEditing] = useState(false);
  const [editedItem, setEditedItem] = useState(props.item);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleEditInputChange = (e) => {
    setEditedItem(e.target.value);
  };

  const updateItemInFirestore = async (id,editedItem) => {
    try {
      await updateDoc(doc(db, "item", id), {
        todos: editedItem,
      });
      setEditing(false);
      props.fetchData();
      // props.editHandler(props.id, editedItem);
    } catch (error) {
      console.error("Error updating item: ", error);
    }
  };
  
  const deleteItemFromFirestore = async (id) => {
    try {
      await deleteDoc(doc(db, "item", id));
      props.removeHandler(id);
      props.fetchData();
    } catch (error) {
      console.error("Error deleting item: ", error);
    }
  };

  

  return (
    <div className={`select-none cursor-pointer w-full border-b-4 overflow-auto mb-4 p-3 flex justify-between items bg-blue-600 hover:bg-blue-500 py-4 rounded-lg shadow-xl border-gray-400`}>
      <div className=''>
        <div>
          <span className='text-xs sm:text-xs flex flex-wrap xl:text-xl 2xl:text-2xl h-font-mono font-semibold '>
            {props.time}
          </span>
        </div>
        <span className={`text-xs sm:text-2xl flex flex-wrap xl:text-3xl 2xl:text-3xl h-font-mono `}>
          {editing ? (
            <input
              type="text"
              value={editedItem}
              onChange={handleEditInputChange}
              className='border rounded p-1'
            />
          ) : (
            <span>{props.item}</span>
          )}
        </span>
      </div>
      <div className=''>
        {editing ? (
          <button className='button-save task-button'>
            <i className='fa fa-save text-white text-xs md:text-2xl 2xl:text-3xl cursor-pointer' onClick={() => updateItemInFirestore(props.id,editedItem)}></i>
          </button>
        ) : (
          <>
            <button className='button-edit task-button pr-3' onClick={handleEdit}>
              <i className='fa fa-edit text-xs md:text-2xl 2xl:text-3xl cursor-pointer text-white'></i>
            </button>
            <button className='button-delete task-button pr-3'>
              <i className='fa fa-trash text-white text-xs md:text-2xl 2xl:text-3xl cursor-pointer' onClick={() => deleteItemFromFirestore(props.id)}></i>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
