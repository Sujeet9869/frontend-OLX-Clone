// import { useParams } from "react-router-dom"
// import { useEffect, useState } from "react";
// import axios from 'axios'
// import Header from "./Header";
// import API_URL from "../constants";
// import io from 'socket.io-client'
// let socket;



// function ProductDetails () {

//     const [product , setproduct] = useState();
    
    
    
//     const [user , setuser] = useState();
//     const [msg , setmsg] = useState('');
//     const [msgs , setmsgs] = useState([]);


// console.log(user , 'User');

    


// const p = useParams();

// useEffect(() => {

//      socket = io(API_URL);

//     socket.on('connect', ()=> {
//         console.log("Con");
        
//     })
// }, []);

// useEffect(() => {


//     socket.on('getMsg', (data) => {
//             const _data = data.filter((item , index) => {
                
//                 return item.productId == p.productId;


//             })
//             console.log(_data, "data");
            
//             setmsgs(_data)
        
//     })

// }, [p.productId]);

// const handlesend = () => {

//     const data = {username : localStorage.getItem('userName'), msg , productId : localStorage.getItem('productId') }
//     console.log(data, "Data send");
    
    
//     socket.emit('sendMsg' , data)

// setmsg('')

// }



// useEffect(() => {
//     const url = API_URL +'/get-product/' + p.productId;
//     axios.get(url)
//         .then((res) => {
//             if(res.data.product){
//                 setproduct(res.data.product)
//                 localStorage.setItem('productId', res.data.product._id)
//             }
            
//         })
//         .catch((err) => {
//             console.error("Server error:", err); // Logs the exact error in the console
//             alert("Server error. Please try again later.");
//         })
        
// }
//     , [])


//     const handlecontect = (addedBy) => {
// console.log('id' , addedBy);

// const url = API_URL +'/get-user/' + addedBy;
// axios.get(url)
//     .then((res) => {
//         if(res.data.user){
//             setuser(res.data.user)
//         }
        
//     })
//     .catch((err) => {
//         console.error("Server error:", err); // Logs the exact error in the console
//         alert("Server error. Please try again later.");
//     })

//     }

//     return( <>
        
//             <Header/>
//             PRODUCT DETAILS
//             <div>
//               {product && product.pname}

//             { product && <div className="d-flex justify-content-between flex-wrap">
//                 <div >
//                     <img width='400px' height='200px' src={API_URL +'/' + product.pimage} alt="" />
//                { product.pimage2 &&    <img width='400px' height='200px' src={API_URL + '/' + product.pimage2} alt="" />}

//                     <h6>Product Details</h6>
//                     {product.pdesc}

//                     <h3 className="m-2 price-text"> {product.price}</h3>
//                 <p className="m-2"> {product.pname} | {product.category}</p>
//                 <p className="m-2 text-success"> {product.pdesc}</p>

//                 {product.addedBy && 
//                  <button  onClick={ () => handlecontect(product.addedBy)}>
//                     SHOW CONTACT DETAILS
//                     </button> }

//                     {user && user.username &&  <h4>{user.username}</h4>}
//                     {user && user.Mobile &&  <h3>{user.Mobile}</h3>}
//                     {user && user.email &&  <h4>{user.email}</h4>}
//                 </div>
//             <div style={{marginRight : '200px'}}>
                
//                 CHATS

//     {   
                    
//                     msgs && msgs.length > 0 && 
//                     msgs.map((item , index) => {
                
//                         if(item.username === localStorage.getItem('userName')){
//                             return(
//                                <p key={item._id} style={{color : '#fff', marginRight : '100px', background : '#61dafb' , borderRadius : '5px'}}>{item.username} : {item.msg}</p> 
//                             )
//                         }

                        
//                         if(item.username !== localStorage.getItem('userName')){
//                             return(
//                                <p key={item._id} style={{color : '#fff', marginLeft : '100px', background : '#282c34' , borderRadius : '5px'}}>{item.username} : {item.msg}</p> 
//                             )
//                         }
                     
                      
                      
                  
//                     })



