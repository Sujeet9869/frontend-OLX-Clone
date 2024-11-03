

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "./Header";
import axios from "axios";
import Categories from "./Categories";
import { FaHeart } from "react-icons/fa";
import './Home.css';

function Home() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [issearch, setissearch] = useState(false);


    useEffect(() => {
        axios.get('http://localhost:4000/get-products')
            .then(res => setProducts(res.data.products))
            .catch(err => console.error("Server error:", err));
    }, []);

    const handleSearch = (value) => {
        setSearch(value);
    };

    const handleClick = () => {
        const url = `http://localhost:4000/search?search=` + search + '&loc=' + localStorage.getItem('userLoc');
        axios.get(url)
            .then((res) => {
                if (res.data.products) {
                    setFilteredProducts(res.data.products);
                    setissearch(true);
                }
            })
            .catch((err) => {
                alert("Server error");
                console.error(err);
            });
    };

    const handleCategory = (category) => {
        const filtered = products.filter(item => item.category === category);
        setFilteredProducts(filtered);
    };

    const handleLike = (productId, e) => {
        e.stopPropagation();
        let userId = localStorage.getItem('userId');

        if (!userId) {
            alert('Please login first')
            return;
        }

        axios.post('http://localhost:4000/like-products', { userId, productId })
            .then((res) => {
                if (res.data.message) {
                    alert("Liked")
                }
            })
            .catch((err) => {
                alert("Server error");
            });
    };

    const handleProduct = (id) => {
        navigate(`/product/${id}`);
    };

    return (
        <div>
            <Header search={search} handlesearch={handleSearch} handleClick={handleClick} />
            <Categories handleCategory={handleCategory} />

            {issearch && filteredProducts && <h5>SEARCH RESULTS
                <button className='clear-btn' onClick={() => setissearch(false)}>CLEAR</button>
            </h5>}
            {issearch && filteredProducts && filteredProducts.length == 0 && <h5>NO RESULT FOUND</h5>}

            {issearch && <div className="d-flex justify-content-center flex-wrap">
                {filteredProducts.map(item => (
                    <div key={item._id} className="card m-3" onClick={() => handleProduct(item._id)}>
                        <div onClick={() => handleLike(item._id)} className="icons-con">
                            <FaHeart className="icons" />
                        </div>
                        <img width="200px" height="150px" src={`http://localhost:4000/${item.pimage}`} alt={item.pname} />
                        <h3 className="m-2 price-text"> {item.price}</h3>
                        <p className="m-2"> {item.pname} | {item.category}</p>
                        <p className="m-2 text-success"> {item.pdesc}</p>
                    </div>
                ))}
            </div>}
            {!issearch && <div className="d-flex justify-content-center flex-wrap">
                {products.map(item => (
                    <div key={item._id} className="card m-3" onClick={() => handleProduct(item._id)}>
                        <div onClick={(e) => handleLike(item._id, e)} className="icons-con">
                            <FaHeart className="icons" />
                        </div>
                        <img width="350px" height="230" src={`http://localhost:4000/${item.pimage}`} alt={item.pname} />
                        <h3 className="m-2 price-text">Rs. {item.price} /-</h3>
                        <p className="m-2"> {item.pname} | {item.category}</p>
                        <p className="m-2 text-success"> {item.pdesc}</p>
                    </div>
                ))}
            </div>}
        </div>
    );
}

export default Home;
