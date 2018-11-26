import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
// import Card from '@material-ui/core/Card'
// import CardContent from '@material-ui/core/CardContent'
// import CardMedia from '@material-ui/core/CardMedia'
// import Typography from '@material-ui/core/Typography'
// import CardActionArea from '@material-ui/core/CardActionArea'
import history from '../history'
import {Link} from 'react-router-dom'

// const styles = theme => ({
//   card: {
//     display: 'flex'
//   },
//   details: {
//     display: 'flex',
//     flexDirection: 'column'
//   },
//   content: {
//     flex: '1 0 auto'
//   },
//   cover: {
//     width: 151
//   },
//   controls: {
//     display: 'flex',
//     alignItems: 'center',
//     paddingLeft: theme.spacing.unit,
//     paddingBottom: theme.spacing.unit
//   },
//   playIcon: {
//     height: 38,
//     width: 38
//   }
// })

function BusinessCard(props) {
  // const {classes, theme, business} = props
  const {business} = props
  return (
    <div className="media box">
      {/* <div className="media-left">
        <Link to={`/business/${business.id}`}>
          {business.imageUrl ? (
            <img src={business.imageUrl} />
          ) : (
            <p>no image</p>
          )}
        </Link>
      </div> */}
      <div className="media-content">
        <Link to={`/business/${business.id}`}>
          <div className="subtitle">
            <p><strong>{business.name}</strong></p>
            <p>{business.address}</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

// BusinessCard.propTypes = {
//   classes: PropTypes.object.isRequired,
//   theme: PropTypes.object.isRequired
// }

// export default withStyles(styles, {withTheme: true})(BusinessCard)
export default BusinessCard
