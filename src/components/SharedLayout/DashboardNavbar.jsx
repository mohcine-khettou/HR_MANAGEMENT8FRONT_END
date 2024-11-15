import Menu from "./Menu";
import { useLocation } from "react-router-dom";
import { useUserContext } from "../../context";
import getTitleFromPath from "../../utils/title-from-path";

const DashboardNavbar = ({ openMobileSidebar }) => {
  const pathname = useLocation();
  const { user, logout } = useUserContext();
  console.log(pathname.pathname);

  return (
    <>
      <nav className="bg-white shadow-sm">
        <div className="flex justify-between items-center w-full h-24 xl:pr-6 xl:rtl:pl-6 xl:pl-0 px-[5vw]">
          <div className="flex gap-8">
            <button className="xl:hidden p-4" onClick={openMobileSidebar}>
              <div className="w-[25px] h-[2px] bg-black mb-1"></div>
              <div className="w-[15px] h-[2px] bg-black"></div>
            </button>
            <h3 className="font-medium hidden sm:block pl-8">
              {getTitleFromPath(pathname.pathname)}
            </h3>
          </div>
          <div className="flex gap-4">
            <Menu
              userName={`${user.nom} ${user.prenom}`}
              email={user.email}
              logout={logout}
            />
          </div>
        </div>
      </nav>
    </>
  );
};

export default DashboardNavbar;
