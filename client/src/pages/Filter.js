import React, {props, useState} from "react";
import SelectFilterMinor from "../components/SelectFilterMinor";
import { useNavigate } from "react-router-dom"
import Table from "../components/datatable";

const Filter = ({filtredData, setFiltredData}) => {
    const navigate = useNavigate();
    const [finalData, setFinalData] = useState([]);
    const [add, setAdd] = useState(false);

  return (
    <div className="flex h-screen justify-center items-center">
        <div className="flex-col items-center gap-16">
            <div className="flex items-center justify-center mb-10">
                <button onClick={() => {navigate("/")}} className=" text-white bg-blue-400 dark:bg-orange-200 focus:bg-orange-500 hover:bg-orange-500  font-medium rounded-lg text-sm px-5 py-2.5 text-center">Go to Home page</button>
            </div>
            <div className="flex justify-center items-center gap-12">
                <SelectFilterMinor filtredData={filtredData} setFinalData={setFinalData} />
            </div>
            <div className="flex justify-center p-1 mt-10">
                <button className=" text-white bg-blue-200 dark:bg-blue-400 focus:bg-blue-500 hover:bg-blue-500  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={() => setAdd((prev) => prev = true)}>
                        Add an empty arrow
                </button>
            </div>
            <Table finalData={finalData} add={add} setAdd={setAdd}/>
        </div>
    </div>
  )
};

export default Filter;
