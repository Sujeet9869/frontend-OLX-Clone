   
import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate , useParams } from "react-router-dom";
import axios from "axios";
import categories from "./CategoriesList";
import API_URL from "../constants";

function EditProduct() {

const p = useParams();
console.log(p);





    const navigate = useNavigate();


        
   

    const [pname, setpname] = useState('');
    const [pdesc, setpdesc] = useState('');
    const [price, setprice] = useState('');
    const [category, setcategory] = useState('');
    const [pimage, setpimage] = useState(''); 
    const [pimage2, setpimage2] = useState('');
    const [poldimage, setoldpimage] = useState(''); 
    const [poldimage2, setoldpimage2] = useState('');


    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        const url = API_URL +'/get-product/' + p.productId;
        axios.get(url)
            .then((res) => {
                if(res.data.product){
                    console.log(res.data.product);
                    let product = res.data.product;
                    setpname(product.pname);
                    setpdesc(product.pdesc);
                    setprice(product.price);
                    setcategory(product.category);
                    setoldpimage(product.pimage);
                    setoldpimage2(product.pimage2);


                    
                }
                
            })
            .catch((err) => {
                alert("Server error. Please try again later.");
            })
            
    }
        , [])



  
    




    const handleApi = () => {

            

            const formData = new FormData();
          
            formData.append('pid', p.productId);

            formData.append('pname', pname);
            formData.append('pdesc', pdesc);
            formData.append('price', price);
            formData.append('category', category);
            formData.append('userId', localStorage.getItem('userId'));
            formData.append('pimage', pimage);
            formData.append('pimage2', pimage2);
    
    
            
    
    
            const url =  API_URL +'/edit-product';
    
            axios.post(url, formData,{
                headers : {"Content-Type" : "multipart/form-data"}
            })
                .then((res) => {
                    alert("Product added successfully!");
                    if(res.data.message){
                        alert(res.data.message);
                        navigate('/');
                    }
                })
                .catch((err) => {
                    alert("Error adding product!");
                });

        

       
    };

    return (  
        <div>
            <Header />
            <div className="p-3">
                <h1>Edit Product Here:</h1>
                <label>Product Name</label>
                <input
                    className="form-control"
                    type="text"
                    value={pname}
                    onChange={(e) => setpname(e.target.value)}
                />
                <label>Product Description</label>
                <input
                    className="form-control"
                    type="text"
                    value={pdesc}
                    onChange={(e) => setpdesc(e.target.value)}
                />
                <label>Product Price</label>
                <input
                    className="form-control"
                    type="text"
                    value={price}
                    onChange={(e) => setprice(e.target.value)}
                />
                <label>Product Category</label>
                <select
                    className="form-control"
                    value={category}
                    onChange={(e) => setcategory(e.target.value)}
                >
                    <option>Choose your Category</option>
                    <option>Bike</option>
                    <option>Mobile</option>
                    <option>Clothes</option>
                    {
                        categories && categories.length > 0 && 
                        categories.map((item , index) => {
                            return(

                                <option key={'option' + index}> {item}</option>
                            )
                        } )

                    }

                </select>
                <label>Product Image</label>
                <input   style={{width : '50%'}}
                    className="form-control"
                    type="file"
                    onChange={(e) => setpimage(e.target.files[0])}
                />

                <img src= {API_URL + '/' + poldimage}  width={300} height={100}/>   <br /><br />
                               
               <label>Product Second Image</label>

                 <input style={{width : '50%'}}
                    className="form-control"
                    type="file"
                    onChange={(e) => setpimage2(e.target.files[0])} />

           <img src= {API_URL + '/' + poldimage2}  width={300} height={100}/>   <br /><br />





                <button onClick={handleApi} className="btn btn-primary mt-3">
                    SUBMIT
                </button>
            </div>
        </div>
    );
}

export default EditProduct;
