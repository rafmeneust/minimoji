export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500 font-sans">
      <img
        src="/src/pubic/dino.svg"
        alt="Chargement Dino"
        className="w-20 h-20 animate-spin-slow mb-4"
      />
      <p className="text-sm">Un petit dino arrive... Patience !</p>
    </div>
  );
}