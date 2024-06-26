import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'; // Import star icons from react-icons library

const ReviewForm = () => {
    const [rating, setRating] = useState(0);
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleRatingClick = (value) => {
        setRating(value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would handle submission, for example, sending data to backend
        console.log('Submitting review:', { rating, description });
        // Optionally, clear form fields or show a success message
        navigate('/menu'); // Redirect back to the home page or any other appropriate route
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Add Review</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-6 flex items-center justify-center">
                    {[1, 2, 3, 4, 5].map((value) => (
                        <button
                            key={value}
                            type="button"
                            onClick={() => handleRatingClick(value)}
                            className="focus:outline-none"
                        >
                            {value <= rating ? (
                                <AiFillStar className="text-yellow-500 text-2xl" />
                            ) : (
                                <AiOutlineStar className="text-gray-400 text-2xl" />
                            )}
                        </button>
                    ))}
                </div>
                <div className="mb-6">
                    <label htmlFor="description" className="block text-sm font-bold mb-2">
                        Review Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={description}
                        onChange={handleDescriptionChange}
                        rows={4}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Submit Review
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ReviewForm;
