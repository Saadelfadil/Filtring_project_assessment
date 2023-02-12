import React, { useEffect, useState } from "react";
import { filterOptions } from '../constants/index';
import axios from "axios";
import { redirect } from "react-router"
import { useNavigate } from "react-router-dom"

const SelectFilter = ({setFiltredData}) => {
    const [enableOne, setEnableOne] = useState(true);
    const [enableTwo, setEnableTwo] = useState(true);
    const [enableSubmit, setEnableSubmit] = useState(true);

    // const [supplier, setSupplier] = useState(NaN);
    const [supplierValue, setSupplierValue] = useState("");
    const [wholeSeller, setWholeSeller] = useState("");
    const [steeringType, setSteeringType] = useState("");
    // const [filtredData, setFiltredData] = useState([]);

    const [data, setData] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:4000/api/filters`)
        .then((response) => {
            setData(response.data)
        })
    }, []);

    const handleOptionOne = (e) => {
        setSupplierValue((prev) => prev = e.target.value);
        setEnableOne(false);
    }

    const handleOptionTwo = (e) => {
        setWholeSeller((prev) => prev = e.target.value);
        setEnableTwo(false);
    }

    const handleOptionSubmit = (e) => {
        setSteeringType((prev) => prev = e.target.value);
        setEnableSubmit(false);
    }

    const handleButton = () => {

        axios.get(`http://localhost:4000/api/filters?supplier=${supplierValue}&wholeSeller=${wholeSeller}&steeringType=${steeringType}`, {
        })
        .then((response) => {
            setFiltredData((prev) => prev = response.data);
            navigate("/filter");
            // window.location.href='/filter';
        })
    }

    return (
        <>
        <div>
            <select onChange={handleOptionOne} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="Select an option">Select an option</option>
            {
                data.map((dt) => {
                    return <option key={dt._id} value={dt.supplier}>{dt.supplier}</option>
                })
            }
            </select>
        </div>
        <div>
            <select disabled={enableOne} onChange={handleOptionTwo} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="Select an option">Select an option</option>
            {
                data.map((dt) => {
                    return <>
                    { supplierValue === dt.supplier
                        ?
                            <option key={dt._id} value={dt.wholeSeller}>{dt.wholeSeller}</option>
                        :
                            ""
                    } 
                    </>
                })
            }
            </select>
        </div>
        <div>
            <select  disabled={enableTwo} onChange={handleOptionSubmit} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="Select an option">Select an option</option>
            {
                data.map((dt) => {
                    return <>
                    { wholeSeller === dt.wholeSeller
                        ?
                            <option key={dt._id} value={dt.steeringType}>{dt.steeringType}</option>
                        :
                            ""
                    } 
                    </>
                })
            }
            </select>
        </div>
        {/* <Link type="button" disabled={enableSubmit} to={{ 
            pathname: "/filter", 
            state: filtredData 
            }} className="text-white bg-blue-400 dark:bg-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit</Link> */}
        <button type="button" disabled={enableSubmit} onClick={() => handleButton()} className="text-white bg-blue-400 dark:bg-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit</button>
    </>
)
};

export default SelectFilter;
