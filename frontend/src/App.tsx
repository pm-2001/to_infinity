import { useState } from 'react';
import './App.css';
import ListProduct from './components/ListProduct';
import Navbar from './components/Navbar';
import CardInput from './components/CardInput';
import Loader from './components/Loader';

function App() {

  return (
    <>
      <div
        className="d-flex flex-column"
        style={{
          background: "#bce6ff", // Gradient related to blue theme
          minHeight: "100vh", // Ensures the background covers the full height of the screen
        }}
      >
        <Navbar />
        <CardInput />
        {/* <Loader /> */}
      </div>
    </>
  );
  
}

export default App;
