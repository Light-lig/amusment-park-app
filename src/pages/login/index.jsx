import React, { useState} from "react";
import "./styles.css";
import BodyDashed from "../../layouts/BodyDashed";
import Banner from "../../components/Banner";
import validator from "validator";
import axios from  'axios';
import { useNavigate } from "react-router-dom";
import { storeUser } from '../../features/user/storeUser';
import { useDispatch } from "react-redux";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Login = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [isEmail, setIsEmail] = useState(false);
  const [showValidations, setShow]= useState(false);
  const [open, setOpen] = useState(false);
  const navigate  = useNavigate();
  const handleChange = (e) => {
    if (e.target.name === "username") {
      if (validator.isEmail(e.target.value) || e.target.value == "") {
        setIsEmail(false);
      } else {
        setShow(true);
        setIsEmail(true);
      }
    }
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const enviar = () => {
    if(user.username == '' || user.password == '' || !validator.isEmail(user.username)){
      setShow(true);
      return;
    }
    axios.post('http://localhost:8000/api/usuario/login',user)
    .then((res)=>{
      console.log(res);
      if(res.data.login){
        dispatch(storeUser(res.data.usr))
        navigate('/dashboard')
      }else{
        setOpen(true);

      }
  
    })

  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  return (
    <>
      <Banner title="Amusment Park App" />
      <BodyDashed>
        <div className="flex justify-center">
          <div className="shadow-xl p-10 bg-white max-w-xl rounded">
            <h1 className="text-4xl font-black mb-4">Login</h1>
            <div className="mb-4 relative">
              <input
                className={`input border border-gray-400 appearance-none rounded w-full px-3 py-3 pt-5 pb-2 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600 ${
                  isEmail ? "border-red-500" : null
                }`}
                id="email"
                type="text"
                name="username"
                autoFocus
                value={user.username}
                onChange={handleChange}
              />
              <label
                htmlFor="email"
                className="label absolute mb-0 -mt-2 pt-4 pl-3 leading-tighter text-gray-400 text-base mt-2 cursor-text"
              >
                Email
              </label>
              {isEmail ? (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">Opss!</span>  the email is incorrect
                </p>
              ) : null}
              {user.username == "" && showValidations ? (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">Opss!</span> This field is required!
                </p>
              ) : null}
            </div>
            <div className="mb-4 relative">
              <input
                className="input border border-gray-400 appearance-none rounded w-full px-3 py-3 pt-5 pb-2 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600"
                id="password"
                type="password"
                name="password"
                autoFocus
                onChange={handleChange}
              />
              <label
                htmlFor="password"
                className="label absolute mb-0 -mt-2 pt-4 pl-3 leading-tighter text-gray-400 text-base mt-2 cursor-text"
              >
                Password
              </label>
              {user.password == "" && showValidations ? (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                   <span className="font-medium">Opss!</span> This field is required!

                </p>
              ) : null}
            
            </div>
            <button
              className="bg-indigo-600 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded"
              onClick={enviar}
            >
              Submit
            </button>
          </div>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            Usuario no existe/usuario inactivo/contraseña incorrecta.
          </Alert>
        </Snackbar>
        </div>
      </BodyDashed>
    </>
  );
};

export default Login;