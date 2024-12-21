



import { useEffect, useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import axios from "axios";
import Categories from "./Categories";
import { FaHeart } from "react-icons/fa";
import './Home.css';
import API_URL from "../constants";

function LikedProducts() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [search, setSearch] = useState('');





    useEffect(() => {
        const fetchLikedProducts = async () => {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                console.error("User ID not found in localStorage");
                alert("User not logged in");
                return;
            }
    
            const url = `${API_URL}/Liked-products`;
            const data = { userId };
    
            try {
                const res = await axios.post(url, data);
                if (res.data && res.data.products) {
                    setProducts(res.data.products);
                    setFilteredProducts(res.data.products);
                } else {
                    console.log("No liked products found");
                }
            } catch (err) {
                console.error("Error fetching products:", err);
                alert("Server error");
            }
        };
    
        fetchLikedProducts();
    }, []);
    
    

    const handleSearch = (value) => {
        setSearch(value);
        const filtered = products.filter(item => 
            item.pname.toLowerCase().includes(value.toLowerCase()) ||
            item.pdesc.toLowerCase().includes(value.toLowerCase()) ||
            item.category.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    const handleLike = (productId) => {
        const userId = localStorage.getItem('userId');
        const url = API_URL +'/like-products';
        const data = { userId, productId };

        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    alert('Liked');
                }
            })
            .catch((err) => {
                alert("Server error");
            });
    };

    return (
        <div>
            <Header search={search} handleSearch={handleSearch} />
            <Categories handleCategory={setFilteredProducts} />

            <h5>SEARCH RESULTS</h5>
            <div className="d-flex justify-content-center flex-wrap">
                {filteredProducts.map(item => (
                    <div key={item._id} className="card m-3">
                        <div onClick={() => handleLike(item._id)} className="icons-con">
                            <FaHeart className="red-icons" />
                        </div>
                        <img width="500px" height="300" src={ API_URL +`/${item.pimage}`} />
                        <p className="m-2"> {item.pname} | {item.category}</p>
                        <h3 className="m-2 text-danger"> {item.price}</h3>
                        <p className="m-2 text-success"> {item.pdesc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LikedProducts;
