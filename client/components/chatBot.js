import {Widget, addResponseMessage} from 'react-chat-widget'
import React from 'react'
import 'react-chat-widget/lib/styles.css'

export default class ChatBot extends React.Component {
  handleNewUserMessage = newMessage => {
    console.log(`New message incomig! ${newMessage}`)
    // Now send the message throught the backend API
    addResponseMessage('Hey')
  }
  render() {
    return <Widget handleNewUserMessage={this.handleNewUserMessage} />
  }
}
