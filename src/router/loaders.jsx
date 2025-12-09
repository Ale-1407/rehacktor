export const getAllGamesLoader = async () => {
  const promise = await fetch(
    `https://api.rawg.io/api/games?key=${
      import.meta.env.VITE_API_KEY
    }&dates=2024-09-01,2025-09-30&page_size=30`
  );
  const json = await promise.json();
  return json.results;
};
