import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import "./Register.scss"

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY)) {
      console.log("refresh in register");
      navigate("/");
    }
  }, []);

  async function handleSubmit(ev) {
    ev.preventDefault();
    const {data} = await axios.post("/register", {name, username, email, password});

    // console.log(data);
    if (data.status === true) {
      localStorage.setItem(
        import.meta.env.VITE_LOCALHOST_KEY,
        JSON.stringify(data.user)
      );
      console.log("set in register");
      navigate("/");
    }
  }

  return (
    <div className="register">
      <div className="card">
          <div className="left">
            <h1>Anonymous Surf</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem perspiciatis at dolore corporis, quidem doloribus rerum, consequuntur cum ratione sit provident facere quis atque delectus ipsa. Maiores eveniet quod modi?</p>
            <span>Do you have an account?</span>
            <Link to='/login'>
            <button>Login</button>
            </Link>
          </div>
          <div className="right">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
              <input 
                name="name" 
                type="text" 
                placeholder='Name' 
                value={name} 
                onChange={(ev) => setName(ev.target.value)}
                required
              />
              <input 
                name="username" 
                type="text" 
                placeholder='Username' 
                value={username} 
                onChange={(ev) => setUsername(ev.target.value)}
                required
              />
              <input 
                name="email" 
                type="email" 
                placeholder='Email' 
                value={email} 
                onChange={(ev) => setEmail(ev.target.value)}
                required
              />
              <input 
                name="password" 
                type="password" 
                placeholder='Password' 
                value={password} 
                onChange={(ev) => setPassword(ev.target.value)}
                required
              />
              <button type="submit">Register</button>
            </form>
          </div>
        </div>
      </div>
  )
}

export default Register


