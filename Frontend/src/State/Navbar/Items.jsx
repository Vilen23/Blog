import { atom } from "recoil";
import { FaHome } from "react-icons/fa";
import { TbDetails } from "react-icons/tb";
import { GoProjectSymlink } from "react-icons/go";

const itemsAtom = atom({
    key:"itemsAtom",
    default:[
        {
            name:"Home",
            icon: <FaHome />,
            to:"/"
        },
        {
            name:"About",
            icon:<TbDetails />,
            to:"/about"
        },
        {
            name:"Projects",
            icon:<GoProjectSymlink />,
            to:"/projects"
        }
    ]
})

export {
    itemsAtom
}