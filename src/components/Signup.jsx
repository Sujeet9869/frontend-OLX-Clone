// import { Link, useNavigate } from 'react-router-dom';

// import { useState } from 'react';
// import axios from 'axios'
// import API_URL from '../constants';

// const { default: Header } = require("./Header");
 


// function Signup (){
//     const nevigate = useNavigate();

//     const [username , setUsername] = useState('');
//     const [password , setPassword] = useState('');
//     const [email , setemail] = useState('');
//     const [Mobile , setMobile] = useState('');


    

//   const handleApi = () => {
    
//     const url = API_URL +'/signup';
//     const data = {username,password, email, Mobile};

//    axios.post(url,data)
//    .then((res) => {
//     if(res.data.message){
//         nevigate("/login");
//     }
//    })
//    .catch((err) => {
//     alert("Server Error")
    
//    })
    
//   }


    

//     return(
//         <div>
//             <Header/>
//             <div className='p-3 m-3'>
//                 <h3> Welcome to Signup Page  </h3>
//             <br />
//             Username     
//             <input className='form-control' type="text" value={username} onChange={(e) => {
//                 setUsername(e.target.value);
//             }} />
//             <br />
//             Email     
//             <input className='form-control' type="text" value={email} onChange={(e) => {
//                 setemail(e.target.value);
//             }} />
//             <br />
//             Mobile    
//             <input className='form-control' type="text" value={Mobile} onChange={(e) => {
//                 setMobile(e.target.value);
//             }} />
//             <br />
//             Password  
//             <input className='form-control'  type="text"  value={password} onChange={(e) => {
//                 setPassword(e.target.value);
//             }}/>
//             <br />
//             <button className='btn btn-primary mr-3' onClick={handleApi}>SIGNUP</button>
            
//             <Link className='m-3' to= "/login">LOGIN</Link> :
            
//             </div>
//         </div>
//     )

// }

// export default Signup;

import "./Login.css"

import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import API_URL from '../constants';
// import "./styles.css"; // Importing CSS for better styling

const { default: Header } = require("./Header");

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  const handleApi = () => {
    const url = API_URL + '/signup';
    const data = { username, password, email, mobile };

    axios
      .post(url, data)
      .then((res) => {
        if (res.data.message) {
          navigate("/login");
        }
      })
      .catch(() => {
        alert("Server Error");
      });
  };

  return (
    <div>
      <Header />
      <div className="form-container">
        <h3>Welcome to Signup Page</h3>
        <div className="form-group">
          <label>Username</label>
          <input
            className="form-control"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            className="form-control"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Mobile</label>
          <input
            className="form-control"
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            className="form-control"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={handleApi}>
          SIGNUP
        </button>
        <Link className="link" to="/login">
          LOGIN
        </Link>
      </div>
    </div>
  );
}

export default Signup;
