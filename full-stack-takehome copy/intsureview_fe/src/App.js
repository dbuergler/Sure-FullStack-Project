import logo from './logo.svg';
import React from 'react';
import './App.css';
import Footer from './components/Home/Footer';
import Header from './components/Home/Header';
import FormCreate from './components/Forms/FormCreate';


const App = () =>{

// Imported FormCreate component to App.js to display the form 

  return (
    <div className="App">
      <div>
        <Header/>
          <div>
            <h2>Race Sign Up Form</h2>
            <FormCreate/>
          </div>
        <Footer/>
      </div>
    </div>
  );
}

export default App;