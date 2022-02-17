import axios from "axios";
import { BASE_URL, IP_LIST } from "../constants/ApiConstants";

const url = `${BASE_URL}/${IP_LIST}`;
const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiN2IxMDY3NWY2NTI0ZTAzYTJhYjUwYjNmMmE3MDJkNzhlMGEyZmVlY2JjMjFjNWFjY2I2OTVlNjUyOWU0N2RjMWYzNDQwNWI1ODU2YmQ0NmYiLCJpYXQiOjE2NDQ5ODY3NTYuODI3Nzc5LCJuYmYiOjE2NDQ5ODY3NTYuODI3NzgsImV4cCI6MTY3NjUyMjc1Ni44MjEyNjUsInN1YiI6IjIiLCJzY29wZXMiOltdfQ.TDeJnZUQT0cRmIdaSkd5IJc8s-gT6QOC3BszyjFv0mhro-ZQbfxnY8Cx6mzxYZxR5d9ARqx5jVssFBqk7er4angU_VQwTsMLzlLL8kaJsFlai8RpQhQuHVDDHEOBFkNEZVziPDL7kAovB2bLhul2_LrIPpHqdhgnH3tKh50QH-gxcKAiyRoJBV-vvWGpWho9pgcuZTUTKBLih5lx4LTmkABoswx8SOrUVMvgWpFaD1wt7ktn6o1UID7GpN9lIa-_89T5AhHgaG4NBLJdZBXmPA39qZwN5SthO73PRy3Lsr446-2M5uFK-MPnh5TasjhBRylHK05y9hPpaWQD-COHQ3XUIrsCnYmGcsOb9HRneyYNyUQFjTbteOzB37uhRtWUuo7X1gbwCIWUG-TPx5e71vEvM5Ea6BOsOV0TymuSnUis27qHUDPAd7MF5yPdy75l0aAOfYqsLeELR_thjlpw4rpR8nRvHjJxEHT39qYzgvqOugoaLq-z4U3G52dJyjSway2gOqgimMXGHsjycC0m6Suet5zdzfwlBCbm5VGsOHC3Sv-z8DqUA1PmVQ0SQ-1z9ZIS589Um06cUEFO5rqBb8wD5w6YAOkr7bb8lKpn_7nRNS1AS2CK7pXI7LH4B5CunRuY8tcFSDJFEpJDLS21w5twIkJlYbZZzHywhl3ZtPY";

export const getIPAddresses = async () => {
  const { data: response } = await axios.get(url, {
    headers: {
      Authorization: "Bearer " + token, //the token is a variable which holds the token
    },
  });
  return response;
};
