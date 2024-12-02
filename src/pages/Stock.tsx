import { useEffect, useState } from "react";
import StockType from "../types/StockType";
import ItemType from "../types/ItemType";
import axios from "axios";

function Stock() {

    const [stocks, setStocks] = useState<StockType[]>([])
    const [items, setItems] = useState<ItemType[]>([])

    async function loadStock() {
        const response = await axios.get("http://localhost:8080/stocks")
        setStocks(response.data)
    }

    useEffect(function () {
        loadStock();
    }, [])

    return (
        <div className="container mx-auto pt-5 pb-5">
            <h1 className="text-3xl font-semibold mb-5">Stocks</h1>
            <table className="w-full border-separate border-spacing-0 border-none text-left">
                <thead className="bg-slate-200">
                    <tr>
                        <th className="w-[80px]">Stock Id</th>
                        <th className="w-[200px]">Item</th>
                        <th className="w-[80px]">Quntity</th>
                        <th className="w-[200px]">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {stocks.map(function (stock) {
                        return (
                            <tr>
                                <td>{stock.id}</td>
                                <td>{stock.item.name}</td>
                                <td>{stock.qty}</td>
                                <td>
                                    <button className="bg-slate-200 text-slate-600 px-2 py-1 rounded-lg hover:bg-slate-300">Edit</button>
                                    <button className="bg-red-400 text-white rounded-lg px-2 py-1 hover:bg-red-500">Delete</button>
                                </td>
                            </tr>


                        )
                    })

                    }
                </tbody>
            </table>
        </div>
    )
}
export default Stock;