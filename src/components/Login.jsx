import { Link, useNavigate } from 'react-router-dom';

import { useState } from 'react';
import axios from 'axios'


const { default: Header } = require("./Header");



function Login (){

const nevigate = useNavigate();

    const [username , setUsername] = useState('');
    const [password , setPassword] = useState('');

    const handleApi = () => {
        
        const url = 'http://localhost:4000/login';
        const data = {username,password};
    
       axios.post(url,data)
       .then((res) => {
        if(res.data.message){
            // alert(res.data.message);
            if(res.data.token){
                localStorage.setItem('token' , res.data.token)
                localStorage.setItem('userId' , res.data.userId)

                nevigate("/");
            }
        }
       })
       .catch((err) => {
        alert("Server Error")
        
       })
        
      }


    return(
        <div>
            <Header/>
            <div className='m-3 p-3'>
             <h3>Welcome to Login Page</h3>
            <br />
            Username     
            <input  className='form-control' type="text"  value={username}  onChange={(e) => {
                setUsername(e.target.value) }}/>
            <br />
            Password  
            <input className='form-control' type="text" value={password} onChange={(e) => {
                setPassword(e.target.value) }}/>
            <br />
            <button className='btn btn-primary mr-3' onClick={handleApi}>LOGIN</button>
            
            <Link className='m-3' to= "/Signup">SIGNUP</Link>
            </div>
        </div>
    )

}

export default Login;