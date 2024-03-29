import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
const currentAtom = atom({
  key: "currentAtom",
  default: {
  },
  effects_UNSTABLE: [persistAtom],
});

const loadingAtom = atom({
  key: "loadingAtom",
  default:false
})

const errorAtom = atom({
  key: "errorAtom",
  default:""
})

const updateAtom = atom({
  key:"updateAtom",
  default:currentAtom
})
export { currentAtom,loadingAtom,errorAtom,updateAtom };
    