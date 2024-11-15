import { useUserContext } from "../../context";
import DashboardNavbar from "./DashboardNavbar";
import Sidebar from "./Sidebar";
import { Navigate, Outlet } from "react-router-dom";

const SharedLayout = () => {
  const { user } = useUserContext();
  if (!user) return <Navigate to={"/login"} />;
  return (
    <>
      <Sidebar />
      <div className="fixed top-0 left-0 w-screen pl-[320px] z-10 duration-500 transition-all ">
        <DashboardNavbar openMobileSidebar={() => {}} />
      </div>
      <main className="pl-[350px] pr-[30px] pt-32 sm:pt-36 min-h-screen overflow-x-hidden duration-500 transition-all">
        <Outlet></Outlet>
      </main>
    </>
  );
};

export default SharedLayout;
