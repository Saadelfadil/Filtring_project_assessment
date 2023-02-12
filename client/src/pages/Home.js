import React from "react";
import '../App.css';
import SelectFilter from '../components/SelectFilter';

const Home = ({setFiltredData}) => {
  return (
    <div className="flex h-screen justify-center items-center gap-12">
      <SelectFilter setFiltredData={setFiltredData}/>
    </div>
  )
};

export default Home;