//                 }
              


//                 <input value={msg} onChange={(e) => setmsg(e.target.value)} className="form-control" type="text" />
//                 <button onClick={handlesend}  className="btn btn-primary" >Send</button>



//                 </div>
//               </div>}
//         </div>
//         </>
//     )
// }


// export default ProductDetails



import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import API_URL from "../constants";
import io from "socket.io-client";
import "./MyProfile.css";


let socket;

function ProductDetails() {
    const [product, setProduct] = useState();
    const [user, setUser] = useState();
    const [msg, setMsg] = useState("");
    const [msgs, setMsgs] = useState([]);

    const p = useParams();

    useEffect(() => {
        socket = io(API_URL);

        socket.on("connect", () => {
            console.log("Connected to socket");
        });

        socket.on("getMsg", (data) => {
            const filteredMessages = data.filter((item) => item.productId === p.productId);
            setMsgs(filteredMessages);
        });
    }, [p.productId]);

    const handleSend = () => {
        const data = {
            username: localStorage.getItem("userName"),
            msg,
            productId: localStorage.getItem("productId"),
        };
        socket.emit("sendMsg", data);
        setMsg("");
    };

    useEffect(() => {
        const url = `${API_URL}/get-product/${p.productId}`;
        axios
            .get(url)
            .then((res) => {
                if (res.data.product) {
                    setProduct(res.data.product);
                    localStorage.setItem("productId", res.data.product._id);
                }
            })
            .catch((err) => {
                console.error("Server error:", err);
                alert("Server error. Please try again later.");
            });
    }, [p.productId]);

    const handleContact = (addedBy) => {
        const url = `${API_URL}/get-user/${addedBy}`;
        axios
            .get(url)
            .then((res) => {
                if (res.data.user) {
                    setUser(res.data.user);
                }
            })
            .catch((err) => {
                console.error("Server error:", err);
                alert("Server error. Please try again later.");
            });
    };

    return (
        <>
            <Header />
            <div className="product-details-container">
                <h2>Product Details</h2>
                {product && (
                    <div className="product-content">
                        <div className="product-info">
                            <img
                                className="product-image"
                                src={`${API_URL}/${product.pimage}`}
                                alt="Product"
                            />
                            {product.pimage2 && (
                                <img
                                    className="product-image"
                                    src={`${API_URL}/${product.pimage2}`}
                                    alt="Product"
                                />
                            )}
                            <div className="product-description">
                                <h3>{product.pname}</h3>
                                <p className="price">Price: {product.price}</p>
                                <p>{product.pdesc}</p>
                                <p>Category: {product.category}</p>
                            </div>
                            {product.addedBy && (
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleContact(product.addedBy)}
                                >
                                    Show Contact Details
                                </button>
                            )}
                            {user && (
                                <div className="contact-details">
                                    <h4>Name: {user.username}</h4>
                                    <h4>Mobile: {user.Mobile}</h4>
                                    <h4>Email: {user.email}</h4>
                                </div>
                            )}
                        </div>

                        <div className="chat-section">
    <h3 className="chat-header">Chats</h3>
    <div className="chat-box">
        {msgs.length > 0 ? (
            msgs.map((item, index) => (
                <div
                    key={index}
                    className={`chat-bubble ${
                        item.username === localStorage.getItem("userName") ? "user" : "other"
                    }`}
                >
                    <span className="chat-username">
                        {item.username === localStorage.getItem("userName") ? "You" : item.username}:
                    </span>
                    <span className="chat-message">{item.msg}</span>
                </div>
            ))
        ) : (
            <p className="no-messages">No messages yet. Start the conversation!</p>
        )}
    </div>
    <div className="chat-input-container">
        <input
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            className="chat-input"
            type="text"
            placeholder="Type your message..."
        />
        <button onClick={handleSend} className="chat-send-btn">
            Send
        </button>
    </div>
</div>

                    </div>
                )}
            </div>
        </>
    );
}

export default ProductDetails;
