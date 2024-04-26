import React from "react";
import Image from "next/image";
import styles from "../styles/main.module.css";
import { FaCalendarDay } from "react-icons/fa6";
import { Calendar } from "lucide-react";

const Card: React.FC<any> = async (props) => {
  const fallbackSrc = "/static/no_icon.png";

  const getAirYear = (date: string) => {
    if (date) {
      return date.split("-")[0];
    }
    return "";
  };

  return (
    <div className={`${styles.card}`}>
      <div className="p-4">
        <Image
          style={{
            width: "auto",
            height: "auto",
          }}
          className="rounded-xl"
          src={props.Poster != "N/A" ? props.Poster : fallbackSrc}
          height={300}
          width={200}
          alt={"thumbnail"}
        />
        <div className="font-sans text-xl tracking-wide break-normal w-40 py-2">
          {props.Title}
        </div>
        <div className="flex items-center gap-3">
          <Calendar color={"#7CB9E8"} />
          <div className="mx-1">{props.Year ? props.Year : ""}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
