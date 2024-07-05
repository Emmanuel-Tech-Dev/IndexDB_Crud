// import { useState } from 'react'
import DataList from './component/DataList';
import Form from './component/Form';


function App() {

  return (
    <div>
      <h1>IndexedDB CRUD Application</h1>
      <Form/>
      <div className='bg-gray-400 p-3 rounded'>
      <DataList/>
      </div>

    </div>
  );
}

export default App
