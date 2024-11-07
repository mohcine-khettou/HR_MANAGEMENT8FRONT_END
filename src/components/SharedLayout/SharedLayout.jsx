import { useUserContext } from "../../context";
import Sidebar from "./Sidebar";
import { Navigate, Outlet } from "react-router-dom";

const SharedLayout = () => {
  const { user } = useUserContext();
  if (!user) return <Navigate to={"/login"} />;
  return (
    <>
      <Sidebar />
      <main className="ml-80 mt-20 px-[5%]">
        <Outlet></Outlet>
      </main>
    </>
  );
};

export default SharedLayout;
