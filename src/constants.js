

// const API_URL = "https://backend-olx-clone.onrender.com";


// // "https://backend-olx-clone.onrender.com";

const API_URL = process.env.NODE_ENV != 'development' ? 
 process.env.REACT_APP_BASE_URL :
  'http://localhost:4000';

// console.log(process.env);


export default API_URL;

