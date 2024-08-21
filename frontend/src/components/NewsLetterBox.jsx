import React from "react";

const NewsLetterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="text-center">
      <p className="text-2x1 font-medium text-gray-800">
        Subscribe now and get 30% off
      </p>
      <p className="text-gray-400 mt-3 ">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque tenetur
        autem ipsum perferendis. Ab accusamus, aut illum, sequi cumque iure
        quisquam impedit, ipsum delectus ea tenetur sapiente doloremque harum
        vel.
      </p>
      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          placeholder="Enter your email"
          className="border-2 border-gray-300 rounded-l-md px-4 py-2 w-64"
          required
        />
        <button
          className="bg-black text-white text-xs px-10 py-4"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewsLetterBox;
