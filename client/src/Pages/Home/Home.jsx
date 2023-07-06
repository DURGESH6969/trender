import { useState, useEffect } from "react";
import "./home.scss";
import { useNavigate } from "react-router-dom";
import Post from "../../components/posts/Post";
const Home = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    console.log("at home");
    if (!localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY)) {
      navigate("/login");
    }
  }, []);

  return (
    <div className='home'>
      <h1>Home</h1> 
      <Post title="      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus ducimus error non beatae dolore id?
" content="This is the content of the first post."/>
      <h3>{currentUser?.username}</h3>
    </div>
  )
}

export default Home
