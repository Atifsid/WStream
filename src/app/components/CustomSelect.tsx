"use client";
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "../ui/select/select";
import SelectOptions from "../ui/select/SelectOptions";

export default function CustomSelect({ info, setQueryParams }: any) {
  return (
    <Select onValueChange={(value) => setQueryParams(value)}>
      <SelectTrigger className="w-[180px] text-white">
        <SelectValue
          placeholder={`Select ${
            typeof info[0] === "number" ? "year" : "type"
          }`}
        />
      </SelectTrigger>
      <SelectContent
        ref={(ref) => {
          if (!ref) return;
          //   ref.ontouchstart = (e) => {
          //     e.preventDefault();
          //   };
        }}
      >
        <SelectGroup>
          <SelectOptions info={info} />
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
