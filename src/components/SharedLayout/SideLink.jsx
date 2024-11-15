import { useEffect, useRef, useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import { NavLink, useLocation } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
// type Props =
//   | {
//       icon: JSX.Element,
//       label: React.ReactNode,
//       path: string,
//     }
//   | {
//       icon: JSX.Element,
//       label: React.ReactNode,
//       items: {
//         label: React.ReactNode,
//         path: string,
//       }[],
//     };
const SideLink = (props) => {
  const subMenuRef = useRef(null);
  const containerSubLinksRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const location = useLocation(); // Hook to get current location
  const currentPath = location.pathname;
  const toggleSubMenu = () => {
    const subMenuHeight = subMenuRef.current?.clientHeight;
    const containerSubLinksHeight = containerSubLinksRef.current?.clientHeight;
    if (containerSubLinksHeight === 0) {
      if (containerSubLinksRef.current) {
        containerSubLinksRef.current.style.height = `${
          subMenuHeight ?? 0 + 2
        }px`;
      }
    } else {
      if (containerSubLinksRef.current) {
        containerSubLinksRef.current.style.height = "0px";
      }
    }
    setIsActive(!isActive);
  };

  const handleClick = (e) => {
    e.preventDefault();
    toggleSubMenu();
  };

  useEffect(() => {
    if (
      (props && currentPath === props.path) ||
      (props && props.items?.find((item) => item.path === currentPath))
    ) {
      if (!isActive) {
        toggleSubMenu();
      }
    } else if (isActive) {
      if (props.items) {
        toggleSubMenu();
      } else setIsActive(false);
    }
  }, [currentPath]);
  if ("items" in props) {
    return (
      <li
        className={`${
          isActive
            ? "mx-6 mb-2 transition-all rounded-lg relative after:absolute after:top-0 after:left-0 after:w-[7px] after:h-full after:bg-[#e98e00] bg-[#ffffff31] overflow-hidden"
            : "mx-6 mb-2 transition-all rounded-lg hover:bg-[#ffffff31]"
        }`}
      >
        <div
          className={
            isActive
              ? "cursor-pointer flex justify-between items-center px-4 py-2 transition-all duration-300 text-primary"
              : "cursor-pointer flex justify-between items-center px-4 py-2 transition-all duration-300"
          }
          onClick={handleClick}
        >
          <span className="flex items-center gap-4 text-white capitalize">
            <span className="block size-5">{props.icon}</span>
            <span>{props.label}</span>
          </span>

          <div className="text-2xl bg-transparent">
            <BiChevronRight
              className={`${
                isActive
                  ? "text-white transform rotate-90 transition-all"
                  : "text-white transition-all"
              }`}
            />
          </div>
        </div>
        <ul
          ref={containerSubLinksRef}
          className="transition-all duration-500 h-0 overflow-hidden"
        >
          <div ref={subMenuRef}>
            {props.items?.map(({ label, path }, itemIndex) => (
              <li key={itemIndex} className="pl-4 list-disc">
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    isActive && currentPath === path
                      ? "block py-1.5 pl-9 capitalize text-secondary"
                      : "block py-1.5 pl-9 capitalize text-white transition-all hover:text-secondary"
                  }
                >
                  <span className="flex gap-2 items-center">
                    <GoDotFill />
                    {label}
                  </span>
                </NavLink>
              </li>
            ))}
          </div>
        </ul>
      </li>
    );
  }
  return (
    <li
      className={`${
        isActive
          ? "mx-6 mb-2 transition-all rounded-lg relative after:absolute after:top-0 after:left-0 after:w-[7px] after:h-full after:bg-[#e98e00] bg-[#ffffff31] overflow-hidden"
          : "mx-6 mb-2 transition-all rounded-lg hover:bg-[#ffffff31]"
      }`}
    >
      <NavLink
        to={props.path || ""}
        className={({ isActive }) =>
          isActive
            ? "flex justify-between items-center px-4 py-2 transition-all text-primary"
            : "flex justify-between items-center px-4 py-2 transition-all"
        }
      >
        <span className="flex items-center gap-4 text-white capitalize">
          <span className="block size-5">{props.icon}</span>
          <span>{props.label}</span>
        </span>
      </NavLink>
    </li>
  );
};

export default SideLink;
