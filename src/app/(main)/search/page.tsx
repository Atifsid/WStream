"use client";
import { Suspense, useState } from "react";
import Header from "@/app/components/header";
import Loading from "@/app/components/loading";
import Button from "@/app/components/Button";
import { search } from "@/app/services/search";
import SearchMain from "@/app/ui/select/SearchMain";

export default function Search() {
  const [searchText, setSearchText] = useState("");
  const [res, setRes] = useState(null);

  const handleSearch = async () => {
    setRes(await search(searchText, 1));
  };

  return (
    <main>
      <Header />
      <div className="flex flex-col items-center justify-between p-10">
        <div
          className={`flex items-center justify-between bg-cyan-900 gap-4 rounded-2xl p-2 px-3 w-1/3`}
        >
          <input
            autoComplete="off"
            className="bg-transparent outline-none px-2 py-1 w-4/5"
            placeholder="I'm looking for ..."
            type="text"
            name="name"
            value={searchText}
            onChange={(e) => {
              e.target.value && setSearchText("");
              setSearchText(e.target.value);
            }}
          />
          <Button
            click={handleSearch}
            text={"Search"}
            disabled={searchText == ""}
          />
        </div>

        <Suspense fallback={<Loading />}>{<SearchMain data={res} />}</Suspense>
      </div>
    </main>
  );
}
