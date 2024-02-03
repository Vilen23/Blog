import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Post,createPostImage,createPostImageUrl,} from "../State/CreatePost/Atoms";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { errorAtom, loadingAtom } from "../State/User/UserState";
import { getDownloadURL,getStorage,ref,uploadBytesResumable,} from "firebase/storage";
import { useNavigate } from "react-router";
import { app } from "../firebase";
import { debounce } from "lodash";
import { Loading } from "../comp/Loading";
import axios from "axios";

export function CreatePost() {
  const navigate = useNavigate();
  const [loadingcomplete, setloadingcomplete] = useState(false);
  const [post, setPost] = useRecoilState(Post);
  const [image, setImage] = useRecoilState(createPostImage);
  const [imageUrl, setImageUrl] = useRecoilState(createPostImageUrl);
  const [loading, setLoading] = useRecoilState(loadingAtom);
  const [error, setError] = useRecoilState(errorAtom);
  const [uploadimage, setuploadimage] = useState(false);

  useEffect(()=>{
    setPost({});
    setLoading(false);
  },[])
  const HandleTitleChange = debounce((e) => {
    setPost((prev) => {
      return { ...prev, title: e.target.value };
    });
  }, 500);

  const HandleReactQuillChange = debounce((value)=>{
    setPost((prev) => {
      return { ...prev, content: value };
    });
  },1000)

  const HandleImageChange = (e) => {
    setuploadimage(false);
    const file = e.target.files[0];
    if (file) {
      // Example: Add validation for image type and size
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        // 2MB limit
        setError("Image size should be less than 2MB");
        return;
      }

      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  console.log(post);
  useEffect(() => {
    if (uploadimage && image) {
      upload();
    }
    if (!image && uploadimage) {
      setError("Please select an image");
    }
  }, [uploadimage]);

  const upload = async () => {
    const storage = getStorage(app);
    const filename = new Date().getTime() + image.name;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setloadingcomplete(false);
        setLoading(true);
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        setError("Size should be less than 2Mb");
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setImageUrl(downloadURL);
        setPost((prev) => ({ ...prev, image: downloadURL }));
        setLoading(false);
        setloadingcomplete(true);
      }
    );
  };

  const HandlePosting = async(e)=>{
    try {
      setloadingcomplete(true);
      const res = await axios.post("http://localhost:3000/api/post/create",post)
      if(res.status===200){
        setLoading(true)
        setError(null)
        console.log("successfully updated")
        navigate(`/post/${res.data.slug}`)
      }      
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <div className="p-3 mx-auto max-w-3xl min-h-screen">
      <h1 className="text-center text-3xl my-7 font-bold">CreatePost</h1>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <TextInput
            type="text"
            label="Title"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={HandleTitleChange}
          />
          <Select
            className="font-semibold"
            onChange={(e) => {
              setPost((prev) => ({ ...prev, category: e.target.value }));
            }}
          >
            <option value="uncategorized">Select a category</option>
            <option value="MERN">MERN Stack</option>
            <option value="DSA">Data structure and algorithm</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-2 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={HandleImageChange}
            onClick={() => {
              setError(null);
            }}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToPink"
            outline
            className="h-[40px] w-[100px] font-semibold"
            onClick={() => {
              setuploadimage(true);
            }}
          >
            {loading ? <Loading /> : loadingcomplete ? "Uploaded" : "Upload"}
          </Button>
        </div>
        {error && <Alert color="failure">{error}</Alert>}
        {post.image && (
          <img
            src={post.image}
            alt="upload"
            className="w-full h-72 object-cover object-top"
          />
        )}
        <ReactQuill
          theme="snow"
          placeholder="Write Something..."
          className="h-72 mb-12"
          onChange={HandleReactQuillChange}
        />
        <Button
          type="submit"
          gradientDuoTone="purpleToPink"
          outline
          size="xl"
          className="w-full font-semibold"
          onClick={HandlePosting}
        >
          <p className="text-2xl">Publish</p>
        </Button>
      </div>
    </div>
  );
}
