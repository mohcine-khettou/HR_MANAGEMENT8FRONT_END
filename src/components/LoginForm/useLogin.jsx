import { useEffect, useState } from "react";
import { login } from "../../api/auth.js";
import { useNavigate } from "react-router-dom";
import { getUserFromLocalStorage } from "../../utils/localStorage.js";

const credentials = {
  email: "",
  password: "",
};

const useLogin = () => {
  const [userCredentials, setUserCredentials] = useState(credentials);
  const [error, setError] = useState({ field: "", msg: "", isError: false });
  const navigate = useNavigate();
  const user = getUserFromLocalStorage();
  useEffect(() => {
    if (user) navigate("/");
  }, []);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserCredentials({ ...userCredentials, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userCredentials.email || !userCredentials.password) {
      setError({ ...error, isError: true });
      return;
    }
    const data = await login(userCredentials.email, userCredentials.password);
    if (data.error) {
      console.log("====================================");
      console.log(data.error);
      console.log("====================================");
    }
    if (data.user) navigate("/");
  };

  return { handleChange, handleSubmit, userCredentials };
};

export default useLogin;
