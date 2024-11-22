import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiMiniUser } from "react-icons/hi2";
import { HiOutlineArrowLeftStartOnRectangle } from "react-icons/hi2";
const Menu = ({ userName, email, logout }) => {
  const [open, setOpen] = useState(false);
  const getLinkClassName = () => {
    return "block px-5 py-2 hover:bg-primary-100 hover:text-primary-800 flex gap-4 rounded-md transition w-full ";
  };
  useEffect(() => {
    if (open) {
      window.addEventListener("click", () => {
        setOpen(false);
      });
    }
  }, [open]);
  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        className="rounded-full bg-primary-800 text-white size-14 text-3xl flex justify-center items-center"
      >
        {userName.slice(0, 1).toUpperCase()}
      </button>
      {open && (
        <ul className="absolute top-[110%] right-0 bg-white rounded-xl w-[300px] py-3 px-1 p-card">
          <div
            className="flex gap-4 px-5 py-2 items-center mb-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rounded-full bg-primary-800 text-white size-12 text-2xl flex justify-center items-center flex-none">
              {userName.slice(0, 1).toUpperCase()}
            </div>
            <div className="text-sm">
              <span className="font-semibold block">{userName}</span>
              <span>{email}</span>
            </div>
          </div>

          <li>
            <Link to={"/dashboard/profile"} className={getLinkClassName()}>
              <span className="size-6 block">
                <HiMiniUser size={24} />
              </span>
              <span>Mon compte</span>
            </Link>
          </li>
          <li>
            <button className={getLinkClassName()} onClick={logout}>
              <span className="size-6 block">
                <HiOutlineArrowLeftStartOnRectangle size={24} />
              </span>
              <span>se déconnecter</span>
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Menu;
