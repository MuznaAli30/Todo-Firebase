
import React from 'react';
import Items from './Items';

export default function Box(props) {
  const work = props.data.map((singleData) => {
    return (
      <Items
        removeHandler={() => props.removeHandler(singleData.id)}
        editHandler={(newItem) => props.editHandler(singleData.id, newItem)}
        key={singleData.id}
        id={singleData.id}
        item={singleData.todos}
        time={singleData.time}
      />
    );
  });

  return <div className="p-3">{work}</div>;
}