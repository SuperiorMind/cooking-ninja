import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SearchBar.css'

export default function SearchBar() {
    const[term, setTerm] = useState('')
    const navigate = useNavigate()
    const handleSubmit = (e) =>{
        e.preventDefault()
        navigate(`/search?q=${term}`)
    }
  return (
    <div className='searchbar'>
        <form onSubmit={handleSubmit}>
            <label htmlFor='search'>Search:</label>
            <input type="text" 
            id='search' 
            onChange={(e)=>setTerm(e.target.value)} 
            required autoComplete='off'/>
        </form>
    </div>
  )
}
