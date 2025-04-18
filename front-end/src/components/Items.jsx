import { Dot, Trash } from "lucide-react";

export default function Items(props) {
  return (
    <div className="flex rounded bg-yellow-200 mb-4">
      <div className="w-2 bg-yellow-400 rounded-s"></div>
      <div className="flex flex-col w-full truncate py-2">
        <div className="flex items-center">
          <Dot size={36} className="text-green-400" />
          <p className="text-sm font-semibold">{props.date}</p>
        </div>
        <div className="flex justify-between px-4">
          <p className="cursor-pointer text-xl font-bold">{props.title}</p>
          <Trash onClick={props.deleteItem} className="cursor-pointer"/>
        </div>
        <p className="text-md px-4 truncate pb-2">{props.description}</p>
      </div>
    </div>
  );
}
