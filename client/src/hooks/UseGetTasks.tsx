import axios from "axios"
import { useEffect, useState } from "react"



const UseGetTasks = (url: string, flag: boolean) => {
    const [tasks, setTasks] = useState<any>([])
    useEffect(() => {
        const getTasks = async () => {
            try {
                const { data } = await axios.get(url)
                setTasks([...data])
            } catch (err) {
                console.log(err)
            }
        }

        getTasks()
    }, [flag])

    return [tasks, setTasks]
}

export default UseGetTasks