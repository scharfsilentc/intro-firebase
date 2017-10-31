import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDwqOiauuNCJhem7rsnSTfqitGlHzp8e3Q",
  authDomain: "questions-1-4.firebaseapp.com",
  databaseURL: "https://questions-1-4.firebaseio.com",
  projectId: "questions-1-4",
  storageBucket: "questions-1-4.appspot.com",
  messagingSenderId: "251657686705"
};

firebase.initializeApp(config);
const database = firebase.database();

class Chat extends Component{

  constructor () {
    super();
    this.state = {chatBox: []}
  }

  componentDidMount() {
    database.ref(`${this.props.id}/messages`).on('child_added',
      data => {var d = data.val();
        this.setState(st => 
              ({chatBox: st.chatBox.concat(d)})
        )}
    )  
  }

  click = (e) => {
    e.preventDefault();
    var fullMessage = {name: this.inputName.value, message: this.inputMessage.value};
   // var fullMessage = inputs.join(' ');
    database.ref(`${this.props.id}/messages`).push().set(fullMessage);
    this.inputMessage.value = ''

  }

  displayLine = (lineObject)  => {
    return (
      <li>{lineObject.name} {lineObject.message}</li>
    )
  }
 
  render() {
    return (
      <div className="App">
        <div>
          <ul>
          {this.state.chatBox.map( l => this.displayLine(l))}
          </ul>
        </div>
        <h2>chat app</h2>
        <input ref={r => this.inputName = r} placeholder="who's u"/> 
        <input ref={r => this.inputMessage = r} placeholder="write it here"/>
        <button type="submit" onClick={this.click}>"send"</button>
      </div>
    )
  }

}

class App extends Component {

  render() {
    return (
      <div>
        <Chat id="1"/>
        <Chat id="2"/>
      </div>
    )

  }
}

export default App;



