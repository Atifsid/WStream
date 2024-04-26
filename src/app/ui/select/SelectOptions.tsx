import { Key } from "react";
import { SelectItem } from "../select/select";

export default function SelectOptions({ info }: any) {
  return (
    <>
      {info.map((data: string, index: Key | null | undefined) => (
        <SelectItem
          value={data}
          key={index}
          className=" focus:bg-slate-800 focus:text-slate-200 cursor-pointer"
        >
          {data === "Movie" ? "Movie/Series" : data}
        </SelectItem>
      ))}
    </>
  );
}
