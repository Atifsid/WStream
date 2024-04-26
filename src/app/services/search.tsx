"use server";

export async function search(searchText: string, page: number) {
  try {
    let url = `${process.env.BASE_URL}/?apikey=${process.env.KEY}&s=${searchText}&page=${page}`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Error fetching anime/manga/movie.");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
}
