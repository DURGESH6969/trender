import { createContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
import UserReducer from "./UserReducer";

const initialState = {
  username: null,
  id: null,
};

export const UserContext = createContext(initialState);

export function UserContextProvider({children}) {
  // const [username, setUsername] = useState(null);
  // const [id, setId] = useState(null);

  const [state, dispatch] = useReducer(UserReducer, initialState);
  
  function logInUser(userDetails) {
    dispatch({
      type: "LOG_IN_USER",
      payload: userDetails,
    });
  }
  
  // useEffect(() => {
  //   function getUserDetails() {
  //     axios.get("/home").then(response => {
  //       // console.log(response.data);
  //       // setId(response.data.userId);
  //       // setUsername(response.data.username);
  //       const userDetails = {
  //         username: response.data.username,
  //         id: response.data.userId,
  //       };
  //       logInUser(userDetails);
  //       console.log(userDetails);
  //     });
  //   }
  //   getUserDetails();
  // }, []);
  
  
  return (
    <UserContext.Provider value={{username: state.username, id: state.id, logInUser}}>
      {children}
    </UserContext.Provider>
  )
}