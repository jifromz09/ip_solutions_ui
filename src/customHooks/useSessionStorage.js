import { useState } from "react";

export default function useSessionStorage() {
  
  const getData = (key) => {
    const dataString = sessionStorage.getItem(key);
    if(!dataString) return;
    return dataString
  };

  const [userData, setUserData] = useState(getData("name"));
  const [tokenData, setTokenData] = useState(getData("access_token"));
 
  const saveData = (key, value) => {
    console.log(value);
    sessionStorage.setItem(key, value);

    key === "name" ? setUserData((prevData) => (prevData = value)) :
    setTokenData((prevData) => (prevData = value));
  };

  const clearCredentials = () => {
    sessionStorage.clear();
  }

  return {
    setData: saveData,
    userData,
    tokenData,
    clearCredentials: clearCredentials
  };
}
