import './App.css';
// import Select from './components/SelectFilter';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Filter from './pages/Filter';
import Home from './pages/Home';
import { useEffect, useState } from 'react';

function App() {
  const [filtredData, setFiltredData] = useState([]);

  useEffect(() => {
    console.log("I AM UPDATED", filtredData);
  }, [filtredData])
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Home setFiltredData={setFiltredData}/>} />
          <Route path="/filter" element={<Filter filtredData={filtredData} setFiltredData={setFiltredData}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
