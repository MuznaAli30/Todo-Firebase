

import React, { useRef } from 'react';


export default function InputField(props) {
    const inputBox = useRef();

    // Enter key function
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && inputBox.current.value.trim() !== '') {
            props.handler(inputBox.current.value);
            inputBox.current.value = ''; // Clear the input field after adding
        }
    };

    // Add button function
    const handleAddClick = () => {
        if (inputBox.current.value.trim() !== '') {
            props.handler(inputBox.current.value);
            inputBox.current.value = ''; // Clear the input field after adding
        }
    };

    return (
        <div className='p-3 flex justify-around w-full sm:text-2xl xl:text-3xl 2xl:text-4xl'>
            <input
                type="text"
                placeholder="Enter a Todo..."
                className="p-3 focus:outline-blue-700 w-full border-slate-500 rounded-lg"
                ref={inputBox}
                onKeyPress={handleKeyPress}
            />

            {/* Add button */}
            <div className='p-3 flex justify-around'>
                <button
                    className="text-white bg-blue-700 rounded-lg w-full p-2 font-mono text-[10px] md:text-xl 2xl:text-3xl cursor-pointer font-semibold"
                    type='submit'
                    onClick={handleAddClick} // Use the new event listener
                >
                    Add
                </button>
            </div>
        </div>
    );
}