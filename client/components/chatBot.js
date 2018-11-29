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
  componentDidMount() {
    addResponseMessage('Hello, how can I help you!')
  }

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

    addResponseMessage(`${response}`)
  }
  render() {
    return (
      <div>
        <Widget
          handleNewUserMessage={this.handleNewUserMessage}
          profileAvatar= "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/153/robot-face_1f916.png"
          title="Chatbot"
          subtitle=""
        />
      </div>
    )
  }
}

/* <ChatBot id={Number(this.props.match.params.id)}
import ChatBot from './chatBot'
*/
