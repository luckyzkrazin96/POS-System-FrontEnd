import {useEffect, useState } from "react";
import ItemType from "../types/ItemType";
import CategoryType from "../types/CategoryType";
import axios from "axios";

function Item() {

    const [items, setItems] = useState<ItemType[]>([])

    const [itemName, setItemName] = useState<string>("")
    const [price, setPrice] = useState<number>(0.0)
    const [description, setDescription] = useState<string>("")
    const [categoryId, setCategoryId] = useState<number>()

    const [categories, setCategories] = useState<CategoryType[]>([])

    async function loadItems() {
        const response = await axios.get("http://localhost:8080/items")
        setItems(response.data)
        console.log(response.data)
    }

    async function loadCategories() {
        const response = await axios.get("http://localhost:8080/categories")
        setCategories(response.data)
    }

    useEffect(function () {
        loadItems()
        loadCategories()
    }, [])

    function handleItemName(event: any) {
        setItemName(event.target.value)
    }

    function handlePrice(event: any) {
        setPrice(event.target.value)
    }

    function handleDescription(event: any) {
        setDescription(event.target.value)
    }

    function handleCategoryId(event: any) {
        setCategoryId(event.target.value)
    }

    async function handleSubmit() {
        const data = {
            name: itemName,
            price: price,
            description: description,
            categoryId: categoryId
        }

        try {
            await axios.post("http://localhost:8080/items", data)

            loadItems();
            setItemName("");
            setPrice(0)
            setDescription("")
            setCategoryId(0)
        } catch (error: any) {
            console.log(error)
        }
    }

    const [itemEditing, setItemEditing] = useState<ItemType | null>(null)

    function editItem(item: ItemType) {
        setItemEditing(item)
        setItemName(item.name)
        setPrice(item.price)
        setDescription(item.description)
        setCategoryId(item.category?.id)
    }

    async function updateItem() {
        const data = {
            name: itemName,
            price: price,
            description: description,
            categoryId: categoryId
        }

        try {
            await axios.put(`http://localhost:8080/items/${itemEditing?.id}`, data)
            setItemEditing(null)

            loadItems();
            setItemName("");
            setPrice(0)
            setDescription("")
            setCategoryId(0)
        } catch (error: any) {
            console.log(error)
        }
    }

    async function deleteItem(itemId: number) {
        try {
            await axios.delete(`http://localhost:8080/items/${itemId}`)
            loadItems()
        } catch (error) {
            console.log(error)
        }
    }

    return (

        <div className="container mx-auto pt-5 pb-5">
            <h1 className="text-3xl font-semibold mb-5">Items</h1>

            <table className="w-full border-separate border-spacing-0 border-none text-left">
                <thead className="bg-slate-200">
                    <tr>
                        <th className="w-[80px]">Item ID</th>
                        <th className="w-[200px]">Item Name</th>
                        <th className="w-[200px]">Item Price</th>
                        <th className="w-[200px]">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {items.map(function (item) {
                        return (
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>
                                    <button onClick={() => editItem(item)} className="bg-slate-200 text-slate-600 px-2 py-1 rounded-lg hover:bg-slate-300">Edit</button>

                                    <button onClick={() => deleteItem(item.id)} className="bg-red-400 text-white rounded-lg px-2 py-1 hover:bg-red-500">Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <div className="border border-slate-200 py-3 px-4 rounded-lg max-w-[350px]">
                <form >
                    <div>
                        <label className="text-slate-600 font-sm block mb-2">Item Name</label>
                        <input type="text" className="text-slate-600 font-sm block mb-3 w-full p-2 border border-slate-300 rounded-lg" value={itemName} onChange={handleItemName} required />
                    </div>

                    <div>
                        <label className="text-slate-600 font-sm block mb-2">Price</label>
                        <input type="text" className="text-slate-600 font-sm block mb-3 w-full p-2 border border-slate-300 rounded-lg" value={price} onChange={handlePrice} required />
                    </div>

                    <div>
                        <label className="text-slate-600 font-sm block mb-2">Description</label>
                        <input type="text" className="text-slate-600 font-sm block mb-3 w-full p-2 border border-slate-300 rounded-lg" value={description} onChange={handleDescription} required />
                    </div>

                    <div>
                        <label className="text-slate-600 font-sm block mb-2">Category</label>
                        <select className="text-slate-600 font-sm block mb-3 w-full p-2 border border-slate-300 rounded-lg" value={categoryId} onChange={handleCategoryId} required>
                            <option value="">Please select Category</option>
                            {categories.map(function (category) {
                                return (
                                    <option value={category.id}>{category.name}</option>
                                )
                            })}
                        </select>
                    </div>

                    {itemEditing ? (
                        <>
                            <button type="button" className="py-3 px-4 bg-slate-800 text-white rounded-lg hover:bg-slate-950 mb-2 text-sm" onClick={updateItem} >Update Item</button>
                        </>
                    ) : (
                        <>
                            <button type="button" className="py-3 px-4 bg-slate-800 text-white rounded-lg hover:bg-slate-950 mb-2 text-sm" onClick={handleSubmit} >Create Item</button>
                        </>
                    )}
                </form>
            </div>
        </div>
    )

}

export default Item;