import './App.css';
import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from './components/Home';
import NewArticle from './components/NewArticle';
import Post from './page/Homepage/Post'; 

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:slug" element={<Post />} />
          <Route path='/editor' element={<NewArticle />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
