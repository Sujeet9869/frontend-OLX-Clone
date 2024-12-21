import './index.css';

import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Addproduct from './components/Addproduct';
import LikedProducts from './components/LikedProducts';
import ProductDetails from './components/ProductDetails';
import CategoryPage from './components/CategoryPage';
import MyProducts from './components/Myproducts';
import MyProfile from './components/MyProfile';
import EditProduct from './components/EditProduct';

const router = createBrowserRouter([
  {
    path: "/",
    element: (<Home/> ),
  },
  {
    path: "/category/:catName",
    element: (<CategoryPage/> ),
  },
  {
    path: "about",
    element: <div>About</div>,
  },
  {
    path: "/login",
    element: (<Login/>),
  },
  {
    path: "/signup",
    element: (<Signup/>),
  },
  {
    path: "/add-product",
    element: (<Addproduct/>),
  },
  {
    path: "/Liked-products",
    element: (<LikedProducts/>),
  },
  {
    path: "/my-products",
    element: (<MyProducts/>),
  },
  {
    path: "/edit-product/:productId",
    element: (<EditProduct/>),
  },
  {
    path: "/product/:productId",
    element: (<ProductDetails/>),
  },
  {
    path: "/my-profile",
    element: (<MyProfile/>),
  },
  
  
  
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
); 