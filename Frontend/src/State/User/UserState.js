import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
const currentAtom = atom({
  key: "currentAtom",
  default: {
    userlogindetails: {},
    loading: false,
    error: null,
  },
  effects_UNSTABLE: [persistAtom],
});

export { currentAtom };
    