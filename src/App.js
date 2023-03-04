import './css/App.css';
import React, { Component, useEffect } from "react";
//import { BrowserRouter, Route, Routes} from 'react-router-dom'
//import { AuthContextProvider } from './auth';

function App() {
  return (
    <BrowserRouter>
    <AuthContextProvider>
      <div className="app">
        <AppBanner/>
        <Routes> 
          <Route exact path="/" element={<SplashScreen />} />
        </Routes>
      </div>
    </AuthContextProvider> 
  </BrowserRouter>
  );
}

export default App;
