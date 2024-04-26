import Card from "@/app/components/Card";
import Link from "next/link";

export default function SearchMain({ data }: { data: any }) {
  if (data && data.Error) {
    return <div className="mt-4">{data.Error}</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-md md:max-w-6xl mx-auto py-2">
      {data &&
        data.Search.map((item: any) => {
          return (
            <Link
              key={item.imdbID}
              href={`/details/${item.Type}/${item.Title}`}
            >
              <Card {...item} />
            </Link>
          );
        })}
    </div>
  );
}
