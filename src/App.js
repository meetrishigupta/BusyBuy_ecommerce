/** ------------------ IMPORTING CSS ------------------ **/
import "./index.css";
/** ------------------ IMPORTING HOOKS ------------------ **/
import CustomContex from './context';
/** ------------------ IMPORTING COMPONENTS ------------------ **/
import Navbar from "./Components/Navbar/navbar";
import SignUp from "./Pages/SignUpPage/signUp";
import SignIn from "./Pages/SignInPage/signIn";
import Home from "./Pages/Home/home";
import Cart from "./Pages/Cart/cart";
import Order from "./Pages/Orders/orders";
/** ------------------ IMPORTING ROUTER MODULES ------------------ **/
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
/** ------------------ IMPORTING TOAST MODULES ------------------ **/
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ErrorPage } from "./Pages/errorPage/errorPage";


function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navbar />,
      errorElement: <ErrorPage />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/home', element: <Home /> },
        { path: '/signup', element: <SignUp /> },
        { path: '/signin', element: <SignIn /> },
        { path: '/cart', element: <Cart /> },
        { path: '/orders', element: <Order /> }
      ]
    }
  ]);

  return (
    <CustomContex> 
      <ToastContainer/>
      <RouterProvider router={router}/>
    </CustomContex>
  );
}

export default App;
