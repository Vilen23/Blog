import { Button } from "flowbite-react";
import { useRecoilState } from "recoil";
import { loadingProjectAtom } from "../State/project/loading";
import { useEffect, useState } from "react";

export function PaytmClone() {
    const [loading,setLoading] = useRecoilState(loadingProjectAtom);
    const [image,setImage] = useState(null)
    useEffect(()=>{
        setLoading(true);
        setImage('https://s3-alpha.figma.com/hub/file/4863790939/da12d0c1-da0d-4da0-82c1-3534321a3e0f-cover.png')
        setLoading(false);
        
    },[])
  return (
    <div className="flex flex-col sm:flex-row border-[2px] border-teal-500 p-7 rounded-br-3xl rounded-tl-3xl ">
      <div className="p-3 flex flex-col items-center justify-center" >
            <h2 className="font-bold text-3xl mb-2">Paytm Clone</h2>
            <p className="text-sm text-center">A Paytm clone built with the MERN stack offers a seamless digital payment experience, mirroring the functionality of the popular platform. Leveraging MongoDB, Express.js, React.js, and Node.js, it provides users with secure transactions and intuitive interfaces, making it a versatile solution for online payments. </p>
            <Button color="teal" size="md" className="mt-3"
            onClick={()=>{
                window.open("https://payment-app-gilt.vercel.app/")
            }}>Go Check Out</Button>
      </div>
      <div className="p-3">
        <img src={image} />
      </div>
    </div>
  );
}