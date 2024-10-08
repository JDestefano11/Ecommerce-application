import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem';

const RelatedProducts = ({ category, subCategory }) => {
  // Access products from ShopContext
  const { products } = useContext(ShopContext);
  // State to store related products
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      // Create a copy of products array
      let productsCopy = products.slice();
      // Filter products by category
      productsCopy = productsCopy.filter((item) => category === item.category);
      // Further filter products by subCategory
      productsCopy = productsCopy.filter((item) => subCategory === item.subCategory);
      // Set up to 5 related products
      setRelated(productsCopy.slice(0, 5));
    }
  }, [products, category, subCategory]);

  // Handler to reload page and scroll to top
  const handleProductClick = () => {
    window.scrollTo(0, 0); // Scroll to top
    window.location.reload(); // Reload page
  }

  return (
    <div className='my-24'>
      {/* Grid layout for related products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {/* Map through related products and render ProductItem for each */}
        {related.map((item, index) => (
          <div key={index} onClick={handleProductClick}>
            <ProductItem
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts;
