import React, {Component} from 'react'
import Calendar from 'react-calendar'
import {AppointmentCard, CreateSlotForm, SlotCard} from './index'
import moment from 'moment'

class MyBusinessCalendar extends Component {
  state = {
    date: new Date(),
    isCreateSlotActive: false
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
  toggleCreateSlotForm = event => {
    let curVal = this.state.isCreateSlotActive
    this.setState({isCreateSlotActive: !curVal})
  }
  convertTimeToInteger(timeStr) {
    let num = Number(timeStr.split(':')[0])
    if (timeStr.includes('PM')) num += 12
    return num
  }
  flatten = arr => {
    return arr.reduce((flat, toFlatten) => {
      return flat.concat(
        Array.isArray(toFlatten) ? this.flatten(toFlatten) : toFlatten
      )
    }, [])
  }
  sortByTime = (objA, objB) => {
    return (
      this.convertTimeToInteger(objA.slot.time) -
      this.convertTimeToInteger(objB.slot.time)
    )
  }
  renderSlots = (currBusiness, entities) => {
    // sorts and renders slotcard
    const slotArr = this.flatten(
      currBusiness.stylists.map(styId => {
        const stylist = entities.stylists[styId]
        return stylist.stylistSlots.map(stylSlotId => {
          const stylSlot = entities.stylistSlots[stylSlotId]
          const slot = entities.slots[stylSlot.slotId]
          return {stylSlot, slot, entities, stylist}
        })
      })
    )
      .filter(obj => this.doSlotAndStateDateMatch(obj.slot))
      .sort(this.sortByTime)
      .map((obj, idx) => {
        const {stylSlot, slot, stylist} = obj
        return (
          <SlotCard
            key={idx}
            slot={slot}
            stylSlot={stylSlot}
            stylist={stylist}
            entities={entities}
          />
        )
      })
    if (!slotArr.length) {
      return (
        <div className="has-text-centered">
          <strong>No slots found!</strong>
        </div>
      )
    } else {
      return slotArr
    }
  }
  render() {
    const {currBusiness, entities} = this.props
    const stylists = entities.stylists
    const {isCreateSlotActive} = this.state
    const displayDate = moment(this.state.date).format('MMM Do YY')
    const flatten = this.flatten
    return (
      <React.Fragment>
        <div className="columns container">
          <div className="column is-narrow">
            <Calendar onChange={this.onChange} value={this.state.date} />
          </div>
          <div className="column box">
            <div className="media">
              <div className="media-content">
                <p className="title">{displayDate}</p>
              </div>
              <div className="media-right">
                <button
                  className="button is-primary"
                  type="button"
                  onClick={this.toggleCreateSlotForm}
                >
                  Create slot
                </button>
              </div>
            </div>
            {this.renderSlots(currBusiness, entities)}
          </div>
        </div>
        {isCreateSlotActive && (
          <CreateSlotForm
            isActive={isCreateSlotActive}
            toggleForm={this.toggleCreateSlotForm}
            stylists={stylists}
            date={this.state.date}
          />
        )}
      </React.Fragment>
    )
  }
}

export default MyBusinessCalendar
