import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export function CreatePost() {
  return (
    <div className="p-3 mx-auto max-w-3xl min-h-screen">
      <h1 className="text-center text-3xl my-7 font-bold">CreatePost</h1>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <TextInput type="text" label="Title" placeholder="Title" required id="title" className="flex-1"/>
          <Select className="font-semibold">
            <option value="uncategorized" >Select a category</option>
            <option value="MERN">MERN Stack</option>
            <option value="DSA">Data structure and algorithm</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-2 border-teal-500 border-dotted p-3">
          <FileInput type="file" accept="image/*" />
          <Button type="button" gradientDuoTone='purpleToPink' outline size='sm'>Upload Image</Button>
        </div>
        <ReactQuill theme="snow" placeholder="Write Something..." className="h-72 mb-12"/>
        <Button type="submit" gradientDuoTone='purpleToPink' outline size='xl' className="w-full font-semibold">
          <p className="text-2xl">Publish</p>
        </Button>
      </div>
    </div>
  );
}