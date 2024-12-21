

// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import Header from "./Header";
// import axios from "axios";
// import Categories from "./Categories";
// import { FaHeart } from "react-icons/fa";
// import './Home.css';
// import API_URL from '../constants';

// function CategoryPage() {
//     const navigate = useNavigate();
 
//     const param = useParams();
//     console.log(param);
    

    
//     const [products, setProducts] = useState([]);
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [likedProducts, setlikedProducts] = useState([]);
//     console.log(likedProducts);
    
//     const [refresh, setrefresh] = useState(false);
//     const [search, setSearch] = useState('');
//     const [issearch, setissearch] = useState(false);


//     useEffect(() => {
//         const url = API_URL +'/get-products?catName=' + param.catName;
//         axios.get(url)
//             .then(res => setProducts(res.data.products))
//             .catch(err => console.error("Server error:", err));

//             const url2 =  API_URL + '/Liked-products'
//             const data = { userId: localStorage.getItem('userId') };


//             axios.post( url2,data)

//             .then((res) => {
//                 if (res.data.products) {
//                     setlikedProducts(res.data.products);
//                 }
//             })
//             .catch((err) => {
//                 alert('Server Err.')
//             })


//     }, [param, refresh]);

//     const handleSearch = (value) => {
//         setSearch(value);
//     };

//     const handleClick = () => {
//         const url =  API_URL + `/search?search=` + search + '&loc=' + localStorage.getItem('userLoc');


//         axios.get(url)
//             .then((res) => {
//                 if (res.data.products) {
//                     setFilteredProducts(res.data.products);
//                     setissearch(true);
//                 }
//             })
//             .catch((err) => {
//                 alert("Server error");
//                 console.error(err);
//             });
//     };

//     const handleDisLike = (productId, e) => {
//         e.stopPropagation();
//         let userId = localStorage.getItem('userId');

//         if (!userId) {
//             alert('Please Login first.')
//             return;
//         }

//         const url = API_URL +'/dislike-products';
//         const data = { userId, productId }
//         axios.post(url, data)
//             .then((res) => {
//                 if (res.data.message) {
//                     // alert('DisLiked.')
//                     setrefresh(!refresh)
//                 }
//             })
//             .catch((err) => {
//                 alert('Server Err.')
//             })

//     }


//     const handleCategory = (category) => {
//         const filtered = products.filter(item => item.category === category);
//         setFilteredProducts(filtered);
//     };

//     const handleLike = (productId,e) => {
//         e.stopPropagation();

//         const userId = localStorage.getItem('userId');
//         axios.post( API_URL + '/like-products', { userId, productId })
//             .then(() =>  setrefresh(!refresh) )
//             .catch(() => alert("Server error"));
//     };

//     const handleProduct = (id) => {
//         navigate(`/product/${id}`);
//     };

//     return (
//         <div>
//             <Header search={search} handlesearch={handleSearch} handleClick={handleClick} />
//             <Categories handleCategory={handleCategory} />

//           {issearch && filteredProducts &&  <h5>SEARCH RESULTS
//             <button className='clear-btn' onClick={() => setissearch(false)}>CLEAR</button>
//             </h5>}
//           {issearch && filteredProducts && filteredProducts.length==0 && <h5>NO RESULT FOUND</h5>}

//           { issearch &&  <div className="d-flex justify-content-center flex-wrap">
//                 {filteredProducts.map(item => (
//                     <div key={item._id} className="card m-3" onClick={() => handleProduct(item._id)}>
//                         <div onClick={() => handleLike(item._id)} className="icons-con">
//                             <FaHeart className="icons" />
//                         </div>
//                         <img width="200px" height="150px" src={ API_URL + `/${item.pimage}`} alt={item.pname} />
//                         <h3 className="m-2 price-text"> {item.price}</h3>
//                         <p className="m-2"> {item.pname} | {item.category}</p>
//                         <p className="m-2 text-success"> {item.pdesc}</p>
//                     </div>
//                 ))}
//             </div> }
//            { !issearch && <div className="d-flex justify-content-center flex-wrap">
//                 {products.map(item => (
//                     <div key={item._id} className="card m-3" onClick={() => handleProduct(item._id)}>
//                         <div  className="icons-con">

