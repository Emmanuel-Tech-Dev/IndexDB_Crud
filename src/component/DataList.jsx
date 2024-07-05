import { useState, useEffect } from 'react';
import { deleteData, useGetAllData } from '../hooks/indexDb/indexFunctions';

const DataList = () => {
  const data = useGetAllData()

 if(!data || data.length === 0
 ){
    return <p>No Data in the indexDb table</p>
 }

  const handleDelete = async (id) => {
    await deleteData(id);
    
  };

  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>
          {item.name}: {item.message}
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default DataList;