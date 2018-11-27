import {
  Widget,
  addResponseMessage,
  addLinkSnippet,
  addUserMessage
} from 'react-chat-widget'
import React from 'react'
import 'react-chat-widget/lib/styles.css'
//import logo from './logo.svg'
import axios from 'axios'

export default class ChatBot extends React.Component {
  handleNewUserMessage = async newMessage => {
    const bId = this.props.id
    console.log(`New message incomig! ${newMessage} business id ${bId}`)
    // Now send the message throught the backend API
    const message = {
      data: newMessage,
      id: bId
    }
    const response = (await axios.post('/api/business/chatbot', message)).data
    console.log('Shoow up', response)

    addResponseMessage(`$$$${response}`)
    addResponseMessage(`$$$${response}`)
  }
  render() {
    return (
      <Widget
        handleNewUserMessage={this.handleNewUserMessage}
        //profileAvatar=
        title="My new awesome title"
        subtitle="And my cool subtitle"
      />
    )
  }
}
