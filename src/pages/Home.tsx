import { Link } from "react-router-dom";


function Home() {

    return (
        <div>
            <div className="w-full bg-gray-100 p-2 rounded-lg">

                <Link to="/category" className="bg-gray-800 text-white px-5 py-2 me-3">Category</Link>
                <Link to="/item" className="bg-gray-800 text-white px-5 py-2 me-3">Item</Link>
                <Link to="/stock" className="bg-gray-800 text-white px-5 py-2 me-3">Manage Stock</Link>

            </div>
        </div>

    )
}

export default Home;