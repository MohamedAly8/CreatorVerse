import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import supabase from "../client"
import { useNavigate } from "react-router-dom"



const EditCreator = () => {

  const { id } = useParams()
  const navigate = useNavigate()

  const [name , setName] = useState('')
  const [description , setDescription] = useState('')
  const [url , setUrl] = useState('')
  const [imageURL , setImageURL] = useState('')
  const [formError, setFormError] = useState(null)
  const [showDialog, setShowDialog] = useState(false)


  const handleDeleteConfirmation = () => {
    setShowDialog(true)
}


  // get creator from supabase based on id
  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select()
        .eq('id', id)
        .single()
      if (error) {
        navigate('/', { replace: true })
      }
      if (data) {
        setName(data.name)
        setDescription(data.description)
        setUrl(data.url)
        setImageURL(data.imageURL)
      }
    }
    fetchCreator()
  }, [id, navigate])


  const handleDelete = async () => {
        
    console.log('delete')

    const { error } = await supabase
        .from('creators')
        .delete()
        .eq('id', id)
    if (error) {
        alert(error.message)
    } else {
        navigate('/', { replace: true })
    }
}

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !description || !url || !imageURL) {
      setFormError('Please fill out all fields')
      return
    }

    const { data, error } = await supabase
      .from('creators')
      .update({ name, description, url, imageURL })
      .eq('id', id)
    if (error) {
      setFormError(error)
      return
    }
    if (data) {
      console.log(data)
    }
    setFormError(null)
    navigate('/')
  

  }

  return (
    <div className="page-update">
      <h2>Update {name}</h2>
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

        {/* button above is not clicking */}

        {formError && <p className="form-error">{formError}</p>}

        {showDialog && (
                <div className="dialog-modal">
                    <div className="dialog-content">
                        <p>Are you sure you want to delete this creator?</p>
                        <button onClick={() => {handleDelete(); setShowDialog(false);}}>Yes</button>
                        <button onClick={() => setShowDialog(false)}>Cancel</button>
                    </div>
                </div>
            )}


      </form>
        <div className="edit-delete">
        {/* upate button */}
        <button onClick={handleSubmit}>Update</button>
        <button onClick={handleDeleteConfirmation}>Delete</button>
        </div>




      

    </div>
  )
}

export default EditCreator
