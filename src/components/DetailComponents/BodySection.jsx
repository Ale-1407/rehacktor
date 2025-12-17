import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import supabase from "../../database/supabase";

export default function BodySection({ game, profile_id }) {
  const [isFavourite, setIsFavourite] = useState(false);
  const [description, setDescription] = useState("");
  const [gameReviews, setGameReviews] = useState([]);
  const [checkReview, setCheckReview] = useState(false);

  const handle_description = (e) => {
    setDescription(e.target.value);
  };

  const get_reviews = async () => {
    let { data: reviews, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("game_id", game.id);

    setGameReviews(reviews);
  };

  const add_review = async () => {
    const { data, error } = await supabase
      .from("reviews")
      .insert([
        {
          profile_id,
          game_id: game.id,
          game_name: game.name,
          description,
        },
      ])
      .select();

    setDescription("");
    setCheckReview(!checkReview);
  };

  const get_favourite = async () => {
    let { data: favourites, error } = await supabase
      .from("favourites")
      .select("*")
      .eq("profile_id", profile_id)
      .eq("game_id", game.id);

    if (favourites.length > 0) setIsFavourite(true);
  };

  useEffect(() => {
    get_favourite();
    get_reviews();
  }, [checkReview]);

  const add_game = async () => {
    const { data, error } = await supabase
      .from("favourites")
      .insert([{ profile_id, game_id: game.id, game_name: game.name }])
      .select();
    setIsFavourite(true);
  };

  const remove_game = async () => {
    const { error } = await supabase
      .from("favourites")
      .delete()
      .eq("profile_id", profile_id)
      .eq("game_id", game.id);
    setIsFavourite(false);
  };

  return (
    <>
      <section className="grid grid-cols-6 mt-10 px-10">
        <div className="col-span-5 flex flex-col items-center gap-4">
          <p className="text-white text-xl mb-2">Reviews</p>

          <textarea
            className="textarea w-2/3 bg-base-100/90 text-black placeholder-gray-500 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Write your review..."
            onChange={handle_description}
            value={description}
          />

          <button
            className="btn w-2/3 bg-primary text-white font-semibold tracking-wide hover:bg-primary/80 transition"
            onClick={add_review}
          >
            Send
          </button>

          <div className="w-2/3 my-4 p-4 max-h-[200px] overflow-y-auto rounded-xl bg-base-200/80 shadow-inner text-white">
            {gameReviews &&
              gameReviews.map((review) => {
                return (
                  <p key={review.id} className="text-sm text-gray-300 italic">
                    {review.description}
                  </p>
                );
              })}
          </div>
        </div>
        <div>
          {(isFavourite && (
            <FaHeart
              className="text-red-500 cursor-pointer text-3xl"
              onClick={remove_game}
            />
          )) || (
            <FaRegHeart
              className="text-red-500 cursor-pointer text-3xl"
              onClick={add_game}
            />
          )}
        </div>
      </section>
    </>
  );
}
