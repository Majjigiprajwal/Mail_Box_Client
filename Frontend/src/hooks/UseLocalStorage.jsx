import {useState,useEffect} from 'react'


const useLocalStorage = (key) => {
    const [value, setValue] = useState(() => {
      try {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : null
      } catch (error) {
        console.error(error)
        return null
      }
    })
  
    useEffect(() => {
      try {
        if (value === null) {
          localStorage.removeItem(key)
        } else {
          localStorage.setItem(key, JSON.stringify(value))
        }
      } catch (error) {
        console.error(error)
      }
    }, [key, value])
  
    return [value, setValue]
  }


  export default useLocalStorage