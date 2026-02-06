// Image Imports
import img1 from "./tanish-assets/p1.png";
import img2 from "./tanish-assets/p2.png";
import img3 from "./tanish-assets/p3.png";
import img4 from "./tanish-assets/p4.png";
import img5 from "./tanish-assets/p5.png";
import img6 from "./tanish-assets/p6.png";
import img7 from "./tanish-assets/p7.png";
import img8 from "./tanish-assets/p8.png";
import img9 from "./tanish-assets/p9.png";

const all_product = [
    {
        id: 1,
        name: "Gradient Graphic T-shirt",
        category: "T-shirts",
        price: 145,
        new_price: 145, // Adding new_price for consistency with potential backend models
        old_price: null,
        rating: 3.5,
        image: img1,
        discount: null,
        description: "This gradient graphic t-shirt is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
        colors: ["#505634", "#203430", "#181A28"],
        sizes: ["Small", "Medium", "Large", "X-Large"]
    },
    {
        id: 2,
        name: "Polo with Tipping Details",
        category: "Shirts",
        price: 180,
        new_price: 180,
        old_price: null,
        rating: 4.5,
        image: img2,
        discount: null,
        description: "A classic polo shirt with stylish tipping details. Made from premium cotton for a comfortable fit.",
        colors: ["#F1C40F", "#E67E22", "#E74C3C"],
        sizes: ["Small", "Medium", "Large", "X-Large"]
    },
    {
        id: 3,
        name: "Black Striped T-shirt",
        category: "T-shirts",
        price: 120,
        new_price: 120,
        old_price: 150,
        rating: 5.0,
        image: img3,
        discount: "-30%",
        description: "A trendy black striped t-shirt that adds a bold touch to your casual wardrobe.",
        colors: ["#000000", "#FFFFFF"],
        sizes: ["Small", "Medium", "Large", "X-Large"]
    },
    {
        id: 4,
        name: "Skinny Fit Jeans",
        category: "Jeans",
        price: 240,
        new_price: 240,
        old_price: 260,
        rating: 3.5,
        image: img4,
        discount: "-20%",
        description: "Slim-fit jeans made from durable denim. Provides a modern look with excellent comfort.",
        colors: ["#3498DB", "#2980B9"],
        sizes: ["30", "32", "34", "36"]
    },
    {
        id: 5,
        name: "Checkered Shirt",
        category: "Shirts",
        price: 180,
        new_price: 180,
        old_price: null,
        rating: 4.5,
        image: img5,
        discount: null,
        description: "A versatile checkered shirt suitable for both casual and semi-formal occasions.",
        colors: ["#E74C3C", "#C0392B"],
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: 6,
        name: "Sleeve Striped T-shirt",
        category: "T-shirts",
        price: 130,
        new_price: 130,
        old_price: 160,
        rating: 4.5,
        image: img6,
        discount: "-30%",
        description: "Features sleeve stripes for a sporty look. Soft fabric ensures all-day comfort.",
        colors: ["#9B59B6", "#8E44AD"],
        sizes: ["Small", "Medium", "Large", "X-Large"]
    },
    {
        id: 7,
        name: "Vertical Striped Shirt",
        category: "Shirts",
        price: 212,
        new_price: 212,
        old_price: 232,
        rating: 5.0,
        image: img7,
        discount: "-20%",
        description: "Elegant vertical striped shirt that elongates the silhouette. Perfect for office or casual wear.",
        colors: ["#1ABC9C", "#16A085"],
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: 8,
        name: "Courage Graphic T-shirt",
        category: "T-shirts",
        price: 145,
        new_price: 145,
        old_price: null,
        rating: 4.0,
        image: img8,
        discount: null,
        description: "Show your courage with this bold graphic t-shirt. High-quality print that lasts.",
        colors: ["#E67E22", "#D35400"],
        sizes: ["Small", "Medium", "Large", "X-Large"]
    },
    {
        id: 9,
        name: "Loose Fit Bermuda Shorts",
        category: "Shorts",
        price: 80,
        new_price: 80,
        old_price: null,
        rating: 3.0,
        image: img9,
        discount: null,
        description: "Relaxed fit Bermuda shorts for maximum comfort during hot summer days.",
        colors: ["#34495E", "#2C3E50"],
        sizes: ["30", "32", "34", "36"]
    }
];

export default all_product;
