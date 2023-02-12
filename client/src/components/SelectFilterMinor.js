import React, { useEffect, useState } from "react";
import { filterOptionsMinor } from '../constants/index';
import axios from "axios";

const SelectFilterMinor = ({filtredData, setFinalData}) => {
    const [enableOne, setEnableOne] = useState(true);
    const [enableTwo, setEnableTwo] = useState(true);
    const [enableTree, setEnableTree] = useState(true);

    const [carModel, setCarModel] = useState("");
    const [carSFX, setCarSFX] = useState("");
    const [carVariant, setCarVariant] = useState("");
    const [color, setColor] = useState("");

    const [data, setData] = useState([]);
    // const [newFiltredData, setNewFiltredData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:4000/api/filters`)
        .then((response) => {
            setData(response.data)
        })
    }, []);

    const handleOptionOne = (e) => {
        setCarModel((prev) => prev = e.target.value === "Select an option" ? "" : e.target.value);
        setCarSFX((prev) => prev = "");
        setCarVariant((prev) => prev = "");
        setColor((prev) => prev = "");
        setEnableOne(false);
    }

    const handleOptionTwo = (e) => {
        setCarSFX((prev) => prev = e.target.value === "Select an option" ? "" : e.target.value);
        setCarVariant((prev) => prev = "");
        setColor((prev) => prev = "");
        setEnableTwo(false);
    }

    const handleOptionTree = (e) => {
        setCarVariant((prev) => prev = e.target.value === "Select an option" ? "" : e.target.value);
        setColor((prev) => prev = "");
        setEnableTree(false);
    }

    const handleOptionSubmit = (e) => {
        setColor((prev) => prev = e.target.value === "Select an option" ? "" : e.target.value);
    }

    useEffect(() => {
        const names = [carModel, carSFX, carVariant, color]
        // console.log(carModel, carSFX, carVariant, color)
        filtredData.map((dt) => {
            let newFilter = []
            if (carModel != "")
            {
                console.log("1 = ", carModel, carSFX, carVariant, color)
                if (carModel === dt.model && carSFX === dt.sfx & carVariant === dt.variant && color === dt.color)
                    newFilter.push(dt)
                else if (carModel === dt.model && carSFX === dt.sfx & carVariant === dt.variant && color === "")
                    newFilter.push(dt)
                else if (carModel === dt.model && carSFX === dt.sfx & carVariant === "" && color === "")
                    newFilter.push(dt)
                else if (carModel === dt.model && carSFX === "" & carVariant === "" && color === "")
                    newFilter.push(dt)
            }
            setFinalData(newFilter);
        })
    }, [carModel, carSFX, carVariant, color])

  return (
    <>
        <div>
            <select id="options" onChange={handleOptionOne} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="Select an option">Select an option</option>
            {
                data.map((dt) => {
                    return <option key={dt._id} value={dt.model}>{dt.model}</option>
                })
            }
            </select>
        </div>
        <div>
            <select id="options" disabled={enableOne} onChange={handleOptionTwo} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="Select an option">Select an option</option>
       

            {
                data.map((dt) => {
                    return <>
                    { carModel === dt.model
                        ?
                            <option key={dt._id} value={dt.sfx}>{dt.sfx}</option>
                        :
                            ""
                    } 
                    </>
                })
            }
            </select>
        </div>
        <div>
            <select id="options" disabled={enableTwo} onChange={handleOptionTree} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="Select an option">Select an option</option>
        
            {
                data.map((dt) => {
                    return <>
                    { carModel === dt.model && carSFX === dt.sfx
                        ?
                            <option key={dt._id} value={dt.variant}>{dt.variant}</option>
                        :
                            ""
                    } 
                    </>
                })
            }
            </select>
        </div>
        <div>
            <select id="options" disabled={enableTree} onChange={handleOptionSubmit} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="Select an option">Select an option</option>
            {
                data.map((dt) => {
                    return <>
                    { carModel === dt.model && carSFX === dt.sfx && carVariant === dt.variant
                        ?
                            <option key={dt._id} value={dt.color}>{dt.color}</option>
                        :
                            ""
                    } 
                    </>
                })
            }
            </select>
        </div>
    </>
)
};

export default SelectFilterMinor;
