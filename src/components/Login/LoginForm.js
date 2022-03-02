import React, { useContext } from "react";
import { REGISTER } from "../../constants/ApiConstants";
import { useNavigate } from "react-router-dom";
import Button from "../_base/Button";
import TextInputGroup from "../_base/TextInputGroup";
 
const LoginForm = ({ userCreds, onTextChange, userLogin, fetching, errors }) => {
  
  const { email, password } = userCreds;

  const navigate = useNavigate();

  return (
    <form>
      <TextInputGroup
        type="email"
        value={email}
        onTextChange={onTextChange}
        placeholder={`Email`}
        name={`email`}
        errors={errors}
      />
      <TextInputGroup
        type="password"
        value={password}
        onTextChange={onTextChange}
        placeholder={`Password`}
        name={`password`}
        errors={errors}
      />
      <div className="pt-1 mb-4">
        <Button
          className={`btn btn-primary btn-sm btn-block`}
          text={`Login`}
          cb={userLogin}
          disabled={fetching}
        />
        <Button
          className={`btn btn-primary btn-sm btn-block ml`}
          text={`Register`}
          cb={() => navigate(REGISTER)}
          disabled={fetching}
        />
      </div>
    </form>
  );
};

export default LoginForm;
