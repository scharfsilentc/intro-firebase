import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase';

 // Initialize Firebase
var config = {
  apiKey: "AIzaSyA2uH75hOgT_kUaY13qzbjHJZp53mn4fNM",
  authDomain: "database-4faba.firebaseapp.com",
  databaseURL: "https://database-4faba.firebaseio.com",
  projectId: "database-4faba",
  storageBucket: "database-4faba.appspot.com",
  messagingSenderId: "1038087220594"
  };

  firebase.initializeApp(config);
let database = firebase.database();

class App extends Component {
  constructor() {
    super();
    this.state = {}
  }


  click = () => {
    database.ref('name').set(this.inp.value)
    console.log(this.inp.value);
    
  }

  componentDidMount = () => {
  var r = database.ref('/push/test');
  r.on('child_added', data => console.log('child added ',data.val()));
  for(var i = 0; i < 10; i++) {
   r.push().set(i * 2);
  }

  var r = database.ref('/push/test');
  r.on('value', data => console.log('value added ',data.val()))
  for(var i = 0; i < 10; i++) {
   r.push().set(i * 2);
  }
  
    
    database.ref('name').once('value')
    .then(data => this.setState({name: data.val()} )
      )
  }

  render() {
    return (
      <div className="App">
        <h1>hello</h1>
          {this.state.name ? 
          (<div>{this.state.name}</div>) : null}
          <div>        
            <input ref={r => this.inp = r}/>
            <button onClick={this.click}>save</button>
          </div> 
        
      </div>
    );
  }
}

export default App;
