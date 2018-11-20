import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import CardActionArea from '@material-ui/core/CardActionArea'
import history from '../history'

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

  // helper function that parses sequelize date and time values -> date object
  function parseISOString(s) {
    var b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
  }

  const {classes, theme, business} = props

  // calculate wait time
  let minFromNow, timeOfService
  // if business is full, but queue is empty
  if (business.queues[0].queueLength === 0 && business.queues[0].isBusinessFull) {
    // use default wait time
    minFromNow = business.queues[0].defaultWaitTime
  } else if (business.queues[0].timeAtWhichLastQueueGetsSeated) {
    // if there's a 'time at which last queue gets served', calculate time diff from that
    timeOfService = parseISOString(business.queues[0].timeAtWhichLastQueueGetsSeated)
    minFromNow = Math.floor((timeOfService - new Date)/60000)
  }

  return (
    <Card className={classes.card}>
      <CardActionArea
        className={classes.actionArea}
        onClick={() => history.push(`/business/${business.id}`)}
      >
        <CardMedia
          className={classes.cover}
          image={business.imageUrl}
          title={business.name}
          style={{height: '100%', width: '100%', paddingTop: '100%'}}
        />
      </CardActionArea>
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
            {!business.queues[0].isBusinessFull && <p>No wait time</p>}
            {minFromNow && <p>Est. wait time: {minFromNow} min</p>}
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
