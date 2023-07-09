import { useEffect, useState } from 'react';
import Navbar from './navbar/Navbar';
import './todo.css';

const ToDo = () => {
  // declare states to store data
  const [title, setTitle] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(false);

  // get accessToken stored in the localstorage
  const user = JSON.parse(localStorage.getItem('session'));

  const TOKEN = user?.accessToken;
  const userId = user?._id;

  // console.log(TOKEN, 'userID');

  // function to get tasks from the backend
  async function getTasks() {
    try {
      const getTask = async () => {
        const res = await fetch(
          `http://localhost:8001/api/tasks/find/${userId}`,
          {
            method: 'GET',
            // headers
            headers: {
              'content-type': 'application/json',
              authorization: `Bearer ${TOKEN}`,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            // set tasks data
            if (data) {
              console.log(data);
              setTasks(data);
            }
          })
          .catch((err) => console.log(err));
      };
      getTask();
    } catch (error) {
      // catch any errors
      console.log(error);
    }
  }

  // call the gatTasks function once when the page loads
  useEffect(() => {
    getTasks();
  }, []);

  // function to add tasks
  const addTask = async () => {
    // check if the title characters are above 140 or less
    if (title.length > 140) {
      alert('Task text should be 140 characters or less.');
      return;
    }
    // if title is an empty string, return
    if (title === '') return;
    // add tasks to the backend
    try {
      const res = await fetch(`http://localhost:8001/api/tasks`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({ userId, title }),
      })
        .then((res) => res.json())
        .then((res) => {
          // if successfull, call our getTasks function
          getTasks();
        })
        .catch((err) => {
          setError(true);
          console.log(err);
        });
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  // function to edit a task
  const editTask = async (taskId) => {
    // if the new title is an empty string, return
    if (newTitle === '') return;
    // function to edit a task from the backend
    try {
      const res = await fetch(`http://localhost:8001/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({ title: newTitle }),
      })
        .then((res) => res.json())
        .then((res) => {
          // if successfull, call our getTasks function
          getTasks();
        })
        .catch((err) => {
          setError(true);
          console.log(err);
        });
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  // function to delete a task via id from the backend
  const deleteATask = async (taskId) => {
    try {
      const res = await fetch(`http://localhost:8001/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${TOKEN}`,
        },
      })
        .then((res) => {
          // if successfull, call our getTasks function
          getTasks();
        })
        .catch((err) => {
          setError(true);
          console.log(err);
        });
    } catch (error) {
      console.log(error);
      setError(true);
    }
    // filter the tasks array and return the new array of tasks
    const newTasks = tasks.filter((task) => task._id !== taskId);
    setTasks(newTasks);
  };

  return (
    <div className=''>
      <Navbar />

      <h1>ToDo List</h1>
      <div>
        <input
          className='input'
          type='text'
          placeholder='title'
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className='button' onClick={addTask}>
          Add
        </button>
      </div>
      {/* input to edit */}
      {tasks?.length > 0 && (
        <>
          <h4>Enter a value and click the "Edit" button</h4>
          <input
            className='input'
            type='text'
            placeholder='Input a value and click edit task'
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </>
      )}
      <div>
        {tasks?.map((task) => (
          <div key={task._id} className='task'>
            <div className=''>{task.title}</div>
            <div className=''>
              <button
                className='button'
                onClick={() => {
                  editTask(task._id);
                }}
              >
                Edit
              </button>
              <button
                className='deleteButton'
                onClick={() => {
                  deleteATask(task._id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {error && <div>Invalid Request</div>}
    </div>
  );
};

export default ToDo;
