import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";


import './Header.css'
import { useState } from 'react';

function Header(props) {


    const [loc, setLoc] = useState(null);
    const [showOver, setshowOver] = useState(false)

    const nevigate = useNavigate();


    const handlelogout = () => {



        localStorage.removeItem('token');
        localStorage.removeItem('userId');

        nevigate('/login');
    }


    let locations = [
        {
            'latitude': 19.07609,
            'longitude': 72.877426,
            'PlaceName': "Mumbai , Maharashtra"
        },
        {
            'latitude': 28.6448,
            'longitude': 77.216721,
            'PlaceName': "New Delhi, Delhi"
        },
    ]



    return (
        <div className=' header-container d-flex justify-content-between' >

            <div className="header">

                <Link style={{marginLeft : '20px'}} className='links' to="/" >OlX</Link>

                <select className='locations' value={loc} onChange={(e) => {
                    localStorage.setItem('userLoc', e.target.value);
                    setLoc(e.target.value);
                }}>{

                        locations.map((item, index) => {
                            return (
                                <option value={`${item.latitude},${item.longitude}`} >
                                    {item.PlaceName}
                                </option>
                            )
                        })
                    }
                </select>

                <input className='search' type='text' placeholder='Find Mobile, Lactops Electronics and more...' value={props && props.search}
                    onChange={(e) => props.handlesearch && props.handlesearch(e.target.value)}
                />
                <button className='search-btn' onClick={() => props.handleClick && props.handleClick()}><FaSearch />
                </button>





            </div>
            <div>






                <div onClick={() => {
                    setshowOver(!showOver)
                }} style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#002f34',
                    width: '40px',
                    height: '40px',
                    color: '#fff',
                    marginRight: '30px',
                    fontSize: '14px',
                    borderRadius: '50%'
                }}>N</div>

                {showOver && <div style={{
                    minHeight: '100px',
                    width: '200px',
                    backgroundColor: '#eee',
                    position: 'absolute',
                    zIndex: '1',
                    top: '0',
                    right: '0',
                    marginTop: '50px',
                    marginRight: '50px',
                    color: 'red',
                    fontSize: '14px',
                    background: '#002f34',
                    borderRadius: '7px',

                }}>

                    <div>

                        {!!localStorage.getItem('token') &&
                            <Link  to="/add-product">
                                <button className="logout-btn">ADD PRODUCTS</button></Link>}
                    </div>

                    <div>

                        {!!localStorage.getItem('token') &&
                            <Link to="/Liked-products">
                                <button className="logout-btn">FAVOURITES</button></Link>}
                    </div>

                    <div>

                        {!!localStorage.getItem('token') &&
                            <Link to="/my-products">
                                <button className="logout-btn">MY ADS</button></Link>}
                    </div>

                    <div>

                        {!localStorage.getItem('token') ?
                            <Link to="/login">LOGIN</Link> :
                            <button className='logout-btn' onClick={handlelogout}>LOGOUT</button>
                        }

                    </div>





                </div>}



            </div>

        </div>
    )
}

export default Header;



