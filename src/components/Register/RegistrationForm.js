import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../_base/Button";
import TextInputGroup from "../_base/TextInputGroup";
import { LOGIN } from "../../constants/RouteConstants";


const RegistrationForm = ({
  userDetails,
  onTextChange,
  registerUser,
  fetching,
  errors,
}) => {
  const { email, password_confirmation, name, password } = userDetails;

  const navigate = useNavigate();

  return (
    <form>
      <TextInputGroup
        type="text"
        value={name}
        onTextChange={onTextChange}
        placeholder={`Name`}
        name={`name`}
        errors={errors}
      />
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
      <TextInputGroup
        type="password"
        value={password_confirmation}
        onTextChange={onTextChange}
        placeholder={`Confirm password`}
        name={`password_confirmation`}
        errors={errors}
      />
      <div className="pt-1 mb-4">
        <Button
          className={`btn btn-primary btn-sm btn-block`}
          text={`Register`}
          cb={() => registerUser()}
          disabled={fetching}
        />
        <Button
          className={`btn btn-primary btn-sm btn-block ml`}
          text={`Back to login`}
          cb={() => navigate(LOGIN)}
          disabled={fetching}
        />
      </div>
    </form>
  );
};

export default RegistrationForm;
