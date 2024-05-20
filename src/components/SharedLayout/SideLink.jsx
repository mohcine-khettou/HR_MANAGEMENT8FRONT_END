import { Ripple } from "primereact/Ripple";
import { Link, useLocation } from "react-router-dom";

function SideLink({ link, icon, title }) {
  const { pathname: currentPath } = useLocation();
  const getLinkStyle = () => {
    let className =
      "p-ripple flex items-center cursor-pointer px-[1.5rem] py-[0.75rem] transition-duration-150 transition-colors w-full gap-2";
    if (currentPath == link) {
      className += " bg-[#21262d] text-slate-50";
    } else {
      className += " hover:bg-[#21262d] hover:text-slate-50 text-slate-400";
    }
    return className;
  };
  return (
    <li>
      <Link to={link} className={getLinkStyle()}>
        <i className={`${icon} text-[1.35rem]`}></i>
        <span className="font-medium">{title}</span>
      </Link>
    </li>
  );
}

export default SideLink;
