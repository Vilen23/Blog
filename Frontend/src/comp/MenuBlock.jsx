// MenuBlock.js

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { itemsAtom } from '../State/Navbar/Items';
import { useNavigate } from 'react-router';
import { menuAtom } from '../State/Navbar/Menu';

export function MenuBlock() {
  const items = useRecoilValue(itemsAtom);
  const navigate = useNavigate()
  const setismenu = useSetRecoilState(menuAtom)

  return (
    <div className="flex flex-col justify-between p-4 ">
      {items.map((item, index) => (
        <div key={index} className="mb-2" onClick={()=>{
            navigate(item.to)
            setismenu(false)
            
        }}>
          <div className="flex items-center gap-1 justify-center text-gray-100 text-center  border-b-2 pb-1 mb-2 hover:text-white font-bold text-2xl shadow-2xl px-40 cursor-pointer ">
            {item.icon}
            {item.name}</div>
        </div>
      ))}
    </div>
  );
}
