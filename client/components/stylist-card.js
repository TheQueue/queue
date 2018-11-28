import React from 'react'

const StylistCard = props => {
  const {stylist} = props
  const {name, profile, imageUrl} = stylist
  return (
    <div className="card">
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            {imageUrl && <figure className="image"><img className="is-rounded is-96x96" src={imageUrl} /></figure>}
          </div>
          <div className="media-content">
            <p>
              <strong>{name}</strong>
            </p>
            <p>
              <strong>About me:</strong> {profile}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StylistCard
