import supabase from '../client'
import { useState, useEffect } from 'react'
import CreatorCard from '../components/CreatorCard'


const Home = () => {
  
  const [fetchError, setFetchError] = useState(null)
  const [creators, setCreators] = useState([])
  useEffect(() => {
    const fetchCreators = async () => {
      let { data, error } = await supabase
        .from('creators')
        .select('*')
      if (error) {
        setFetchError(error)
        setCreators([])
        return
      }
      setCreators(data)
      setFetchError(null)
    }

    fetchCreators()
  }, [])

  return (
    <div className="page-home">
      
      {fetchError && <p className="fetch-error">{fetchError.message}</p>}
     
     {creators.length > 0 ? (
        <div className="creator-grid">
          {creators.map(creator => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
      ) : (
        <p className="no-creators">No creators yet!</p>
      )}

    </div>
  )
}
export default Home;