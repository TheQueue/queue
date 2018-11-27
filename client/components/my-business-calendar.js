import React, {Component} from 'react'
import Calendar from 'react-calendar'
import {AppointmentCard} from './index'
import moment from 'moment'

class MyBusinessCalendar extends Component {
  state = {
    date: new Date()
  }

  onChange = date => this.setState({date})

  doSlotAndStateDateMatch = slot => {
    const slotDate = moment(this.parseISOString(slot.date)).format('MMM Do YY')
    const stateDate = moment(this.state.date).format('MMM Do YY')
    return slotDate === stateDate
  }

  parseISOString(s) {
    var b = s.split(/\D+/)
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]))
  }

  render() {
    const {currBusiness, entities} = this.props
    return (
      <div className="columns">
        <div className="column is-narrow">
          <Calendar onChange={this.onChange} value={this.state.date} />
        </div>
        <div className="column box">
          <div className="media">
            <div className="media-content">
              <p className="title">Slots</p>
            </div>
            <div className="media-right">
              <button className="button" type="button">
                Create slot
              </button>
            </div>
          </div>
          {currBusiness.stylists.map(styId => {
            const stylist = entities.stylists[styId]
            return stylist.appointments.map(appId => {
              const app = entities.appointments[appId]
              const user = entities.users[app.user]
              const slot = entities.slots[app.slot]
              const styl = entities.stylists[app.stylistId]
              return this.doSlotAndStateDateMatch(slot) ? (
                <AppointmentCard
                  key={appId}
                  appointment={app}
                  user={user}
                  slot={slot}
                  stylist={styl}
                />
              ) : null
            })
          })}
        </div>
      </div>
    )
  }
}

export default MyBusinessCalendar
