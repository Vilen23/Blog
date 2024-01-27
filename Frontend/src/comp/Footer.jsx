import { PiGitlabLogoThin } from "react-icons/pi";
import { FaRegCopyright } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
export function Footer() {
  return (
    <div className="flex flex-col pb-10 ">
      <div className="border-t-8 border-purple-800 rounded-2xl py-4 md:flex md:justify-between md:px-[150px] md:items-center   ">
        <div>
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
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-8 p-10">
          <div className="flex flex-col items-center gap-2">
            <p className="font-bold text-xl text-black">ABOUT</p>
            <div className="flex flex-col justify-center items-center gap-[2px]">
              <p className=" text-gray-700">Projects</p>
              <p className=" text-gray-700">My Blog</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="font-bold text-xl ">FOLLOW US</p>
            <div className="flex flex-col justify-center items-center gap-[2px]">
              <p className=" text-gray-700">Discord</p>
              <p className=" text-gray-700">Instagram</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="font-bold text-xl ">LEGAL</p>
            <div className="flex flex-col justify-center items-center gap-[2px]">
              <p className=" text-gray-700">Privacy Policy</p>
              <p className=" text-gray-700">Terms & Conditions</p>
            </div>
          </div>
        </div>
      </div>
      <hr
        className="mx-auto w-[90%] md:w-[95%] border-gray-800
       "
      />
      <div className=" pl-[5%] md:pl-[4%] mt-4 flex gap-2 items-center hover:text-black cursor-pointer">
        <FaRegCopyright className="text-sm hover:text-black cursor-pointer text-gray-800 flex items-center mt-[1px]" />
        <p className=" text-lg hover:text-black cursor-pointer text-gray-800">
          {new Date().getFullYear()} Shivam
        </p>
      </div>
      <div className="pl-[7%] md:pl-[4%] mt-6 flex gap-4 text-gray-700 ">
      <FaFacebook className="text-3xl hover:text-black  cursor-pointer"/>
      <FaGithub  className="text-3xl hover:text-black  cursor-pointer"/>
      <FaInstagram className="text-3xl hover:text-black  cursor-pointer"/>
      </div>
    </div>
  );
}