//                         {
//                                         likedProducts.find((likedItem) => likedItem._id === item._id ) ? 
//                                         <FaHeart onClick={(e) => handleDisLike(item._id, e)} className="red-icons" /> :
//                                         <FaHeart onClick={(e) => handleLike(item._id, e)} className="icons" />


//                                     }


//                         </div>
//                         <img width="350px" height="230" src={ API_URL +`/${item.pimage}`} alt={item.pname} />
//                         <h3 className="m-2 price-text">Rs. {item.price} /-</h3>
//                         <p className="m-2"> {item.pname} | {item.category}</p>
//                         <p className="m-2 text-success"> {item.pdesc}</p>
//                     </div>
//                 ))}
//             </div>}
//         </div>
//     );
// }

// export default CategoryPage;




import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from "./Header";
import axios from "axios";
import Categories from "./Categories";
import { FaHeart } from "react-icons/fa";
import './CategoryPage.css';
import API_URL from '../constants';

function CategoryPage() {
    const navigate = useNavigate();
    const param = useParams();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [likedProducts, setLikedProducts] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [search, setSearch] = useState('');
    const [isSearch, setIsSearch] = useState(false);

    useEffect(() => {
        const url = `${API_URL}/get-products?catName=${param.catName}`;
        axios.get(url)
            .then(res => setProducts(res.data.products))
            .catch(err => console.error("Server error:", err));

        const likedUrl = `${API_URL}/Liked-products`;
        const data = { userId: localStorage.getItem('userId') };

        axios.post(likedUrl, data)
            .then(res => setLikedProducts(res.data.products || []))
            .catch(() => alert('Server Error'));
    }, [param, refresh]);

    const handleSearch = (value) => setSearch(value);

    const handleClick = () => {
        const url = `${API_URL}/search?search=${search}&loc=${localStorage.getItem('userLoc')}`;
        axios.get(url)
            .then(res => {
                setFilteredProducts(res.data.products || []);
                setIsSearch(true);
            })
            .catch(() => alert("Server error"));
    };

    const handleLike = (productId, e) => {
        e.stopPropagation();
        const userId = localStorage.getItem('userId');
        if (!userId) {
            alert('Please Login first.');
            return;
        }

        axios.post(`${API_URL}/like-products`, { userId, productId })
            .then(() => setRefresh(!refresh))
            .catch(() => alert("Server error"));
    };

    const handleDislike = (productId, e) => {
        e.stopPropagation();
        const userId = localStorage.getItem('userId');
        axios.post(`${API_URL}/dislike-products`, { userId, productId })
            .then(() => setRefresh(!refresh))
            .catch(() => alert('Server Error'));
    };

    const handleProduct = (id) => navigate(`/product/${id}`);

    return (
        <div>
            <Header search={search} handlesearch={handleSearch} handleClick={handleClick} />
            <Categories />
            {isSearch && (
                <div className="search-results">
                    <h5>Search Results
                        <button className="clear-btn" onClick={() => setIsSearch(false)}>Clear</button>
                    </h5>
                    {filteredProducts.length === 0 && <p>No Results Found</p>}
                </div>
            )}
            <div className="products-container">
                {(isSearch ? filteredProducts : products).map(item => (
                    <div key={item._id} className="product-card" onClick={() => handleProduct(item._id)}>
                        <div className="like-container">
                            {likedProducts.find(likedItem => likedItem._id === item._id)
                                ? <FaHeart onClick={(e) => handleDislike(item._id, e)} className="like-icon liked" />
                                : <FaHeart onClick={(e) => handleLike(item._id, e)} className="like-icon" />}
                        </div>
                        <img src={`${API_URL}/${item.pimage}`} alt={item.pname} />
                        <h3>Rs. {item.price} /-</h3>
                        <p>{item.pname} | {item.category}</p>
                        <p className="product-desc">{item.pdesc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryPage;
