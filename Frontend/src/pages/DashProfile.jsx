import {  useRecoilState } from "recoil";
import { currentAtom, loadingAtom, updateAtom } from "../State/User/UserState";
import { Alert, Button, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { Loading } from "../comp/Loading";
import axios from "axios";
import {getDownloadURL, getStorage, uploadBytesResumable,ref} from "firebase/storage";
import { app } from "../firebase";

export function DashProfile() {
  const [currentUser, setcurrentUser] = useRecoilState(currentAtom);
  const [update,setUpdate] = useRecoilState(updateAtom);
  const [uploadimageprogress, setuploadimageprogress] = useState(null)
  const [uploadingimageerror, setuploadingimageerror] = useState(null)
  const [image, setImage] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const filepickref = useRef();
  const [loading, setLoading] = useRecoilState(loadingAtom);

  
  const HandleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImgUrl(URL.createObjectURL(file));
    }
  };
  const UpdateTheData = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setUpdate((state) => ({ ...state })); // Update state immediately
      console.log(update);
      const res = await axios.put(
        "http://localhost:3000/api/auth/update",
        update
      );
      if (res.status === 200) {
        console.log("Successfully updated");
        setLoading(false);
        setcurrentUser(update)
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(()=>{
    if(image){
      uploadimage();
    }
  },[image])

  console.log(uploadimageprogress);
  const uploadimage = async ()=>{
    const storage = getStorage(app);
    const fileName = new Date().getDate() +  image.name;
    const storageRef = ref(storage,fileName);
    const uploadTask = uploadBytesResumable(storageRef,image)
    uploadTask.on(
      'state_changed',
      (snapshot)=>{
        const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
        setuploadimageprogress(progress.toFixed(0));
      },
      (error)=>{
        setuploadingimageerror('Size more than 2 MB')
      },
      async ()=>{
         await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          setImgUrl(downloadURL);
          setUpdate((prev)=>({...prev,profilepicture:imgUrl}))
        })
      }
    )
  }
  console.log(imgUrl);
  console.log(uploadingimageerror)

  return (
    <div className="max-w-lg mx-auto w-full ">
      <h1 className="text-center my-7 font-semibold text-3xl">Profile</h1>
      <div className="flex flex-col mx-4 md:mx-0 gap-4">
        <input
          type="file"
          accept="/image/*"
          onChange={HandleImageChange}
          ref={filepickref}
          className="hidden"
        />
        <div
          className="h-32 w-32 self-center rounded-full cursor-pointer shadow-md shadow-purple-400 overflow-hidden hover:shadow-lg hover:shadow-purple-400 "
          onClick={() => {
            filepickref.current.click();
          }}
        >
          <img
            src={imgUrl || currentUser.profilepicture}
            alt="user"
            className="object-cover bg-cover h-full w-full rounded-full border-2 border-purple-700 "
          />
        </div>
          {uploadingimageerror &&(
            <Alert color='failure'>{uploadingimageerror}</Alert>
          )}
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={(e) => {
            setUpdate((prev) => ({ ...prev, username: e.target.value }));
          }}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={(e) => {
            setUpdate((prev) => ({ ...prev, email: e.target.value }));
          }}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          onChange={(e) => {
            setUpdate((prev) => ({ ...prev, password: e.target.value }));
          }}
        />
        <div className="w-full"> 
          {loading ? (
            <Button
            type="button"
            gradientDuoTone="purpleToPink"
            className="font-bold text-xl w-full"
            outline
            onClick={UpdateTheData}
            
          >
            <p className="text-xl"><Loading/></p>
          </Button>
          ) : (
            <Button
              type="button"
              gradientDuoTone="purpleToPink"
              className="font-bold text-xl w-full"
              outline
              onClick={UpdateTheData}
              
            >
              <p className="text-xl">Update</p>
            </Button>
          )}
        </div>
        <div className="flex justify-between">
          <span className="text-red-500 hover:underline cursor-pointer font-semibold">
            Delete your account
          </span>
          <span className="text-red-500 hover:underline cursor-pointer font-semibold">
            Signout
          </span>
        </div>
      </div>
    </div>
  );
}
