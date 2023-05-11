import { Link, useNavigate } from 'react-router-dom';
import './Login.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {ToastContainer, toast} from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const toastOptions = {
    postition: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  }

  useEffect(() => {
    if (localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY)) {
      navigate("/");
      console.log("login");
    } else {
      console.log("not found");
    }
  }, []);

  const handleChange = (ev) => {
    setValues({...values, [ev.target.name]: ev.target.value});
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const {username, password} = values;
    const {data} = await axios.post("/login", {username, password});
    
    if (data.status === false) {
      toast.error(data.msg, toastOptions);
    }
    if (data.status === true) {
      localStorage.setItem(
        import.meta.env.VITE_LOCALHOST_KEY,
        JSON.stringify(data.user)
      );
      console.log("set in login");
      navigate("/");
    }
  }

  return (
    <div className='login'>
      <ToastContainer 
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="card">
          <div className="left">
            <h1>Hello Peeps!</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem perspiciatis at dolore corporis, quidem doloribus rerum, consequuntur cum ratione sit provident facere quis atque delectus ipsa. Maiores eveniet quod modi?</p>
            <span>Don't have a account?</span>
            <Link to='/register'>
            <button>Register</button>
            </Link>
          </div>
          <div className="right">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} >
              <input 
                name="username" 
                type="text" 
                placeholder='Username'
                value={values.username} 
                onChange={handleChange}
                required 
              />
              <input 
                name="password" 
                type="password" 
                placeholder='Password' 
                value={values.password}
                onChange={handleChange}
                required
              />
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>

  )
}

export default Login
