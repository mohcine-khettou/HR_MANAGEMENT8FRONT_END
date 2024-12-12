import { Sidebar } from "primereact/sidebar";
import SideLink from "./SideLink";
import { useUserContext } from "../../context";
import { HiUser } from "react-icons/hi";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { BsClockHistory } from "react-icons/bs";
import { FaArrowTrendUp } from "react-icons/fa6";
import Logo from "../../assets/images/fsts.png";
const MySidebar = () => {
  const { user, logout } = useUserContext();

  return (
    <div>
      <Sidebar
        modal={false}
        visible={true}
        onHide={() => {}}
        content={() => (
          <div
            id="app-sidebar-2"
            className="h-screen hidden lg:block flex-shrink-0 absolute lg:static left-0 top-0 z-1 bg-[#00082b]"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-center px-4 py-3">
                <img src={Logo} alt="logo" />
              </div>
              {/* box containing basic user info */}
              <div className="flex flex-col items-center my-14">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  version="1.1"
                  viewBox="0 0 17 17"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-14 text-secondary mb-4"
                >
                  <g></g>
                  <path d="M17 16.488c-0.063-2.687-2.778-4.999-6.521-5.609v-1.374c0.492-0.473 0.842-1.207 1.071-1.833 0.332-0.166 0.624-0.536 0.794-1.033 0.238-0.688 0.146-1.323-0.206-1.629 0.028-0.238 0.046-0.481 0.015-0.723-0.079-0.663 0.065-1.038 0.194-1.368 0.106-0.277 0.229-0.591 0.106-0.945-0.442-1.273-1.727-1.974-3.618-1.974l-0.264 0.005c-1.313 0.047-1.707 0.6-1.971 1.115-0.033 0.062-0.077 0.146-0.077 0.151-1.712 0.153-1.697 1.569-1.684 2.707l0.003 0.369c0 0.205 0.009 0.419 0.026 0.639-0.425 0.3-0.504 1.005-0.179 1.737 0.185 0.415 0.452 0.729 0.749 0.892 0.243 0.674 0.625 1.47 1.179 1.965v1.283c-3.798 0.589-6.554 2.907-6.617 5.625l-0.012 0.512h17.023l-0.011-0.512zM1.054 16c0.392-2.094 2.859-3.821 6.122-4.204l0.441-0.052v-2.666l-0.216-0.15c-0.393-0.272-0.791-0.947-1.090-1.851l-0.083-0.281-0.294-0.051c-0.053-0.019-0.208-0.153-0.33-0.428-0.075-0.168-0.104-0.312-0.112-0.415l0.51 0.143-0.096-0.749c-0.042-0.33-0.064-0.651-0.064-0.95l-0.003-0.38c-0.015-1.341 0.051-1.634 0.773-1.699 0.545-0.048 0.752-0.449 0.876-0.689 0.15-0.292 0.28-0.543 1.12-0.574l0.227-0.004c0.829 0 2.279 0.169 2.669 1.282 0 0.043-0.052 0.177-0.090 0.275-0.145 0.374-0.364 0.939-0.254 1.853 0.024 0.188-0.007 0.424-0.040 0.675l-0.089 0.805 0.441-0.048c0.008 0.104-0.004 0.269-0.075 0.472-0.097 0.289-0.242 0.438-0.237 0.454h-0.36l-0.114 0.342c-0.283 0.853-0.65 1.497-1.009 1.768l-0.198 0.15v2.726l0.438 0.055c3.211 0.401 5.641 2.123 6.030 4.192h-14.893z"></path>
                </svg>
                <span className="text-xl capitalize text-white">
                  {/* put the name + doti */}
                  {user.prenom} : {user.doti}
                </span>
                <span className="text-white">
                  {user.role}
                  {/* put the role */}
                </span>
              </div>
              {/* paths */}
              <div className="overflow-y-auto flex flex-col justify-between h-full">
                <ul className="list-none p-0 m-0 overflow-hidden flex-grow">
                  <SideLink
                    path="/"
                    icon={<i className="pi pi-home"></i>}
                    label="Profile"
                  />
                  {user.role === "RH" ? (
                    <>
                      <SideLink
                        icon={<i className="pi pi-file-o"></i>}
                        label="Demandes"
                        items={[
                          {
                            label: "Modification du profil",
                            path: "/demandesRH",
                          },
                          {
                            label: "Documents",
                            path: "/demandesRH2",
                          },
                        ]}
                      />
                    </>
                  ) : (
                    <SideLink
                      path="/demandes"
                      icon={<i className="pi pi-file-o"></i>}
                      label="Demandes"
                    />
                  )}
                  {user.role === "RH" && (
                    <SideLink
                      path="/profs"
                      icon={<HiUser size={20} />}
                      label="Professeurs"
                    />
                  )}
                  {user.role === "RH" && (
                    <SideLink
                      path="/historiques-professeurs"
                      icon={<FaArrowTrendUp size={20} />}
                      label="Gradation"
                    />
                  )}
                  {user.role === "RH" && (
                    <SideLink
                      path="/charts"
                      icon={<RiDashboardHorizontalFill size={20} />}
                      label="Statistiques"
                    />
                  )}
                </ul>
                <div className="mt-auto list-none pb-4" onClick={logout}>
                  <SideLink
                    path="/login"
                    icon={<i className="pi pi-arrow-right"></i>}
                    label="se déconnecter"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      ></Sidebar>
    </div>
  );
};

export default MySidebar;
