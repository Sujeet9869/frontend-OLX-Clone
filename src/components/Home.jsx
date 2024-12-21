

// import { useEffect, useState } from "react";
// import Header from "./Header";
// import { useNavigate} from "react-router-dom";
// import axios from "axios";
// import Categories from "./Categories";
// import { FaHeart } from "react-icons/fa";

// import './Home.css';
// import API_URL from "../constants";


// function Home() {

//     const navigate = useNavigate()

//     const [products, setproducts] = useState([]);
//     const [likedProducts, setlikedProducts] = useState([]);
//     console.log(likedProducts , "Uuuu");
    
    
//     const [refresh, setrefresh] = useState(false);

//     const [cproducts, setcproducts] = useState([]);
//     const [search, setsearch] = useState('');
//     const [issearch, setissearch] = useState(false);





//     const fetchProducts = async () => {
//         try {
//             const res = await axios.get(`${API_URL}/get-products`);
//             if (res.data.products) {
//                 setproducts(res.data.products);
//             }
//         } catch (error) {
//             alert('Server Error while fetching products.');
//         }
//     };

   



//     const fetchLikedProducts = async () => {
//         const userId = localStorage.getItem('userId');
//         if (!userId) {
//             alert("User not logged in.");
//             console.error("User ID not found in localStorage");
//             return;
//         }
    
//         const url = `${API_URL}/Liked-products`;
    
//         try {
//             const res = await axios.post(url, { userId });
//             if (res.data && res.data.products) {
//                 setlikedProducts(res.data.products);
//             } else {
//                 console.log("No liked products found.");
//             }
//         } catch (error) {
//             console.error("Error fetching liked products:", error.response || error);
//             alert("Server Error while fetching liked products.");
//         }
//     };
    


    


//     useEffect(() => {
//         fetchProducts();
//         fetchLikedProducts();
//     }, [refresh]);



//     const handlesearch = (value) => {
//         setsearch(value);
//     }

//     const handleClick = () => {

//         const url = API_URL + `/search?search=` + search + '&loc=' + localStorage.getItem('userLoc');
//         axios.get(url)
//             .then((res) => {
//                 setcproducts(res.data.products);
//                 setissearch(true);
//             })
//             .catch((err) => {
//                 alert('Server Err.')
//             })

       

//     }

    



    



//     const handleCategory = (value) => {
//         let filteredProducts = products.filter((item, index) => {
//             if (item.category == value) {
//                 return item;
//             }
//         })
//         setcproducts(filteredProducts)
//     }

//     const handleLike = (productId, e) => {
//         e.stopPropagation();
//         let userId = localStorage.getItem('userId');

//         if (!userId) {
//             alert('Please Login first.')
//             return;
//         }

//         const url = API_URL +'/like-products';
//         const data = { userId, productId }
//         axios.post(url, data)
//             .then((res) => {
//                 if (res.data.message) {
//                     // alert('Liked.')
//                     setrefresh(!refresh)
//                 }
//             })
//             .catch((err) => {
//                 alert('Server Err.')
//             })

//     }



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


//     const handleProduct = (id) => {
//         navigate('/product/' + id)
//     }


//     return (
//         <div>
//             <Header search={search} handlesearch={handlesearch} handleClick={handleClick} />
//             <Categories handleCategory={handleCategory} />
//             {issearch && cproducts &&
//                 <h5> SEARCH RESULTS
//                     <button className="clear-btn" onClick={() => setissearch(false)}> CLEAR </button>
//                 </h5>}

//             {issearch && cproducts && cproducts.length == 0 && <h5> No Results Found </h5>}
//             {issearch && <div className="d-flex justify-content-center flex-wrap">
//                 {cproducts && products.length > 0 &&
//                     cproducts.map((item, index) => {

//                         return (
//                             <div key={item._id} className="card m-3 ">
//                                 <div onClick={() => handleLike(item._id)} className="icons-con">
//                                     <FaHeart className="icons" />
//                                 </div>
//                                 <img width="300px" height="200px" src={ API_URL +`/${item.pimage}`} />

//                                 <p className="m-2"> {item.pname}  | {item.category} </p>
//                                 <h3 className="m-2 text-danger"> {item.price} </h3>
//                                 <p className="m-2 text-success"> {item.pdesc} </p>
//                             </div>
//                         )

