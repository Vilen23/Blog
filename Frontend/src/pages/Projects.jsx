import { useRecoilValue } from "recoil";
import { PaytmClone } from "../comp/PaytmClone";
import { loadingProjectAtom } from "../State/project/loading";

export function Projects() {
  const loading = useRecoilValue(loadingProjectAtom);
  console.log(loading);
  return loading ? (
    <div>loading..</div>
  ) : (
    <div className="flex flex-col items-center justify-center px-[400px] h-screen">
      <h1 className="text-4xl font-bold my-[40px]">
        My Other Full Stack Projects
      </h1>
      <PaytmClone />
    </div>
  );
}
