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
  storageBucket: "",
  messagingSenderId: "251657686705"
};

firebase.initializeApp(config);

const database = firebase.database();

class App extends Component {
  constructor() {
    super();
    this.state = {}
  }

  componentDidMount = () => {
    database.ref('name').once('value')
  }

  click = () => {
    database.ref('/name').set(this.input.value);
   this.setState({name: this.input.value});
  }

  
  render() {
    return (
      <div className="App">
        <h2>what's your name?</h2>
        <input ref={r => this.input = r} />
        <button onClick={this.click}>save</button>

       {this.state.name ? (<div>
          <p>{this.state.name}</p>
       </div>) : null }
        
      </div>
    );
  }
}

export default App;

/*
Question 1
Create a new react app.

Make a page that asks a person for their name. 
As soon as the name is entered it is saved. 
The next person to go to that page will see the name.
*/