import useLogin from "./useLogin";
import AuthenticationInput from "./AuthenticationInput";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginForm = () => {
  const { handleChange, handleSubmit, userCredentials } = useLogin();

  return (
    <div className="form-box">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <AuthenticationInput
          name={"email"}
          type={"email"}
          value={userCredentials.email}
          onChange={handleChange}
        />
        <AuthenticationInput
          name={"password"}
          type={"password"}
          value={userCredentials.password}
          onChange={handleChange}
        />
        <div className="input-box sign-up">
          <button type="submit" className="btn btn-sign-up">
            login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
