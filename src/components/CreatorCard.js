import React from 'react'
import { AiFillTwitterCircle } from 'react-icons/ai';
import {Link} from 'react-router-dom'


const CreatorCard = ({ creator }) => {

    const cardStyle = {     
        backgroundImage: `url(${creator.imageURL})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '300px',
    };

    const twitterUrl = `https://twitter.com/${creator.url}`

    return (
        <div className='card-container' style={cardStyle}>

            <div className='creator-card'>
                <div className='edit-view'>
                    <Link to={`/view/${creator.id}`}>
                        <i className="material-icons">info</i>
                    </Link>                  
                    <Link to={`/edit/${creator.id}`}>
                        <i className="material-icons">edit</i>
                    </Link>
                </div>
                <div className='card-info'>
                    <h3>{creator.name}</h3>
                    <p>{creator.description}</p>
                    {/* aifilltwittercircle that links to creator twitter */}
                    <a href={twitterUrl} target="_blank" rel="noreferrer">
                        <AiFillTwitterCircle />
                    </a>
                </div>
            </div>

        </div>
    )
}

export default CreatorCard
