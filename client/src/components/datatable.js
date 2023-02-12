import React, { useEffect, useState } from "react"
import axios from "axios"
import TableHeaders from "./TableHeaders";

const carsData = [
    [10, 5, 10, 20, 15, 0, 5, 12, 15, 18, 20, 14],
    [6, 5, 0, 8, 9, 10, 12, 0, 16, 18, 10, 10],
    [6, 7, 8, 2, 9, 0, 12, 0, 14, 10, 0, 12]]

    const dates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const Table = ({finalData, add, setAdd}) => {

    const [updateState, setUpdateState] = useState(-1);
    const [editedData, setEditData] = useState({});
    const [addData, setAddData] = useState([]);

    const updateUser = async (car) => {
        try {
            const res = await axios.put(`http://localhost:4000/api/filters/${car._id}`, finalData[0].quantities).then()
            .then((data) => {
                console.log('Success:', data);
                setUpdateState((prev) => prev = -1)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            console.log("RES: ", res)
        } catch (e) {
            console.log(e)
        }
    }

    const handleAdd = async (e) => {
        const {_id, ...newAddData} = addData[0]

         try {
            const res = await axios.post(`http://localhost:4000/api/filters`, newAddData).then()
            .then((data) => {
                console.log('Success:', data);
                e.preventDefault = ""
                setAdd((prev) => prev = false);
                // setUpdateState((prev) => prev = -1)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            console.log("RES: ", res)
        } catch (e) {
            console.log(e)
        }
    }

    console.log("FINAL : ", finalData)

    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto">
                <div className="p-12 w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-white">
                                <TableHeaders/>
                            </thead>

                            {
                                finalData.map((car) => {
                                    return (
                                        updateState === car._id ?
                                        <tbody className="divide-y divide-gray-200">
                                            <tr>
                                                {
                                                    car.quantities.map((c, index) => {
                                                        return (
                                                            <td className="px-3 py-2 text-sm text-gray-800 whitespace-nowrap">
                                                                <input type="number"  defaultValue={c} name="number"  
                                                                onChange={(e) => 
                                                                    finalData.map((final, ind) => {
                                                                            console.log("IN : ", final.quantities[index])
                                                                            final.quantities[index] = parseInt(parseInt(e.target.value));
                                                                    })}
                                                                className="text-sm w-14 p-2 rounded-md dark:bg-gray-100 dark:text-black" ></input>
                                                            </td>
                                                        )
                                                    })
                                            
                                                 }
                                                 
                                                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                    <button
                                                        className="text-green-500 hover:text-green-700 "
                                                        onClick={() => updateUser(car)}
                                                        >
                                                        Edit
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                        <button
                                                            // onClick={() => handleDeleteContact(user._id)}
                                                            className="text-gray-500 hover:text-gray-700 cursor-not-allowed"
                                                            >
                                                            Delete
                                                        </button>
                                                </td>
                                            </tr>
                                        </tbody> :
                                        <tbody className="divide-y divide-gray-200">
                                                <tr>
                                                    {
                                                        car.quantities.map((c) => {
                                                        return (
                                                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                                            {c}
                                                            </td>
                                                        )

                                                    })
                                                
                                                    }
                                                    
                                                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                        <button
                                                            className="text-green-500 hover:text-green-700"
                                                            onClick={() => setUpdateState((prev) => prev = car._id)}
                                                            >
                                                            Edit
                                                        </button>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                        <button
                                                            className="text-red-500 hover:text-red-700 cursor-not-allowed"
                                                            >
                                                            Delete
                                                        </button>
                                                    </td>
                                                    
                                                </tr>
                                            </tbody>

                                        );
                                    })
                            }
                            {add ?
                            <tbody className="divide-y divide-gray-200 border">
                                <tr>
                                        {
                                            dates.map((dt, index) => {
                                                return (
                                                <td className="px-3 py-2 text-sm text-gray-800 whitespace-nowrap">
                                                    <input type="number"  defaultValue={""} name="number" 
                                                    onChange={(e) => {
                                                        let tmpData = finalData
                                                        tmpData.map((final, ind) => {
                                                            console.log("IN : ", final.quantities[index])
                                                            final.quantities[index] = parseInt(parseInt(e.target.value));
                                                        });
                                                        setAddData((prev) => prev = tmpData)
                                                        console.log("FINAL TMP : ", addData)
                                                    }}
                                                    className="text-sm w-14 p-2 rounded-md dark:bg-gray-100 dark:text-black" ></input>
                                                </td>
                                                )
                                            })
                                        }
                                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                            <button
                                                className="text-gray-500 hover:text-gray-700 cursor-not-allowed"
                                                >
                                                Edit
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                            <button
                                                className="text-gray-500 hover:text-gray-700 cursor-not-allowed"
                                                >
                                                Delete
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                            <button
                                                onClick={(e) => handleAdd(e)}
                                                className="text-blue-500 hover:text-blue-700"
                                                >
                                                Add
                                            </button>
                                        </td>
                                </tr>
                            </tbody> : <></>
                        } 
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Table;