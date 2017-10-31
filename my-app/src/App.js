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
    this.state = {names: []}
  }

  componentDidMount = () => {
    database.ref('names').on('child_added',
    data => {
      let d = data.val();
       {this.setState(st => ({names: st.names.concat(d)}))
      }
    })
  }  
    
 //database.ref('/someref').push().set({my: "information"}) 
  click = (e) => {
    e.preventDefault();
    database.ref('names').push().set(this.input.value);
    this.input.value = '';
  }

  stringToDiv = (string) => {
    return (<div>{string}</div>)
  }

  render() {
    return (
      <div className="App">
        <h1>what's your name?</h1>
        <input ref={r => this.input = r}/>
        <button type="submit" onClick={this.click}>save</button>

        {this.state.names ?
          (<div>{this.state.names.map(this.stringToDiv)}</div>) : 
          (<div>no names yet</div>)
        }


      </div>
    )
  }
}
export default App;

/*

Create a new react app.

Make a page that asks a person for their name. A list of names from all previous visitors is displayed.

('value',
      data =>  this.setState({name: data.val()})
    )
  }

  componentDidMount(){
    database.ref(‘name’).once OR ON(‘value’)
      .then(data => {
      let d = data.val ();
    for(var x in d) {
    this.setState(st => ({names: st.names.concat(d[x]) }))
    }
    })
    }
*/