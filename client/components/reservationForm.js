import React, {Component} from 'react'
import {connect} from 'react-redux'
import Calendar from 'react-calendar'
import Steps, { Step } from 'rc-steps';
import 'rc-steps/assets/index.css';
import 'rc-steps/assets/iconfont.css';

class ResearvationForm extends Component {
  // Initialize all input of date type.
  state = {
    date: new Date(),
  }
 
  onChange = date => {
    console.log(date)
    this.setState({ date })}

  render() {
    const Icon = ({ type }) => <i className={`fa fa-${type}`} />;
    const description = 'hjsdfds'
    return (
      <div>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
          integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU"
          crossOrigin="anonymous"
        />
        <Calendar className="react-calender" minDate={new Date()} onChange={this.onChange} value={this.state.date} />
        <Steps current={1}>
        <Step title="Pick Date" icon={<Icon type="calendar"/>} />
    <Step title="Pick Stylist" icon={<Icon type="user-circle" />} />
    <Step title="Pick Time" icon={<Icon type="clock" />} />
    <Step title="Confirm" icon={<Icon type="check" />} />
  </Steps>
      </div>
    )
  }
}


export default ResearvationForm
