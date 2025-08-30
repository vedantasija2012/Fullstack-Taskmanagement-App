import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { server } from '../App';
import { Context } from '../index.js';

const Tasks = () => {
  const [tittle, setTittle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  let isTask = tasks.length;
  const { isAuthenticated } = useContext(Context)
  const [isCompleted, setIsCompleted] = useState(false)

  const fetchData = async () => {
    try {
      if (isAuthenticated) {
        const response = await axios.get(`${server}/tasks`, { withCredentials: true })
        return setTasks(response.data.tasks)
      }
    } catch (error) {
      return toast.error(`${error.response.data.message}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      })
    }
  }

  useEffect(() => {
    const fetchDataAndSetTasks = async () => {
      if (!isAuthenticated) {
        return toast.warn('Login to View Tasks!', {
          position: "top-center",
          autoClose: 200,
          hideProgressBar: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "dark",
        })
      }
      await fetchData()
    }
    fetchDataAndSetTasks();
  }, [isAuthenticated])

  const handleCreateClick = async () => {

    const newTask = {
      tittle: tittle,
      description: description,
    }

    if (tittle === "" || description === "") {
      return toast.warn('Enter Valid Tittle or Description!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      })
    }

    await axios.post(`${server}/new/task`, newTask, { withCredentials: true })

    fetchData();

    setTittle("")
    setDescription("")
    setIsCompleted(prev => !prev)
  }

  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(`${server}/task/${id}`, { isCompleted }, { withCredentials: true })

      setTasks(prevTasks =>
        prevTasks.map(task =>
          task._id === id ? { ...task, isCompleted: !task.isCompleted } : task
        )
      );

      toast.success(`${data.message}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      })
      setIsCompleted(prev => !prev)
    } catch (error) {
      toast.error(`${error.response.data.message}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      })
    }
  }

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/task/${id}`, { withCredentials: true })

      setTasks((prevTasks) => prevTasks.filter(task => task._id !== id));

      toast.success(data.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      })

    } catch (error) {
      toast.error(`${error.response.data.message}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      })
    }
  }

  return (
    <>
      <div className='tasks shadow-2xl p-4 my-4 w-[90%] sm:w-[80%] md:w-2/3 lg:w-1/2 xl:w-1/3 h-4/5 block m-auto'>
        {
          isAuthenticated ? (<> <h2 className='text-xl font-bold text-center my-3'>Add Task From Below</h2>
            <div className='flex justify-center items-center flex-col w-full'>
              <input type="tittle" required onChange={(e) => setTittle(e.target.value)} value={tittle} className='py-2 px-4 my-3 w-full sm:w-[90%] md:w-4/5 lg:w-2/3 rounded-md border-2 border-gray-400' placeholder='Enter Tittle:' />
              <input type="description" required onChange={(e) => setDescription(e.target.value)} value={description} className='py-2 px-4 my-3 w-full sm:w-[90%] md:w-4/5 lg:w-2/3 rounded-md border-2 border-gray-400' placeholder='Enter Description:' />
              <button onClick={handleCreateClick} id='create-btn' className="hoverEffect bg-black text-white w-full sm:w-[90%] md:w-4/5 lg:w-2/3 px-4 py-2 rounded-md my-2"><b>+</b> Create Task</button>
            </div>
          </>
          ) : (<> <h2 className='text-xl font-bold text-center my-3'>Unauthorized Access!</h2>
            <div className='flex justify-center items-center flex-col w-full'>
              <input type="tittle" required disabled={true} value={"Login To Continue!!"} className='py-2 px-4 my-3 w-full sm:w-[90%] md:w-4/5 lg:w-2/3 rounded-md border-2 border-red-500 text-red-500' placeholder='Enter Tittle:' />
              <input type="description" required disabled={true} value={"Login To Continue!!"} className='py-2 px-4 my-3 w-full sm:w-[90%] md:w-4/5 lg:w-2/3 rounded-md border-2 border-red-500 text-red-500' placeholder='Enter Description:' />
              <button disabled={true} id='create-btn' className="hoverEffect bg-red-500 text-white w-full sm:w-[90%] md:w-4/5 lg:w-2/3 px-4 py-2 rounded-md my-2">Restricted Access</button>
            </div>
          </>
          )
        }
      </div>

      <div className='tasks shadow-2xl px-4 py-2 my-4 w-[90%] sm:w-[80%] md:w-3/4 lg:w-2/3 h-4/5 block m-auto'>
        {
          !isTask ? <h2 className='text-xl font-bold text-center'>No tasks to show!</h2> : <div>
            <h2 className='text-xl font-bold text-center'>Tasks to complete</h2>
            {
              tasks.map((task, index) => {
                return (<div key={index} id='task' className={`task flex justify-between flex-col xs sm:flex-row shadow-xl border-2 p-4 my-4 rounded-md ${task.isCompleted ? 'border-green-400' : ''}`}>
                  <div className="flex-1 min-w-0">
                    <h3 className='font-semibold text-lg truncate'>Created On: {new Date(task.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</h3>
                    <h2 className='text-black text-lg my-1 break-words'><strong>Title</strong>: {task.tittle}</h2>
                    <p className='text-black text-lg my-1 break-words whitespace-pre-wrap'><strong>Description</strong>: {task.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        onChange={() => updateHandler(task._id)}
                        checked={task.isCompleted}
                        type="checkbox"
                        className="hidden peer"
                      />
                      <div className="w-6 h-6 border-2 border-blue-500 rounded-md flex items-center justify-center peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-all duration-200">
                        {task.isCompleted && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </label>
                    <button
                      disabled={!isAuthenticated}
                      onClick={() => deleteHandler(task._id)}
                      className="doneBtn w-[20vw] md:w-[8vw] p-1 my-1 rounded-lg font-bold hoverEffect hover:bg-red-500 hover:text-white border-2 border-red-400 text-red-400"
                    >
                      Delete
                    </button>
                  </div>
                </div>)
              })
            }
          </div>
        }
      </div>
    </>
  )
}

export default Tasks