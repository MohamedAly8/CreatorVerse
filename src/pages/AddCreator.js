import { useState } from 'react'
import supabase from '../client'
import {useNavigate} from 'react-router-dom'



const AddCreator = () => {
  const navigate = useNavigate()

  const [name , setName] = useState('')
  const [description , setDescription] = useState('')
  const [url , setUrl] = useState('')
  const [imageURL , setImageURL] = useState('')
  const [formError, setFormError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name) {
      setFormError('Please fill out all fields')
      return
    }

    const { data, error } = await supabase
      .from('creators')
      .insert([{ name, url, description, imageURL}])
    if (error) {
      setFormError(error)
      console.log("error")
      return
    }

      console.log(data)
      setFormError(null)
      navigate('/')
      setName('')
      setDescription('')
      setUrl('')
      setImageURL('')
      

  }
  
  return (
    <div className="page-create">
      <h2>Add Creator</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <label htmlFor="url">URL</label>
        <input
          type="text"
          id="url"
          value={url}
          placeholder="@TwitterHandle"
          onChange={e => setUrl(e.target.value)}
        />

        <label htmlFor="imageURL">Image URL</label>
        <input
          type="text"
          id="imageURL"
          placeholder='https://www.example.com/image.jpg'
          value={imageURL}
          onChange={e => setImageURL(e.target.value)}
        />

        <button type="submit">Add Creator</button>

        {formError && <p className="form-error">{formError}</p>}
      </form>


    </div>
  )
}

export default AddCreator