import { useState } from "react";

export default function useLocalStorage() {
  
  const getData = (key) => {
    const dataString = sessionStorage.getItem(key);
    if(!dataString) return;
    return dataString
  };

  const [userData, setUserData] = useState(getData("name"));
  const [tokenData, setTokenData] = useState(getData("token"));
 
  const saveData = (key, value) => {
    console.log(JSON.stringify(value))
    sessionStorage.setItem(key, JSON.stringify(value));

    key === "name" ? setUserData((prevData) => (prevData = value)) :
    setTokenData((prevData) => (prevData = value));
  };

  return {
    setData: saveData,
    userData,
    tokenData
  };
}
