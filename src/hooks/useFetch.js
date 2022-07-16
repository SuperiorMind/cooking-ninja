import { useEffect, useState } from "react"

export const useFetch = (url, method= "GET") => {
    const [data, setData]= useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const [options, setOptions] = useState(null)
    const postData = (postData) =>{
        setOptions({
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(postData)
        })
    }
    useEffect(()=>{
        
        const controller = new AbortController()
        const fetchData = async(fetchOptions)=>{
            setIsPending(true)
            try{
                const res = await fetch(url,{...fetchOptions, signal:controller.signal})
                if(!res.ok){
                    throw new Error(res.statusText)
                }
                
                const json = await res.json()
                setIsPending(false)
                setData(json)
            }catch(err){
                if(err.name==="AbortError"){
                    console.log('Fetch was aborted')
                }else{
                    setError('Could not fetch the data')
                    setIsPending(false)
                }
                
            }
            
        }
        if(method==="POST" && options){
            fetchData(options)
         }
        if(method==="GET"){
           fetchData()
        }
        
        return ()=>{
            controller.abort()
        }
    },[url, options, method])
    return {data:data,isPending, error, postData}
}
