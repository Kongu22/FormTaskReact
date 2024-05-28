import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
import './App.css';
import Home from './Pages/Home';
import About from './Pages/About';
import Layout from './layouts/Layout';
import VIP from "./Pages/VIP";
import VipInfo from "./Pages/VipInfo";
import PIXA from "./Pages/Pixa";
import Form from "./Pages/Form"; 

function App() {
  const [userName, setUserName] = useState('');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout userName={userName} />} >
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="vip" element={<VIP />} />
          <Route path="vip/:rank" element={<VipInfo />} />
          <Route path="pixa" element={<PIXA />} />
          <Route path="form" element={<Form setUserName={setUserName} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
