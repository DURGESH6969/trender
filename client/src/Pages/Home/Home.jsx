import { useState, useEffect } from "react";
import "./home.scss";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY)) {
      navigate("/login");
    } else {
      setCurrentUser(
        JSON.parse(localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY))
      );
      console.log("home");
    }
  }, []);

  return (
    <div className='home'>
      <h1>Home</h1>
      <h3>{currentUser?.username}</h3>
    </div>
  )
}

export default Home
