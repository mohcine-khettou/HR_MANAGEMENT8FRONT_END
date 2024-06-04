import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context";

const credentials = {
  email: "",
  password: "",
};

const useLogin = () => {
  const [userCredentials, setUserCredentials] = useState(credentials);
  const [error, setError] = useState({ field: "", msg: "", isError: false });
  const navigate = useNavigate();
  const { user, login } = useUserContext();
  useEffect(() => {
    if (user) navigate("/");
  }, [user]);
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
    await login(userCredentials.email, userCredentials.password);
  };

  return { handleChange, handleSubmit, userCredentials };
};

export default useLogin;
