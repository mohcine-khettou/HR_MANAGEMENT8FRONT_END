import { useEffect, useState } from "react";
import listItems from "./listItems";
import { Card } from "primereact/card";
import Profile from "../../assets/images/profile.jpg";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { getUserByEmail } from "../../api/users";
const UserInfo = () => {
  const [selectedItem, setSelectedItem] = useState(
    listItems.find((item) => item.id === 1)
  );
  const [user, setUser] = useState({});
  const getUser = async () => {
    const {
      user: { email },
    } = getUserFromLocalStorage();
    const data = await getUserByEmail(email);
    if (data.user) setUser(data.user);
    else {
      // handle the error
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  const getListItemStyle = (id) => {
    let className =
      "py-3 px-5 hover:bg-[#04a9f51a] hover:text-[#04a9f5] cursor-pointer rounded-md mb-1";
    if (id === selectedItem.id) className += " bg-[#04a9f51a] text-[#04a9f5]";
    return className;
  };

  return (
    <div className="flex gap-[2%] items-start mt-8">
      {/* he're is the card of the user with the list of items */}
      <Card className="flex-none w-[40%]">
        <div className="flex items-center flex-col mb-10">
          <img
            className="w-52 h-52 rounded-full object-cover"
            src={Profile}
            alt=""
          />
          <span className="font-semibold mt-4 capitalize">
            {user.prenom} {user.nom}
          </span>
        </div>
        <ul>
          {listItems.map((item) => {
            return (
              <li
                className={getListItemStyle(item.id)}
                key={item.id}
                onClick={() => setSelectedItem(item)}
              >
                <span>{item.title}</span>
              </li>
            );
          })}
        </ul>
      </Card>
      <div className="flex-none w-[58%]">
        {(selectedItem.render &&
          selectedItem.render(selectedItem.title, user, selectedItem.fields)) ||
          selectedItem.item}
      </div>
    </div>
  );
};

export default UserInfo;
