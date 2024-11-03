import { useParams } from "react-router-dom"
import { useEffect, useReducer, useState } from "react";
import axios from 'axios'
import Header from "./Header";




function ProductDetails () {

    const [product , setproduct] = useState();
    const [user , setuser] = useState();

    console.log(user, "Userrr");
    


const p = useParams();
console.log(p.productId);

useEffect(() => {
    const url = 'http://localhost:4000/get-product/' + p.productId;
    axios.get(url)
        .then((res) => {
            if(res.data.product){
                setproduct(res.data.product)
            }
            
        })
        .catch((err) => {
            console.error("Server error:", err); // Logs the exact error in the console
            alert("Server error. Please try again later.");
        })
        
}
    , [])


    const handlecontect = (addedBy) => {
console.log('id' , addedBy);

const url = 'http://localhost:4000/get-user/' + addedBy;
axios.get(url)
    .then((res) => {
        if(res.data.user){
            setuser(res.data.user)
        }
        
    })
    .catch((err) => {
        console.error("Server error:", err); // Logs the exact error in the console
        alert("Server error. Please try again later.");
    })

    }

    return( <>
        
            <Header/>
            PRODUCT DETAILS
            <div>
              {product && product.pname}

            { product && <div className="d-flex justify-content-between flex-wrap">
                <div>
                    <img width='400px' height='200px' src={'http://localhost:4000/' + product.pimage} alt="" />
               { product.pimage2 &&    <img width='400px' height='200px' src={'http://localhost:4000/' + product.pimage2} alt="" />}

                    <h6>Product Details</h6>
                    {product.pdesc}
                </div>
                <div>
                <h3 className="m-2 price-text"> {product.price}</h3>
                <p className="m-2"> {product.pname} | {product.category}</p>
                <p className="m-2 text-success"> {product.pdesc}</p>

                {product.addedBy && 
                 <button onClick={ () => handlecontect(product.addedBy)}>
                    SHOW CONTACT DETAILS
                    </button> }

                    {user && user.username &&  <h4>{user.username}</h4>}
                    {user && user.Mobile &&  <h3>{user.Mobile}</h3>}
                    {user && user.email &&  <h4>{user.email}</h4>}



                </div>
              </div>}
        </div>
        </>
    )
}


export default ProductDetails