import { PiGitlabLogoThin } from "react-icons/pi";
import {
  useRecoilState,
} from "recoil";
import { userInfoAtom } from "../State/SignupState";
import axios from "axios";
import { useNavigate } from "react-router";
import { isvalidAtom } from "../State/InputsVlid";
import { Loading } from "../comp/Loading";
import { OAuth } from "../comp/OAuth";
import { currentAtom, errorAtom, loadingAtom } from "../State/User/UserState";
import { useEffect } from "react";

export function Signin() {
  const navigate = useNavigate();
  const [userInfo, setUser] = useRecoilState(userInfoAtom);
  const [isvalid, setIsvalid] = useRecoilState(isvalidAtom);
  const [userdetails, setuserdetails] = useRecoilState(currentAtom);
  const [loading, setloading] = useRecoilState(loadingAtom);
  const [error, setError] = useRecoilState(errorAtom);

  const onInput = () => {
    setIsvalid(true);
    setError("");
  };
  useEffect(() => {
    setloading(false);
    setError("");
  });

  const HandleSignin = async (e) => {
    e.preventDefault();
    if (userInfo.username.trim() === "" || userInfo.password.trim() === "") {
      setError("All the fields are required");
      setIsvalid(false);
      return;
    }

    try {
      console.log("starting signin");
      setloading(true);
      const res = await axios.post(
        "http://localhost:3000/api/auth/signin",
        userInfo
      );

      if (res.status === 200) {
        console.log("Signin successful");
        setuserdetails(res.data);
        navigate("/");
      }
    } catch (error) {
      console.error("Error during signin:", error);
      setError("Error during signin");
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="overflow-x-hidden">
      <div className="flex flex-col md:flex-row items-center justify-center h-screen mx-4 md:mx-10 lg:mx-30 xl:mx-60 gap-4  ">
        {/* left */}
        <div className="flex flex-col md:px-20 p-10 md:w-1/2 items-center md:relative top-[-50px]">
          <div className="flex items-center cursor-pointer">
            <div className="bg-gradient-to-r from-indigo-800 to-purple-800 text-white flex items-center rounded-l-2xl p-2 rounded-r-2xl md:w-full">
              <PiGitlabLogoThin className="text-white-700 ml-2 text-4xl" />
              <span className="font-bold p-1  px-2 rounded-lg text-6xl box-border md:text-8xl">
                Lather
              </span>
            </div>
            <p className="font-bold text-4xl md:text-5xl ml-4">Blog</p>
          </div>
          <p className="text-center text-lg text-gray-700 hover:text-black cursor-default mt-4">
            This is Blog Project Based on MERN stack and uses Recoil for state
            management
          </p>
        </div>
        {/* right */}
        <div className="flex flex-col w-full md:w-1/2 gap-2 p-10 md:p-[80px] shadow-sm rounded-3xl border-b-4 border-purple-800 border-x-2 border-t-2">
          {!isvalid && (
            <div className="text-center text-red-500 pb-2  w-full">{error}</div>
          )}

          <div className="flex flex-col">
            <label htmlFor="Your Username" className="font-bold text-lg">
              Your Username
            </label>
            <input
              type="text"
              placeholder="Username"
              className="border-b-2 border-purple-700  pl-2 drop-shadow-sm focus:outline-none text-black text-lg h-[50px]"
              id="Your Username"
              onChange={(e) => {
                setUser({ ...userInfo, username: e.target.value });
              }}
              onClick={onInput}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="font-bold text-lg">
              Your Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="border-b-2 border-purple-700  pl-2 drop-shadow-sm focus:outline-none text-black text-lg h-[50px]"
              id="password"
              onChange={(e) => {
                setUser({ ...userInfo, password: e.target.value });
              }}
              onClick={onInput}
            />
          </div>
          <div className="flex flex-col items-center justify-center mt-2">
            <button
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 hover:shadow-lg"
              onClick={HandleSignin}
              disabled={loading}
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 font-bold w-[130px] text-xl focus:outline-none ">
                {loading ? <Loading /> : "Sign In"}
              </span>
            </button>
            <OAuth></OAuth>
          </div>
          <div className="flex justify-center items-center gap-2">
            <p className=" text-xl">Already have an account?</p>
            <p
              className=" text-lg cursor-pointer text-blue-500 underline "
              onClick={() => {
                navigate("/signup");
              }}
            >
              Signup
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
