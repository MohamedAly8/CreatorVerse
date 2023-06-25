import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import supabase from '../client'
import { useNavigate } from 'react-router-dom'
import {AiOutlineTwitter} from 'react-icons/ai'


const ViewCreator = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [name , setName] = useState('')
    const [description , setDescription] = useState('')
    const [url , setUrl] = useState('')
    const [imageURL , setImageURL] = useState('')

    const [showDialog, setShowDialog] = useState(false)

    const twitterUrl = `https://twitter.com/${url}`

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




    return (
      <div className="page-view">

        <div className="creator">
            <h2>{name} </h2>
            <div className="creator-image">
                <img src={imageURL} alt={name} />
            </div>
            <div className="creator-info">
                <div className="creator-description">
                <h3>About</h3>
                <p>{description}</p>
                </div>
                
                <div className="social-media">
                <AiOutlineTwitter />
                <a href={twitterUrl} target="_blank" rel="noreferrer">  
                    {url}
                </a>
                </div>
            </div>
        </div>

        <div className="edit-delete">
            <button name="edit" onClick={() => navigate(`/edit/${id}`)}>Edit</button>
            <button name="delete" onClick={handleDeleteConfirmation}>Delete</button>
            
        </div>


        {showDialog && (
                <div className="dialog-modal">
                    <div className="dialog-content">
                        <p>Are you sure you want to delete this creator?</p>
                        <button onClick={() => {handleDelete(); setShowDialog(false);}}>Yes</button>
                        <button onClick={() => setShowDialog(false)}>Cancel</button>
                    </div>
                </div>
            )}

      </div>
    )
  }
  
  export default ViewCreator