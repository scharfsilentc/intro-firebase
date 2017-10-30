import React, { Component } from 'react';
import logo from './logo.svg';
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

class App extends Component {
  constructor() {
    super();
    this.state = {name: []}
  }

  componentDidMount = () => {
    database.ref('name').once('value')
    .then(data => this.setState({name:data.val()})
    )
  }
 //database.ref('/someref').push().set({my: "information"}) 
  click = () => {
    database.ref('name').push().set(this.input.value);
  
  }

  render() {
    return (
      <div className="App">
        <h1>what's your name?</h1>
        <input ref={r => this.input = r}/>
        <button onClick={this.click}>save</button>

        {this.state.name ?
          (<div>{this.state.name}</div>) : 
          (<div>no names yet</div>)
        }


      </div>
    )
  }
}
export default App;