import { useRecoilState } from "recoil";
import {
  currentAtom,
  errorAtom,
  loadingAtom,
  updateAtom,
} from "../State/User/UserState";
import { Alert, Button, Modal, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Loading } from "./Loading";
import axios from "axios";
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref,
} from "firebase/storage";
import { app } from "../firebase";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export function DashProfile() {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [error, setError] = useRecoilState(errorAtom);
  const [currentUser, setcurrentUser] = useRecoilState(currentAtom);
  const [update, setUpdate] = useRecoilState(updateAtom);
  const [uploadimageprogress, setuploadimageprogress] = useState(null);
  const [uploadingimageerror, setuploadingimageerror] = useState(null);
  const [image, setImage] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const filepickref = useRef();
  const [loading, setLoading] = useRecoilState(loadingAtom);
  const [showModal, setShowModal] = useState(false);
  const [loadingPage, setLoadingPage] = useState(null);

  console.log(update);
  const HandleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImgUrl(URL.createObjectURL(file));
    }
  };

  //This is to set the update state to the current user state when the component is mounted
  useEffect(() => {
    setLoadingPage(true);
    setUpdate(currentUser);
    setLoadingPage(false);
  }, [loadingPage]);

  //This is to call the uploadimage function when the image state is updated
  useEffect(() => {
    setLoading(true);
    if (image) {
      uploadimage();
    }
    setLoading(false);
  }, [image]);

  //This is to upload the image to the firebase storage and get the url of the image
  const uploadimage = async () => {
    setLoading(true);
    const storage = getStorage(app);
    const fileName = new Date().getDate() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setuploadimageprogress(progress.toFixed(0));
      },
      (error) => {
        setuploadingimageerror("Size more than 2 MB");
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await setImgUrl(downloadURL); // Update imgUrl state
        setUpdate((prev) => ({ ...prev, profilepicture: downloadURL }));
      }
    );
    setLoading(false);
  };

  //This is the request to update the user data
  const UpdateTheData = async (e) => {
    try {
      setcurrentUser(update);
      // console.log(currentUser);
      setLoading(true);
      const res = await axios.put(
        "http://localhost:3000/api/auth/update",
        update
      );

      if (res.status === 200) {
        console.log("Successfully updated");
        setLoading(false);
        setcurrentUser(update);
      }
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  };
  //This is the request to delete the user
  const HandleDeleteUser = async (e) => {
    try {
      setLoading(true);
      const res = await axios.delete(
        `http://localhost:3000/api/user/delete/${currentUser._id}`
      );
      if (res.status === 200) {
        setShowModal(false);
        setcurrentUser({});
        setUpdate({});
        navigate("/signup");
        setLoading(false);
      }
    } catch (error) {
      setError(error);
      console.log(error);
      setLoading(false);
    }
  };

  //Signout
  const HandleSignOut = async (e) => {
    try {
      setcurrentUser({});
      navigate("/signin");
    } catch (error) {
      setError(error);
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <>
      {!loadingPage && (
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
            {uploadingimageerror && (
              <Alert color="failure">{uploadingimageerror}</Alert>
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
                  <p className="text-xl">
                    <Loading />
                  </p>
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
            {currentUser.isAdmin && (
              <Button
                type="button"
                gradientDuoTone="purpleToPink"
                className="w-full font-bold text-3xl"
                outline
                onClick={()=>{
                  navigate("/dashboard?tab=create-post")
                }}
              >
                <p className="text-xl">Create Post</p>
              </Button>
            )}
            <div className="flex justify-between">
              <span
                className="text-red-500 hover:underline cursor-pointer font-semibold"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                Delete your account
              </span>
              <span
                className="text-red-500 hover:underline cursor-pointer font-semibold"
                onClick={HandleSignOut}
              >
                Signout
              </span>
            </div>
            {error && <Alert color="failure">{error}</Alert>}
            
            
          </div>
        </div>
      )}
    </>
  );
}
