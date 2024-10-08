import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ShopContext } from "../context/ShopContext";
import { useContext } from "react";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import ReviewCarousel from "../components/ReviewCarousel";

const Product = () => {
  // Extract productId from URL parameters
  const { productId } = useParams();
  // Access global shop context for products and currency
  const { products, currency, addToCart } = useContext(ShopContext);
  // State variables for product details and user interactions
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ name: "", text: "", rating: 5 });
  const [averageRating, setAverageRating] = useState(0);

  // Fetch or generate reviews for the product
  const fetchReviews = () => {
    const storedReviews = localStorage.getItem(`reviews_${productId}`);
    if (storedReviews) {
      // Use stored reviews if available
      const parsedReviews = JSON.parse(storedReviews);
      setReviews(parsedReviews);
      updateAverageRating(parsedReviews);
    } else {
      // Generate new reviews if none are stored
      const reviewers = [
        { name: "John Doe", image: "https://i.pravatar.cc/150?img=1" },
        { name: "Jane Smith", image: "https://i.pravatar.cc/150?img=2" },
        { name: "Mike Johnson", image: "https://i.pravatar.cc/150?img=3" },
        { name: "Emily Brown", image: "https://i.pravatar.cc/150?img=4" },
        { name: "Chris Lee", image: "https://i.pravatar.cc/150?img=5" },
        { name: "Sarah Wilson", image: "https://i.pravatar.cc/150?img=6" },
      ];

      const reviewTexts = [
        "Great product! Highly recommended.",
        "Excellent quality and fast shipping.",
        "Good value for money.",
        "Fits perfectly. I love it!",
        "Nice design and comfortable to wear.",
        "Exactly as described. Very satisfied.",
        "Amazing product, will buy again!",
        "Exceeded my expectations.",
        "Decent quality for the price.",
        "Stylish and practical.",
      ];

      // Generate random reviews
      const generatedReviews = reviewers.map((reviewer, index) => ({
        id: index + 1,
        name: reviewer.name,
        image: reviewer.image,
        text: reviewTexts[Math.floor(Math.random() * reviewTexts.length)],
        rating: Math.floor(Math.random() * 5) + 1,
      }));

      setReviews(generatedReviews);
      updateAverageRating(generatedReviews);
      localStorage.setItem(
        `reviews_${productId}`,
        JSON.stringify(generatedReviews)
      );
    }
  };

  // Handle submission of a new review
  const handleNewReviewSubmit = (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page

    // Create a new review object using the input data and assign it a unique id
    const newReviewObj = {
      id: reviews.length + 1, // Set the id as one higher than the current number of reviews
      name: newReview.name, // Get the reviewer's name from the form
      image: `https://i.pravatar.cc/150?img=${reviews.length + 7}`, // Generate a random avatar image for the reviewer
      text: newReview.text, // Get the review text from the form
      rating: parseInt(newReview.rating), // Parse and store the rating as an integer
    };

    // Add the new review to the existing list of reviews
    const updatedReviews = [...reviews, newReviewObj];

    // Update the state with the new list of reviews
    setReviews(updatedReviews);

    // Recalculate and update the average rating based on the updated reviews
    updateAverageRating(updatedReviews);

    // Save the updated reviews list to localStorage for persistence
    localStorage.setItem(
      `reviews_${productId}`,
      JSON.stringify(updatedReviews)
    );

    // Reset the review form to its default state
    setNewReview({ name: "", text: "", rating: 5 });
  };

  // Calculate and update the average rating
  const updateAverageRating = (reviewsArray) => {
    const totalRating = reviewsArray.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    setAverageRating(totalRating / reviewsArray.length);
  };

  // Fetch product data based on productId
  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  // Effect hook to fetch data when productId changes
  useEffect(() => {
    fetchProductData();
    fetchReviews();
  }, [productId]);

  // Render star rating based on given rating value
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${
          index < rating ? "text-[#FFC0CB]" : "text-[#708090]"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  // Render product details if data is available
  return productData ? (
    <div className=" min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20 ">
        <div className="flex gap-12 flex-col sm:flex-row">
          {/* Product image gallery */}
          <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
            {/* Thumbnail images */}
            <div className="flex flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
              {productData.image.map((item, index) => (
                <img
                  src={item}
                  key={index}
                  className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer border-2 border-[#708090] hover:border-[#FFC0CB] transition duration-300"
                  alt="product images"
                  onClick={() => setImage(item)}
                />
              ))}
            </div>
            {/* Main product image */}
            <div className="w-full sm:w-[80%]">
              <img
                className="w-full h-auto border-2 border-[#708090]"
                src={image}
                alt=""
              />
            </div>
          </div>
          {/* Product details */}
          <div className="flex-1">
            <h1 className="font-bold text-3xl mt-2 text-[#2F4F4F]">
              {productData.name}
            </h1>
            {/* Star rating and review count */}
            <div className="flex gap-2 items-center mt-2">
              {renderStars(Math.round(averageRating))}
              <p className="pl-2 text-[#708090]">({reviews.length})</p>
            </div>
            {/* Price */}
            <p className="mt-5 text-3xl font-bold text-[#FFC0CB]">
              {currency}
              {productData.price}
            </p>
            {/* Product description */}
            <p className="mt-5 text-[#708090]">{productData.description}</p>
            {/* Size selection */}
            <div className="flex flex-col gap-4 my-8">
              <p className="text-[#2F4F4F] font-semibold">Select Size</p>
              <div className="flex gap-2">
                {productData.sizes.map((item, index) => (
                  <button
                    className={`border py-2 px-4 bg-white text-[#708090] ${
                      item === size
                        ? "border-[#FFC0CB] bg-[#FFC0CB] text-white"
                        : "border-[#708090]"
                    } hover:bg-[#FFC0CB] hover:text-white transition duration-300`}
                    key={index}
                    onClick={() => setSize(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            {/* Add to cart button */}
            <button
              onClick={() => addToCart(productData._id, size)}
              className="bg-[#708090] text-white px-8 py-3 text-sm hover:bg-[#FFC0CB] hover:text-[#2F4F4F] transition duration-300"
            >
              Add to Cart
            </button>
            <hr className="mt-8 sm:w-4/5 border-[#708090]" />
            {/* Additional product information */}
            <div className="text-sm text-[#708090] mt-5 flex-col flex gap-1">
              <p>✓ Shop with confidence - all products are 100% authentic.</p>
              <p>✓ Hassle-free payment - Cash on Delivery available.</p>
              <p>
                ✓ Easy returns and exchanges - your satisfaction is our
                priority.
              </p>
            </div>
          </div>
        </div>
        {/* Customer reviews section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-[#2F4F4F] mb-8">
            Customer Reviews ({reviews.length})
          </h2>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <ReviewCarousel reviews={reviews} />
            </div>
            <div className="lg:w-1/3">
              {/* Review submission form */}
              <form
                onSubmit={handleNewReviewSubmit}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-semibold text-[#2F4F4F] mb-4">
                  Write a Review
                </h3>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={newReview.name}
                  onChange={(e) =>
                    setNewReview({ ...newReview, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-[#708090] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC0CB] mb-4"
                />
                <select
                  value={newReview.rating}
                  onChange={(e) =>
                    setNewReview({ ...newReview, rating: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-[#708090] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC0CB] mb-4"
                >
                  <option value="">Select Rating</option>
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <option key={rating} value={rating}>
                      {rating} Stars
                    </option>
                  ))}
                </select>
                <textarea
                  placeholder="Your Review"
                  value={newReview.text}
                  onChange={(e) =>
                    setNewReview({ ...newReview, text: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-[#708090] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC0CB] mb-4"
                  rows="4"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-[#708090] text-white py-2 rounded-md hover:bg-[#FFC0CB] hover:text-[#2F4F4F] transition duration-300"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        </div>
        {/* Related products component */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-[#2F4F4F] mb-8 text-center">
            Related Products
          </h2>
          <RelatedProducts
            category={productData.category}
            subCategory={productData.subCategory}
          />
        </div>
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
