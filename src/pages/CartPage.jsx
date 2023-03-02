import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartItem from '../components/CardPages/CartItem'
import { getCartThunk } from '../store/slices/cart.slice'
import config from '../utils/getConfig'

const CartPage = () => {

  const [totalPrice, setTotalPrice] = useState(0)

  const { cart } = useSelector(state => state)


  useEffect(() => {
    const result = cart?.reduce((acc, cv) => acc + cv.quantity * Number(cv.product.price), 0)
    setTotalPrice(result)
  }, [cart])

  const dispatch = useDispatch()

  const handlePurchase = () => {
    const url = 'https://e-commerce-api-v2.academlo.tech/api/v1/purchases'
    axios.post(url, {}, config)
      .then(res => {
        console.log(res.data)
        dispatch(getCartThunk())
      })
      .catch(err => console.log(err.response))
  }

  return (
    <div>
      <div>
        {
          cart?.map(ProdInfo => (
            <CartItem
              key={ProdInfo.id}
              prodInfo={ProdInfo}
            />

          ))
        }
      </div>
      <footer>
        <h2><span>Total: </span><span>${totalPrice}</span></h2>
        <button onClick={handlePurchase}>Buy this cart</button>
      </footer>
    </div>
  )
}

export default CartPage