import './Recipe.css'
import { useParams,useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { projectFirestore } from '../../firebase/config'

export default function Recipe() {
  const { id }=useParams()
  const [recipe, setRecipe] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)
  const navigate = useNavigate()
  const {mode} = useTheme()
  useEffect(()=>{
    if (error){
      setTimeout(()=>{
        navigate('/')
      },2000)
    } 
  },[error, navigate])
  useEffect(()=>{
    setIsPending(true)
    const unsub = projectFirestore.collection('recipe').doc(id).onSnapshot((doc)=>{
      if(doc.exists){
        setIsPending(false)
        setRecipe(doc.data())
      }else{
        setIsPending(false)
        setError('Could not find that recipe')
      }
    })
    return () => unsub()
  },[id])
  
  return (
    <div className={`recipe ${mode}`}>
        {isPending && <div className='loading'>Loading...</div>}
        {error && <div className='error'>{error}</div>}
        {recipe && (
            <>
                <h2 className='page-title'>{recipe.title}</h2>
                <p>Takes {recipe.cookingTime} to Cook.</p>
                <ul>
                  {recipe.ingredients.map(ing =><li key={ing}>{ing}</li>)}
                </ul>
                <p className="method">{recipe.method}</p>
                
            </>
        )}
    </div>
  )
}
