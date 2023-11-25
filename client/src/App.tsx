import './App.css'
import UseGetTasks from './hooks/UseGetTasks'
import axios from 'axios'
import { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"

export type Inputs = {
  description: string
  title: string
  date: string
  id?: number
}

function App() {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<Inputs>()
  const [refreshData, setRefreshData] = useState(false)
  const [tasks] = UseGetTasks('http://localhost:4000/api/task', refreshData)
  const [showCreateTask, setShowCreateTask] = useState(false)
  const [EditTask, setEditTask] = useState<Inputs>({} as Inputs)
  const [mode, setMode] = useState<"create" | "update">("create")

  const onSubmit: SubmitHandler<Inputs> = async (data) => {

    const { title, date, description } = data

    if (mode === "create") {
      try {
        await axios.post(`http://localhost:4000/api/task`, {
          title, date,
          ...(description && { description })

        })
        setRefreshData((prev) => !prev)
        setShowCreateTask(false)

      } catch (err) {
        console.log(err)
      }
    } else if (mode === "update") {
      try {
        await axios.patch(`http://localhost:4000/api/task/${EditTask.id}`, {
          title, date, description
        })
        setRefreshData((prev) => !prev)
        setShowCreateTask(false)
      } catch (err) {
        console.log(err)
      }
    }
  }

  const removeHandler = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4000/api/task/${id}`)
      setRefreshData((prev) => !prev)
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <div className='bg-[#1a1616d2] '>
      <h1 className='text-xl text-center bg-black text-white p-4'>Task Management App</h1>
      <div className='min-h-screen text-white max-w-[1300px] mx-auto'>
        {
          showCreateTask ?
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='w-[90%] mx-auto text-sm border-dashed border-green-400 border mt-10 px-4 py-4 sm:p-8  rounded-2xl'>
              <div className='flex gap-x-2 items-center justify-between flex-col sm:flex-row gap-y-4'>
                <div className='w-full sm:w-1/2  flex items-center gap-x-4 flex-col  gap-y-2 sm:flex-row' >
                  <label className='sm:w-[70px]  inline-block self-start sm:self-center'>Title</label>
                  <div className='w-full flex-1'>
                    <input
                      type='text'
                      className=' p-2 rounded-md border outline-none w-full bg-transparent'
                      placeholder='Some Title about task'
                      {...register("title", { required: true })}
                    />
                    <p className='text-red-500 text-xs '> {errors?.title?.type === "required" && "Title is Required"}</p>
                  </div>
                </div>
                <div className=' flex items-center gap-x-2 w-full sm:w-[unset] flex-col  gap-y-2 sm:flex-row'>
                  <label className='text-xs whitespace-nowrap self-start sm:self-center'>Due Date</label>
                  <div className='flex-1 sm:flex-0 w-full'>
                    <input
                      type='date'
                      className=' p-2 rounded-md border outline-none w-full bg-transparent'
                      placeholder=''
                      {...register("date", { required: true })}
                    />
                    <p className='text-red-500 text-xs '> {errors?.date?.type === "required" && "Date is Required"}</p>
                  </div>
                </div>
              </div>
              <div className='mt-4 flex gap-x-4  flex-col gap-y-2 sm:flex-row'>
                <label className=' '>Description</label>
                <div className='w-full'>
                  <textarea
                    className=' p-2 rounded-md border outline-none w-full bg-transparent min-h-[100px]'
                    placeholder=''
                    {...register("description", { minLength: 20 })}
                  ></textarea>
                  <p className='text-red-500 text-xs '> {errors?.description?.type === "minLength" && "Description  should be minimum 20 characters"}</p>
                  <p className='text-red-500 text-xs '> {errors?.description?.type === "required" && "Description  is Required"}</p>
                </div>
              </div>
              <div className='flex items-center justify-end gap-x-4 mt-5'>
                <button
                  onClick={() => { setShowCreateTask(false); setValue("date", ""); setValue("description", ""); setValue("title", "") }}
                  type='button'
                  className=' bg-blue-600 text-white rounded-sm px-8 py-1 text-sm  '>Cancel</button>
                <button
                  type='submit'
                  className='bg-green-600 text-white rounded-sm px-8 py-1 text-sm '>
                  {mode === "create" ? "Create" : "Update"}
                </button>
              </div>
            </form>
            :
            <button
              onClick={() => { setMode("create"); setShowCreateTask(true) }}
              className='bg-black text-white rounded-md px-4 py-1 text-sm mt-10 ml-10'>Create new Task +</button>
        }
        <ul className='px-4 sm:px-10'>
          {tasks?.map((task: Inputs, index: number) => (<li key={task?.id} className='border-b border-b-white p-4 border flex flex-col sm:flex-row items-center justify-between mt-5 gap-y-4'>
            <div className=''>
              <span className=' text-xl font-semibold'>
                {index + 1}.{" "}
                {task?.title}</span>
              <p className='text-xs text-gray-300 mt-1'>Due Date: {task?.date}</p>
              <p className='mt-2 text-sm'>{task?.description}</p>
            </div>
            <div className='flex gap-x-3 self-start'>
              <button
                onClick={(e) => { e.stopPropagation(); task?.id && removeHandler(task?.id) }}
                className='bg-red-600 text-white text-xs px-4 py-1 rounded-sm w-[70px]'>Remove</button>
              <button
                onClick={() => {
                  window.scrollTo(0, 0)
                  setMode('update')
                  setShowCreateTask(true)
                  setEditTask({ ...task })
                  setValue("date", task?.date)
                  setValue("title", task?.title)
                  setValue("description", task?.description)
                }}
                className='bg-blue-600 text-white text-xs px-4 py-1 rounded-sm w-[70px] '>Edit</button>
            </div>
          </li>))}
        </ul>
      </div>
    </div>
  )
}

export default App
