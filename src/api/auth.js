import customFetch from "../utils/customFetch";

export const login = async (email, password) => {
  try {
    const { data } = await customFetch.post("/api/v1/auth/login", {
      email,
      password,
    });
    return { data, error: null };
  } catch (error) {
    console.log(error);
    return { error, data: null };
  }
};
