import { Button } from "flowbite-react";

export function CalltoAction() {
  return (
    <div className="flex flex-col sm:flex-row border-[2px] border-teal-500 p-7 rounded-br-3xl rounded-tl-3xl ">
      <div className="p-3 flex flex-col items-center justify-center" >
            <h2 className="font-bold text-3xl mb-2">Create Your Own Career</h2>
            <p className="text-sm text-center">Join us to master React JS, a powerful JavaScript library for building dynamic user interfaces. Dive into hands-on projects and real-world scenarios with our comprehensive learning program. </p>
            <Button color="teal" size="md" className="mt-3">Get Started</Button>
      </div>
      <div className="p-3">
        <img src="https://www.patterns.dev/img/reactjs/react-logo@3x.svg" />
      </div>
    </div>
  );
}