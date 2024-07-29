import logo from './logo.svg';
import './App.css';
import React from "react";
import { Button } from "react-bootstrap";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from './components/Home';
import NewArticle from './components/NewArticle';
import UserArticleDetail from './components/UserArticleDetail';
function App() {
  return (
    <div>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/editor' element={<NewArticle/>}/>
        <Route path='/userarticle' element={<UserArticleDetail/>}/>
      
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
