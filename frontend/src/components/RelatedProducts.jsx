import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem';
import Title from './Title';

const RelatedProducts = ({category, subCategory}) => {
    // Access products from ShopContext
    const { products } = useContext(ShopContext);
    // State to store related products
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if(products.length > 0) {
            // Create a copy of products array
            let productsCopy = products.slice();
            // Filter products by category
            productsCopy = productsCopy.filter((item)=>category === item.category);
            // Further filter products by subCategory
            productsCopy = productsCopy.filter((item) => subCategory === item.subCategory);
            // Set up to 5 related products
            setRelated(productsCopy.slice(0,5));
        }
    },[products])

    return (
        <div className='my-24'>
            {/* Title section */}
            <div className='text-center text-3xl py-2'>
                <Title text1={'Related'} text2={'Products'} />
            </div>
            {/* Grid layout for related products */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {/* Map through related products and render ProductItem for each */}
                {related.map((item, index) => (
                    <ProductItem 
                        key={index} 
                        id={item._id} 
                        name={item.name} 
                        price={item.price} 
                        image={item.image} 
                    />
                ))}
            </div>
        </div>
    )
}

export default RelatedProducts
