export default function GameCard({ game }) {
  return (
    <>
      <div className="hover-3d h-[200px] relative">
        {/* content */}
        <figure className="max-w-100 rounded-2xl">
          <img
            src={`${game.background_image}`}
            alt=""
            className="w-full h-full"
          />
          <p className="absolute bottom-3 w-full text-center font-bold">
            {game.name}
          </p>
        </figure>
        {/* 8 empty divs needed for the 3D effect */}
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
}
