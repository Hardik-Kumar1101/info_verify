import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import Home from './Components/Home';
import MailPage from './Components/MailPage';
import VerifyOTP from './Components/VerifyOTP';
class App extends Component {
  render() {
    return (
      <>
      <div>
      <Toaster
          position="top-right"
          toastOptions={{
              success: {
                  theme: {
                      primary: '#4aed88',
                  },
              },
          }}
      ></Toaster>
  </div>
      <BrowserRouter>
  
      <Routes>
  
          <Route path="/" element={<MailPage />} />
          <Route path="/List" element={<Home />} />
          <Route path="/Verify" element={<VerifyOTP />} />
      </Routes>
  
  </BrowserRouter>
  </>
    );
  }
}

export default App;
