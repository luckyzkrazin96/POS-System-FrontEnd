import './App.css'

import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Category from './pages/Category'
import Item from './pages/Item'
import Stock from './pages/Stock'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/item" element={<Item />} />
        <Route path="/stock" element={<Stock/>}/>
      </Routes>
    </BrowserRouter>
  )

}

export default App 
