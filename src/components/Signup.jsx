import { Link } from 'react-router-dom';

import { useState } from 'react';
import axios from 'axios'

const { default: Header } = require("./Header");
 


function Signup (){

    const [username , setUsername] = useState('');
    const [password , setPassword] = useState('');
    const [email , setemail] = useState('');
    const [Mobile , setMobile] = useState('');


    

  const handleApi = () => {
    
    const url = 'http://localhost:4000/signup';
    const data = {username,password, email, Mobile};

   axios.post(url,data)
   .then((res) => {
    if(res.data.message){
        alert(res.data.message);
    }
   })
   .catch((err) => {
    alert("Server Error")
    
   })
    
  }


    

    return(
        <div>
            <Header/>
            <div className='p-3 m-3'>
                <h3> Welcome to Signup Page  </h3>
            <br />
            Username     
            <input className='form-control' type="text" value={username} onChange={(e) => {
                setUsername(e.target.value);
            }} />
            <br />
            Email     
            <input className='form-control' type="text" value={email} onChange={(e) => {
                setemail(e.target.value);
            }} />
            <br />
            Mobile    
            <input className='form-control' type="text" value={Mobile} onChange={(e) => {
                setMobile(e.target.value);
            }} />
            <br />
            Password  
            <input className='form-control'  type="text"  value={password} onChange={(e) => {
                setPassword(e.target.value);
            }}/>
            <br />
            <button className='btn btn-primary mr-3' onClick={handleApi}>SIGNUP</button>
            
            <Link className='m-3' to= "/login">LOGIN</Link> :
            
            </div>
        </div>
    )

}

export default Signup;


