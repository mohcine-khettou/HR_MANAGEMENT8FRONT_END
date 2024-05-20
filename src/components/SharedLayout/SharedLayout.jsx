import { getUserFromLocalStorage } from "../../utils/localStorage";
import Sidebar from "./Sidebar";
import { Navigate, Outlet } from "react-router-dom";

const SharedLayout = () => {
  const user = getUserFromLocalStorage();
  if (!user) return <Navigate to={"/login"} />;
  return (
    <>
      <Sidebar />
      <main className="ml-80 mt-32 px-[5%]">
        <Outlet></Outlet>
      </main>
    </>
  );
};

export default SharedLayout;
