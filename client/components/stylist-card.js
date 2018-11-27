import React from 'react'

const StylistCard = props => {
  const {stylist} = props
  const {name, profile, imageUrl} = stylist
  return (
    <div className="media">
      <div className="media-left">
        {imageUrl && <img className="image is-96x96" src={imageUrl}/>}
      </div>
      <div className="media-content">
        <p><strong>{name}</strong></p>
        <p><strong>About me:</strong> {profile}</p>
      </div>
    </div>
  )
}

export default StylistCard
