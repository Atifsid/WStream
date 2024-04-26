"use client";
import styles from "../../styles/main.module.css";
import { Suspense, useEffect, useState } from "react";
import Header from "@/app/components/header";
import multiSearch from "@/app/services/search";
import { SearchResponse } from "@/app/api/models/SearchResponse";
import useDebounce from "@/app/utils/useDebounce";
import Loading from "@/app/components/loading";
import CustomSelect from "@/app/components/CustomSelect";
import { types } from "@/app/lib/constants";

export default function Search() {
  const [isLoading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebounce(searchText, 500);
  const [res, setRes] = useState<SearchResponse>();
  const [queryParams, setQueryParams] = useState(null);

  useEffect(() => {
    if (debouncedSearch) {
      setLoading(true);
      multiSearch(debouncedSearch, 1)
        .then((res) => {
          setRes(res);
          setLoading(false);
        })
        .catch((err) => {});
    }

    if (debouncedSearch === "") {
      setRes(undefined);
    }
  }, [debouncedSearch]);

  return (
    <main>
      <Header />
      <div className="flex flex-col items-center justify-between p-10">
        <div
          className={`flex items-center justify-between bg-cyan-900 gap-4 rounded-3xl p-2 px-4 w-1/3`}
        >
          <input
            disabled={!queryParams}
            autoComplete="off"
            className={`bg-transparent px-2 py-1 ${styles.searchInput} ${
              !queryParams && "cursor-not-allowed"
            }`}
            placeholder={`${
              queryParams ? "Search ..." : "Please Select a type first ->"
            }`}
            type="text"
            name="name"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <CustomSelect info={types} setQueryParams={setQueryParams} />
        </div>

        <Suspense key={JSON.stringify(queryParams)} fallback={<Loading />}>
          {/* <SearchMain /> */}
        </Suspense>
      </div>
    </main>
  );
}
