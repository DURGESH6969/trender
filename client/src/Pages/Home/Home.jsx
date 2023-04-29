import { useContext } from "react";
import "./home.scss";
import { UserContext } from "../../components/UserContext";

const Home = () => {
  const {username} = useContext(UserContext);
  return (
    <div className='home'>
      <h1>Home</h1>
      <h3>{username}</h3>
    </div>
  )
}

export default Home
