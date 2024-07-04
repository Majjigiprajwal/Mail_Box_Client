import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import useLocalStorage from './UseLocalStorage'

const useApi = (initialUrl = '', initialMethod = 'GET') => {
  const [url, setUrl] = useState(initialUrl)
  const [method, setMethod] = useState(initialMethod)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [params, setParams] = useState(null)
  const [requestData, setRequestData] = useState(null)

  const [token] = useLocalStorage('token')

  const fetchData = useCallback(async () => {
    setData(null)
    setIsLoading(true)
    setError(null)

    try {
      const config = {
        method,
        url,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params,
        data: requestData
      }

      const response = await axios(config)
      console.log(response)
      setData(response.data.data)
    } catch (error) {
        
      setError(error?.response?.data?.message)
    } finally {
      setIsLoading(false)
    }
  }, [url, method, token, params, requestData])

  useEffect(() => {
    if (url) fetchData()
  }, [fetchData,url])
   

  return {
    data,
    error,
    isLoading,
    setUrl,
    setMethod,
    setParams,
    setRequestData,
    refetch: fetchData
  }
}

export default useApi