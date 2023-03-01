import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/shared/Header'
import CartPage from './pages/CartPage'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import ProductPage from './pages/ProductPage'
import ProtectedRoutes from './pages/ProtectedRoutes'
import PurchasesPage from './pages/PurchasesPage'
import RegisterPages from './pages/RegisterPages'
import { getCartThunk } from './store/slices/cart.slice'
import { getAllProductsThunk } from './store/slices/products.slice'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllProductsThunk())
    dispatch(getCartThunk())
  }, [])

  return (
    <div className="App">
      <Header />
      <hr />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductPage />} />
        <Route path='/user'>
          <Route path='register' element={<RegisterPages />} />
          <Route path='login' element={<LoginPage />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route path='/cart' element={<CartPage />} />
          <Route path='/purchases' element={<PurchasesPage />} />
        </Route>

      </Routes>
    </div>
  )
}

export default App
