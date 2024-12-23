import React, { useState } from "react";

function App() {
  //array of tasks where each task will have an id, text and completed fields
  const [tasks, setTasks] = useState([]);
  //input fields for creaeting new tasks
  const [newTask, setNewTask] = useState("");

  //handles form submission for adding new tasks
  const handleSubmit = (event) => {
    event.preventDefault();

    //this trims to aviod having empty tasks in the list, meaning an emtpy input can not create a task
    if (newTask.trim() === "") return;

    //creates an object of the task 
    const newTaskObj = {
      id: Date.now(), //unique to each task
      text: newTask.trim(), //text that the user inputs
      completed: false, //informs the user if the task is complete or not
    };

    //updates the task array with new tasks from the users inputs
    setTasks((prevTasks) => [...prevTasks, newTaskObj]);
    //clears the inputs so new tasks can be added to the array
    setNewTask("");
  };

  //Marks the tasks are completed
  const toggleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  //lets the user delete a task if they do not want to see it any more
  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div style={{ margin: "20px" }}>
      <h1>My To-Do List</h1>
      {/*Add task form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit" style={{ marginLeft: "10px" }}>
          Add Task
        </button>
      </form>
      {/*Conditional formating to display either an emtpy list or a list with values */}
      {tasks.length === 0 ? (
        <p>No tasks yet!</p>
      ) : (
        <ol style={{ marginTop: "10px" }}>
          {tasks.map((task) => (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
              />
              {task.text}
              <button
                onClick={() => deleteTask(task.id)}
                style={{ marginLeft: "10px", color: "red" }}
              >
                Delete
              </button>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default App;
