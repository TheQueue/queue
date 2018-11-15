import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  card: {
    display: 'flex'
  },
  details: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: '1 0 auto'
  },
  cover: {
    width: 151
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  playIcon: {
    height: 38,
    width: 38
  }
})

function BusinessCard(props) {
  const {classes, theme, business} = props

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cover}
        image={business.imageUrl}
        title={business.name}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {business.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {business.address}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <Typography variant="subtitle1" color="textSecondary">
            THis is where the Waiting Time goes!!
          </Typography>
        </div>
      </div>
    </Card>
  )
}

BusinessCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

export default withStyles(styles, {withTheme: true})(BusinessCard)
