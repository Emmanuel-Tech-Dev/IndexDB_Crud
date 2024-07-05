import Dexie from "dexie";

// Function to determine schema from data
function determineSchema(data) {
  const keys = Object.keys(data);
  const primaryKey = "++id"; // Primary key for the table
  const indexes = keys.filter((key) => key !== "id").join(", "); // Exclude 'id' field for indexes
  return `${primaryKey}, ${indexes}`;
}

let db;

// Function to initialize or update the database with dynamic schema
export function initializeDatabase(data) {
  if (!data || Object.keys(data).length === 0) {
    console.warn("No data provided for database initialization.");
    // Handle case where no data is provided or initialize with default schema
    return null;
  }

  const schema = determineSchema(data);

  if (!db) {
    db = new Dexie("MyDatabase");
    db.version(1).stores({
      data: schema,
    });

    // Opening the database
    return db
      .open()
      .then(function () {
        console.log("Database opened successfully");
      })
      .catch(function (err) {
        console.error("Error opening database:", err);
        throw err; // Propagate the error to handle it further
      });
  } else {
    const currentSchema = `${
      db.tables[0].schema.primKey.name
    }, ${db.tables[0].schema.indexes.map((idx) => idx.name).join(", ")}`;

    if (currentSchema !== schema) {
      const newVersion = db.verno + 1;
      db.version(newVersion)
        .stores({
          data: schema,
        })
        .upgrade(); // Upgrade schema if necessary

      // Opening the database after upgrade
      return db
        .open()
        .then(function () {
          console.log("Database opened successfully after upgrade");
        })
        .catch(function (err) {
          console.error("Error opening database after upgrade:", err);
          throw err; // Propagate the error to handle it further
        });
    } else {
      console.log("Database already initialized and schema matches");
      return Promise.resolve(db); // Return resolved promise with existing db instance
    }
  }
}
