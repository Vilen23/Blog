import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useRecoilState } from "recoil";
import { currentAtom, errorAtom } from "../State/User/UserState";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import {AiFillGoogleCircle} from "react-icons/ai"

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
        setuserDetails(res.data);
        navigate("/dashboard?tab=profile");

        
    }
} catch (error) {
    setErorr(error);
    console.log(error);
}
  };
  return (
    <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={HandleGoogleClick} className="w-[135px] py-0.5">
        <AiFillGoogleCircle className='w-6 h-6 mr-2  font-bold'/>
        <p className="font-bold text-lg">Sign In</p>
    </Button>
  );
}
