import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const ReviewCard = ({ review }) => (
    <div className="border border-gray-200 rounded-[20px] p-6 lg:p-8 hover:shadow-sm transition-shadow">
        <div className="flex justify-between items-start mb-3">
            <div className="flex text-yellow-400 text-lg">
                {[...Array(5)].map((_, i) => (
                    <span key={i}>
                        {i < Math.floor(review.rating) ? "★" : "☆"}
                    </span>
                ))}
            </div>
            <button className="text-gray-400 hover:text-black">•••</button>
        </div>

        <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
            {review.userName}
            {review.isVerified && (
                <span className="bg-green-500 text-white text-[10px] p-[2px] rounded-full w-4 h-4 flex items-center justify-center">✓</span>
            )}
        </h3>

        {review.title && (
            <h4 className="font-semibold text-base mb-2">{review.title}</h4>
        )}

        <p className="text-gray-600 text-base leading-relaxed mb-4">
            "{review.content}"
        </p>

        <p className="text-gray-500 text-sm font-medium">
            Posted on {new Date(review.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })}
        </p>
    </div>
);

export default function ProductReviews() {
    const { id } = useParams(); // Get product ID from URL
    const [activeTab, setActiveTab] = useState("reviews");
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [averageRating, setAverageRating] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);
    const [visibleReviews, setVisibleReviews] = useState(6);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [formData, setFormData] = useState({
        userName: "",
        rating: 5,
        title: "",
        content: ""
    });

    // Fetch reviews when component mounts or product ID changes
    useEffect(() => {
        if (id && activeTab === "reviews") {
            fetchReviews();
            fetchAverageRating();
        }
    }, [id, activeTab]);

    const fetchReviews = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:4000/products/${id}/reviews`);
            if (response.ok) {
                const data = await response.json();
                setReviews(data.reviews || []);
                setTotalReviews(data.count || 0);
            }
        } catch (error) {
            console.error("Failed to fetch reviews:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchAverageRating = async () => {
        try {
            const response = await fetch(`http://localhost:4000/reviews/average-rating?productId=${id}`);
            if (response.ok) {
                const data = await response.json();
                setAverageRating(data.averageRating || 0);
            }
        } catch (error) {
            console.error("Failed to fetch average rating:", error);
        }
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();

        if (!formData.userName.trim() || !formData.content.trim()) {
            toast.error("Please fill in all required fields");
            return;
        }

        try {
            const token = Cookies.get("token"); // Assuming you use js-cookie like in other files
            const headers = {
                "Content-Type": "application/json",
            };

            if (token) {
                headers["Authorization"] = `Bearer ${token}`;
            }

            const response = await fetch(`http://localhost:4000/products/${id}/reviews`, {
                method: "POST",
                headers: headers,
                body: JSON.stringify({
                    rating: formData.rating,
                    title: formData.title,
                    content: formData.content,
                    userName: formData.userName // Send user name anyway, backend might prefer token user but fallback
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Reset form and refresh reviews
                setFormData({
                    userName: "",
                    rating: 5,
                    title: "",
                    content: ""
                });
                setShowReviewForm(false);
                fetchReviews();
                fetchAverageRating();
                toast.success(data.msg || "Review submitted successfully!");
            } else {
                toast.error(data.msg || "Failed to submit review");
            }
        } catch (error) {
            console.error("Failed to submit review:", error);
            toast.error("Failed to submit review. Please try again.");
        }
    };

    const tabs = [
        { id: "details", label: "Product Details" },
        { id: "reviews", label: "Rating & Reviews" },
        { id: "faqs", label: "FAQs" }
    ];

    return (
        <div className="mt-16 sm:mt-20">
            {/* Tabs Header */}
            <div className="flex border-b border-gray-200 mb-8 sm:mb-10 w-full">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                            flex-1 py-4 text-center font-medium text-base sm:text-lg transition-colors relative
                            ${activeTab === tab.id
                                ? "text-black font-semibold"
                                : "text-gray-500 hover:text-gray-800"
                            }
                        `}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black rounded-t-md" />
                        )}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div>
                {activeTab === "reviews" ? (
                    <>
                        {/* Header Row */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
                            <h3 className="text-xl sm:text-2xl font-bold">
                                All Reviews
                                <span className="text-gray-500 text-base font-normal ml-2">
                                    ({totalReviews})
                                </span>
                                {averageRating > 0 && (
                                    <span className="text-yellow-500 text-base font-normal ml-3">
                                        ★ {averageRating}/5
                                    </span>
                                )}
                            </h3>
                            <button
                                onClick={() => setShowReviewForm(!showReviewForm)}
                                className="bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition"
                            >
                                {showReviewForm ? "Cancel" : "Write a Review"}
                            </button>
                        </div>

                        {/* Review Form */}
                        {showReviewForm && (
                            <form onSubmit={handleSubmitReview} className="bg-gray-50 rounded-xl p-6 mb-8">
                                <h4 className="text-lg font-bold mb-4">Write Your Review</h4>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Your Name *</label>
                                        <input
                                            type="text"
                                            value={formData.userName}
                                            onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Rating *</label>
                                        <select
                                            value={formData.rating}
                                            onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                        >
                                            {[5, 4, 3, 2, 1].map(num => (
                                                <option key={num} value={num}>{"★".repeat(num)} ({num})</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2">Review Title (Optional)</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                        maxLength={100}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2">Your Review * (10-1000 characters)</label>
                                    <textarea
                                        value={formData.content}
                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black h-32"
                                        required
                                        minLength={10}
                                        maxLength={1000}
                                    />
                                    <p className="text-sm text-gray-500 mt-1">{formData.content.length}/1000</p>
                                </div>

                                <button
                                    type="submit"
                                    className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition"
                                >
                                    Submit Review
                                </button>
                            </form>
                        )}

                        {/* Reviews Grid */}
                        {loading ? (
                            <div className="text-center py-10 text-gray-500">Loading reviews...</div>
                        ) : reviews.length === 0 ? (
                            <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-xl">
                                No reviews yet. Be the first to review this product!
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {reviews.slice(0, visibleReviews).map((review) => (
                                    <ReviewCard key={review._id} review={review} />
                                ))}
                            </div>
                        )}

                        {/* Load More Button */}
                        {reviews.length > visibleReviews && (
                            <div className="flex justify-center mt-8 sm:mt-10">
                                <button
                                    onClick={() => setVisibleReviews(prev => prev + 4)}
                                    className="border border-gray-300 px-8 py-3 rounded-full text-sm font-medium hover:bg-black hover:text-white transition-all duration-300"
                                >
                                    Load More Reviews
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-xl">
                        Content for {tabs.find(t => t.id === activeTab)?.label} will go here.
                    </div>
                )}
            </div>
        </div>
    );
}
