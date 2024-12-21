



// import { useEffect, useState } from "react";
// import Header from "./Header";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import Categories from "./Categories";
// import { FaHeart } from "react-icons/fa";
// import './Home.css';
// import API_URL from "../constants";

// function MyProducts() {
//     const [products, setProducts] = useState([]);
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [refresh, setrefresh] = useState(false);

//     const [search, setSearch] = useState('');




//     useEffect(() => {
//         const url = API_URL +'/my-products';
//         const data = { userId: localStorage.getItem('userId') };
        
//         axios.post(url, data)
//             .then((res) => {
//                 if (res.data && res.data.products) {
//                     setProducts(res.data.products);
//                     setFilteredProducts(res.data.products);
//                 } else {
//                     console.log("No liked products found");
//                 }
//             })
//             .catch((err) => {
//                 console.error("Error fetching products:", err);
//                 alert("Server error");
//             });
//     }, [refresh]);
    

//     const handleSearch = (value) => {
//         setSearch(value);
//         const filtered = products.filter(item => 
//             item.pname.toLowerCase().includes(value.toLowerCase()) ||
//             item.pdesc.toLowerCase().includes(value.toLowerCase()) ||
//             item.category.toLowerCase().includes(value.toLowerCase())
//         );
//         setFilteredProducts(filtered);
//     };

//     const handleLike = (productId) => {
//         const userId = localStorage.getItem('userId');
//         const url = API_URL +'/like-products';
//         const data = { userId, productId };

//         axios.post(url, data)
//             .then((res) => {
//                 if (res.data.message) {
//                     alert('Liked');
//                 }
//             })
//             .catch((err) => {
//                 alert("Server error");
//             });
//     };


// const handledelete = (pid) => {

//     if (!localStorage.getItem('userId')){
//         alert("Please Login First")
//         return;
//     }

//     const url = API_URL +'/delete-product';



//     const data = {
//         pid,
//         userId : localStorage.getItem('userId')
//     }

//     axios.post(url, data)
//     .then((res) => {
//         if (res.data.message) {
//             alert('Delete Success');
//             setrefresh(!refresh)
//         }
//     })
//     .catch((err) => {
//         alert("Server error");
//     });
    
// }

//     return (
//         <div>
//             <Header search={search} handleSearch={handleSearch} />
//             <Categories handleCategory={setFilteredProducts} />

//             <div className="d-flex justify-content-center flex-wrap">
//                 {filteredProducts.map(item => (
//                     <div key={item._id} className="card m-3">
//                         <div onClick={() => handleLike(item._id)} className="icons-con">
//                             <FaHeart className="icons" />
//                         </div>
//                         <img width="500px" height="300" src={API_URL +`/${item.pimage}`} />
//                         <p className="m-2"> {item.pname} | {item.category}</p>
//                         <h3 className="m-2 text-danger"> {item.price}</h3>
//                         <p className="m-2 text-success"> {item.pdesc}</p>
//                         <p className="m-2 text-success"> 
//                             <Link to={`/edit-product/${item._id}`} > Edit Products</Link>
//                         </p>

//                         <button onClick={() => handledelete(item._id)}>Delete Product</button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default MyProducts;



import { useEffect, useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import axios from "axios";
import Categories from "./Categories";
import { FaHeart } from "react-icons/fa";
import "./Home.css";
import API_URL from "../constants";

function MyProducts() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const url = API_URL + "/my-products";
        const data = { userId: localStorage.getItem("userId") };

        axios
            .post(url, data)
            .then((res) => {
                if (res.data && res.data.products) {
                    setProducts(res.data.products);
                    setFilteredProducts(res.data.products);
                } else {
                    console.log("No products found");
                }
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
                alert("Server error");
            });
    }, [refresh]);

    const handleSearch = (value) => {
        setSearch(value);
        const filtered = products.filter(
            (item) =>
                item.pname.toLowerCase().includes(value.toLowerCase()) ||
                item.pdesc.toLowerCase().includes(value.toLowerCase()) ||
                item.category.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    const handleLike = (productId) => {
        const userId = localStorage.getItem("userId");
        const url = API_URL + "/like-products";
        const data = { userId, productId };

        axios
            .post(url, data)
            .then((res) => {
                if (res.data.message) {
                    alert("Liked");
                }
            })
            .catch((err) => {
                alert("Server error");
            });
    };

    const handleDelete = (pid) => {
        if (!localStorage.getItem("userId")) {
            alert("Please Login First");
            return;
        }

        const url = API_URL + "/delete-product";
        const data = {
            pid,
            userId: localStorage.getItem("userId"),
        };

        axios
            .post(url, data)
            .then((res) => {
                if (res.data.message) {
                    alert("Delete Success");
                    setRefresh(!refresh);
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

            <div className="products-container">
                {filteredProducts.map((item) => (
                    <div key={item._id} className="card">
                        <div className="icons-con" onClick={() => handleLike(item._id)}>
                            <FaHeart className="icons" />
                        </div>
                        <img
                            className="product-image"
                            src={API_URL + `/${item.pimage}`}
                            alt={item.pname}
                        />
                        <p className="product-name">
                            {item.pname} | {item.category}
                        </p>
                        <h3 className="product-price">{item.price}</h3>
                        <p className="product-desc">{item.pdesc}</p>
                        <p className="edit-link">
                            <Link to={`/edit-product/${item._id}`}>Edit Product</Link>
                        </p>
                        <button className="delete-btn" onClick={() => handleDelete(item._id)}>
                            Delete Product
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyProducts;