//                     })}
//             </div>}

//             {!issearch && <div className="d-flex justify-content-center flex-wrap">
//                 {products && products.length > 0 &&
//                     products.map((item, index) => {

//                         return (
//                             <div onClick={() => handleProduct(item._id)} key={item._id} className="card m-3">
//                                 <div  className="icons-con">
//                                     {
//                                         likedProducts.find((likedItem) => likedItem._id === item._id ) ? 
//                                         <FaHeart onClick={(e) => handleDisLike(item._id, e)} className="red-icons" /> :
//                                         <FaHeart onClick={(e) => handleLike(item._id, e)} className="icons" />


//                                     }
//                                 </div>
//                                 <img width="300px" height="250px" src={ API_URL +`/${item.pimage}`} />
//                                 <h3 className="m-2 price-text"> Rs. {item.price} /- </h3>
//                                 <p className="m-2"> {item.pname}  | {item.category} </p>
//                                 <p className="m-2 text-success"> {item.pdesc} </p>
//                             </div>
//                         )

//                     })}
//             </div>}

//         </div>
//     )
// }

// export default Home;



import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Categories from "./Categories";
import { FaHeart } from "react-icons/fa";

import "./Home.css";
import API_URL from "../constants";

function Home() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [likedProducts, setLikedProducts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [cProducts, setCProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/get-products`);
      if (res.data.products) {
        setProducts(res.data.products);
      }
    } catch (error) {
      alert("Server Error while fetching products.");
    }
  };

  const fetchLikedProducts = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User not logged in.");
      return;
    }

    const url = `${API_URL}/Liked-products`;
    try {
      const res = await axios.post(url, { userId });
      if (res.data && res.data.products) {
        setLikedProducts(res.data.products);
      }
    } catch (error) {
      alert("Server Error while fetching liked products.");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchLikedProducts();
  }, [refresh]);

  const handleSearch = (value) => {
    setSearch(value);
  };

  const handleClick = () => {
    const url = `${API_URL}/search?search=${search}&loc=${localStorage.getItem("userLoc")}`;
    axios
      .get(url)
      .then((res) => {
        setCProducts(res.data.products);
        setIsSearch(true);
      })
      .catch(() => {
        alert("Server Error.");
      });
  };

  const handleCategory = (value) => {
    const filteredProducts = products.filter((item) => item.category === value);
    setCProducts(filteredProducts);
  };

  const handleLike = (productId, e) => {
    e.stopPropagation();
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please Login first.");
      return;
    }

    const url = `${API_URL}/like-products`;
    axios
      .post(url, { userId, productId })
      .then(() => {
        setRefresh(!refresh);
      })
      .catch(() => {
        alert("Server Error.");
      });
  };

  const handleDislike = (productId, e) => {
    e.stopPropagation();
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please Login first.");
      return;
    }

    const url = `${API_URL}/dislike-products`;
    axios
      .post(url, { userId, productId })
      .then(() => {
        setRefresh(!refresh);
      })
      .catch(() => {
        alert("Server Error.");
      });
  };

  const handleProduct = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div>
      <Header search={search} handlesearch={handleSearch} handleClick={handleClick} />
      <Categories handleCategory={handleCategory} />
      {isSearch && cProducts && (
        <h5>
          SEARCH RESULTS
          <button className="clear-btn" onClick={() => setIsSearch(false)}>
            CLEAR
          </button>
        </h5>
      )}
      {isSearch && cProducts.length === 0 && <h5>No Results Found</h5>}
      <div className="product-container">
        {(isSearch ? cProducts : products).map((item) => (
          <div
            key={item._id}
            className="card"
            onClick={() => handleProduct(item._id)}
          >
            <div className="icons-con">
              {likedProducts.find((likedItem) => likedItem._id === item._id) ? (
                <FaHeart
                  onClick={(e) => handleDislike(item._id, e)}
                  className="red-icons"
                />
              ) : (
                <FaHeart
                  onClick={(e) => handleLike(item._id, e)}
                  className="icons"
                />
              )}
            </div>
            <img src={`${API_URL}/${item.pimage}`} alt={item.pname} />
            <h3 className="price-text">Rs. {item.price} /-</h3>
            <p>{item.pname} | {item.category}</p>
            <p className="text-success">{item.pdesc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;


