import { PiGitlabLogoThin } from "react-icons/pi";
import { useRecoilState, useRecoilValue } from "recoil";
import { itemsAtom } from "../State/Navbar/Items";
import { useNavigate } from "react-router";
import { CiLogin } from "react-icons/ci";
import { menuAtom } from "../State/Navbar/Menu";
import { IoMenu } from "react-icons/io5";
import { MenuBlock } from "./MenuBlock";
import { currentAtom, errorAtom, loadingAtom } from "../State/User/UserState";
import { Avatar, Dropdown, DropdownDivider } from "flowbite-react";

export function Navabar() {
  const items = useRecoilValue(itemsAtom);
  const navigate = useNavigate();
  const [currentUser,setcurrentUser] = useRecoilState(currentAtom);
  const [error, setError] = useRecoilState(errorAtom);
  const [loading, setLoading] = useRecoilState(loadingAtom);
  const [ismenu, setismenu] = useRecoilState(menuAtom);


    //Signout
    const HandleSignOut = async (e) => {
      try {
        setcurrentUser({});
      } catch (error) {
        setError(error);
        setLoading(false);
        console.log(error);
      }
    };

  return (
    <div>
      <nav
        className={`flex h-[60px] md:h-[70px] border-b-2 shadow-purple-200 shadow-sm justify-between items-center ${
          ismenu ? "menu-open" : ""
        }`}
      >
        <div
          className="flex items-center md:ml-10 ml-4 cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          <div className="bg-gradient-to-r from-indigo-800 to-purple-800 text-white flex items-center rounded-l-2xl p-1 rounded-r-2xl ">
            <PiGitlabLogoThin className="text-white-700  ml-2 text-2xl" />
            <span className=" font-bold p-1 px-2 rounded-lg text-xl box-border">
              Lather
            </span>
          </div>
          <p className="font-bold text-lg">Blog</p>
        </div>
        <div className="hidden  md:items-center md:flex md:justify-end   md:w-screen">
          <div className="flex  justify-end gap-10 items-center mr-20">
            {items.map((item) => {
              return (
                <div
                  className="flex items-center gap-1 cursor-pointer hover:text-purple-800 
              hover:underline-offset-1 text-[18px] " key={item.name}
                  onClick={() => {
                    navigate(item.to);
                  }}
                >
                  {item.icon}
                  {item.name}
                </div>
              );
            })}
          </div>
        </div>
        {currentUser._id ? (
          <div className="flex items-center justify-center mr-4 md:mr-10 gap-2 text-center">
            <Dropdown
              className=""
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User"
                  img={currentUser.profilepicture}
                  rounded
                  className="object-cover bg-cover rounded-full w-[40px] h-full text-3xl"
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-md font-bold">
                  {currentUser.username}
                </span>
                <span className="truncate text-sm">{currentUser.email}</span>
              </Dropdown.Header>
              <Dropdown.Item
                onClick={() => {
                  navigate("/dashboard?tab=profile");
                }}
                className=" flex justify-center"
              >
                Profile
              </Dropdown.Item>
              <DropdownDivider></DropdownDivider>
              <Dropdown.Item className="flex justify-center" onClick={HandleSignOut}>
                Sign out
              </Dropdown.Item>
            </Dropdown>
            <div
              className="mr-2 md:hidden cursor-pointer"
              onClick={() => {
                setismenu(!ismenu);
              }}
            >
              <IoMenu className="text-purple-900 font-bold text-2xl" />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <div
              className="flex mr-10 items-center gap-2 bg-gradient-to-r from-violet-700 to-purple-700 h-[35px] md:h-[50px] md:w-[120px] md:flex md:justify-center p-2 pr-3 text-white rounded-lg cursor-pointer "
              onClick={() => {
                navigate("/signin");
              }}
            >
              <CiLogin className="text-2xl " />
              <span className="font-bold  ">Sign In</span>
            </div>
          </div>
        )}
      </nav>
      {ismenu && (
        <div className="md:hidden fixed top-[60px] left-0 w-full  bg-gradient-to-b from-indigo-800 to-purple-800 opacity-95 transition-opacity duration-300">
          <div className="flex flex-col items-center justify-center h-full">
            <MenuBlock />
          </div>
        </div>
      )}
    </div>
  );
}
