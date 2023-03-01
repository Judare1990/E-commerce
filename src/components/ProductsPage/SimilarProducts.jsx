import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CardProduct from '../Home/CardProduct'


const SimilarProducts = ({ category, productId }) => {

    const [filterProducts, setFilterProducts] = useState()

    const { products } = useSelector(state => state)

    useEffect(() => {
        if (products && category) {
            setFilterProducts(products?.filter(product => product.category.id === category.id))
        }
    }, [category, products])


    return (
        <div className='similar_products'>
            <h2>Discover similar products</h2>
            <div>
                {
                    filterProducts?.map(prod => {
                        if (prod.id !== productId) {
                            return <CardProduct
                                key={prod.id}
                                product={prod}
                            />
                        }
                    })
                }
            </div>
        </div>
    )
}

export default SimilarProducts