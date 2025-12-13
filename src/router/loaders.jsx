export const getAllGamesLoader = async () => {
  const promise = await fetch(
    `https://api.rawg.io/api/games?key=${
      import.meta.env.VITE_API_KEY
    }&dates=2025-01-01,2025-12-31&page_size=30`
  );
  const json = await promise.json();
  return json.results;
};

export const getSearchedGames = async ({ params }) => {
  const promise = await fetch(
    `https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&search=${
      params.slug
    }`
  );
  const json = await promise.json();
  return json.results;
};
