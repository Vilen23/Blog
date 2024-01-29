import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useRecoilState } from "recoil";
import { currentAtom, errorAtom } from "../State/User/UserState";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function OAuth() {
  const [userdetails, setuserDetails] = useRecoilState(currentAtom);
  const [error,setErorr]=useRecoilState(errorAtom)
  const navigate = useNavigate();
  const auth = getAuth(app);
  const HandleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      setuserDetails((state)=>({...state,loading: true}))  
      const resultFromGoogle = await signInWithPopup(auth, provider);
      const res = await axios.post("http://localhost:3000/api/auth/google", {
        name: resultFromGoogle.user.displayName,
        email: resultFromGoogle.user.email,
        googlephotourl: resultFromGoogle.user.photoURL,
      });
      if (res.status === 200) {
        console.log("hi there")
        setuserDetails(res.data);
        navigate("/dashboard");

        
    }
} catch (error) {
    setErorr(error);
    console.log(error);
}
console.log(userdetails)
  };
  return (
    <div>
      <button
        type="button"
        class="text-white flex py-3 items-center font-bold bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 text-md rounded-lg  px-8 hover:bg-white hover:text-[#4295f4] hover:border-2 hover:outline-cyan-700 hover:border-collap text-center  dark:focus:ring-[#4285F4]/55 me-2 mb-2"
        onClick={HandleGoogleClick}
      >
        <svg
          class="w-4 h-4 me-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 19"
        >
          <path
            fill-rule="evenodd"
            d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
            clip-rule="evenodd"
          />
        </svg>
        Sign in
      </button>
    </div>
  );
}
