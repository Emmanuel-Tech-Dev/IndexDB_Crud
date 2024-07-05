// indexFunctions.js

import { useLiveQuery } from 'dexie-react-hooks';
import { initializeDatabase } from './config'; // Adjust import as per your file structure

// Ensure the database is initialized with the schema from the data
const initializeDBInstance = (data) => {
  try {
    const dbInstance = initializeDatabase(data);
    if (dbInstance) {
      return dbInstance;
    } else {
      console.error('Database initialization failed or no valid data provided.');
      return null;
    }
  } catch (error) {
    console.error('Error initializing database:', error);
    return null;
  }
};

// Insert data into the IndexedDB
export const insertData = async (data) => {
  try {
    const dbInstance = initializeDBInstance(data);
    if (dbInstance) {
      await dbInstance.data.add(data);
      console.log('Data inserted successfully.');
    }
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

// Fetch all data from IndexedDB with real-time updates
export const useGetAllData = () => {
  const data = useLiveQuery(() => {
    const dbInstance = initializeDBInstance({});
    return dbInstance ? dbInstance.data.toArray() : null;
  });

  if (!data) {
    console.error('Error fetching data or database instance not initialized.');
    return [];
  }

  console.log('Fetched data:', data); // Log fetched data for debugging
  return data;
};

// Update existing data in IndexedDB
export const updateData = async (id, newData) => {
  try {
    const dbInstance = initializeDBInstance(newData);
    if (dbInstance) {
      await dbInstance.data.update(id, newData);
      console.log('Data updated successfully.');
    }
  } catch (error) {
    console.error('Error updating data:', error);
  }
};

// Delete data from IndexedDB
export const deleteData = async (id) => {
  try {
    const dbInstance = initializeDBInstance({});
    if (dbInstance) {
      await dbInstance.data.delete(id);
      console.log('Data deleted successfully.');
    }
  } catch (error) {
    console.error('Error deleting data:', error);
  }
};
