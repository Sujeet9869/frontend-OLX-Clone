



import { useEffect, useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import axios from "axios";
import Categories from "./Categories";
import { FaHeart } from "react-icons/fa";
import './Home.css';

function MyProducts() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [search, setSearch] = useState('');

    // useEffect(() => {
    //     const url = 'http://localhost:4000/Liked-products';
    //     let data = {userId : localStorage.getItem('userId')}
        
    //     axios.post(url, data)
    //         .then((res) => {
    //             if (res.data && res.data.users) {
    //                 const likedProducts = res.data.users.flatMap(user => user.likedProducts);
    //                 setProducts(likedProducts);
    //                 setFilteredProducts(likedProducts);
    //             } else {
    //                 console.log("No liked products found");
    //             }
    //         })
    //         .catch((err) => {
    //             console.error("Error fetching products:", err);
    //             alert("Server error");
    //         });
    // }, []);


    useEffect(() => {
        const url = 'http://localhost:4000/my-products';
        const data = { userId: localStorage.getItem('userId') };
        
        axios.post(url, data)
            .then((res) => {
                if (res.data && res.data.products) {
                    setProducts(res.data.products);
                    setFilteredProducts(res.data.products);
                } else {
                    console.log("No liked products found");
                }
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
                alert("Server error");
            });
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
        const url = 'http://localhost:4000/like-products';
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

            <div className="d-flex justify-content-center flex-wrap">
                {filteredProducts.map(item => (
                    <div key={item._id} className="card m-3">
                        <div onClick={() => handleLike(item._id)} className="icons-con">
                            <FaHeart className="icons" />
                        </div>
                        <img width="500px" height="300" src={`http://localhost:4000/${item.pimage}`} />
                        <p className="m-2"> {item.pname} | {item.category}</p>
                        <h3 className="m-2 text-danger"> {item.price}</h3>
                        <p className="m-2 text-success"> {item.pdesc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyProducts;
