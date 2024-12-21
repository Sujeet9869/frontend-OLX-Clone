// import { useEffect, useState } from "react";
// import Header from "./Header";
// import axios from "axios";
// import API_URL from "../constants";

// function MyProfile() {

//     const [user , setuser] =useState({})


// useEffect(() => {

// let url = API_URL +'/my-profile/'  + localStorage.getItem('userId');
//     axios.get(url)
//     .then((res) => {
//         console.log(res.data);
//         if(res.data.user){
//            setuser(res.data.user)
//         }
        
//     })
//     .catch((err) => {
//         alert("Server error");
//     });

// },[])


//     return(
//         <div>
//             <Header/>
             
//              <div className="m-3 p-3" >
//             <h3 className="text-center mt-2">USER PROFILE</h3>


//             <table className="table table table-bordered">
// <thead>
//     <tr>
//         <td>UserName</td>
//         <td>Email</td>
//         <td>Mobile</td>

//     </tr>    
// </thead>

// <tbody>

//     <tr>
//         <td>{user.username}</td>
//         <td>{user.email}</td>
//         <td>{user.Mobile}</td>
//     </tr>
// </tbody>


//             </table>
// </div>
//         </div>
//     )
// }

// export default MyProfile;








import { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import API_URL from "../constants";
import "./MyProfile.css";

function MyProfile() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const url = API_URL + "/my-profile/" + localStorage.getItem("userId");
        axios
            .get(url)
            .then((res) => {
                if (res.data.user) {
                    setUser(res.data.user);
                }
            })
            .catch((err) => {
                alert("Server error");
            });
    }, []);

    return (
        <div>
            <Header />

            <div className="profile-box">
                <h3 className="profile-title">USER PROFILE</h3>
                <div className="profile-details">
                    <p><span className="label">UserName:</span> {user.username}</p>
                    <p><span className="label">Email:</span> {user.email}</p>
                    <p><span className="label">Mobile:</span> {user.Mobile}</p>
                </div>
            </div>
        </div>
    );
}

export default MyProfile;


