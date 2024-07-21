import logo from './logo.svg';
import './App.css';
import React from "react";
import { Button } from "react-bootstrap";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
function App() {
  return (
    <div>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="" element={<></>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
