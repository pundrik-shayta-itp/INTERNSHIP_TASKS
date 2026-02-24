export default function MovieComponent(props: any) {
  const { type, primaryTitle, primaryImage, startYear, rating } = props;
  console.log(props);

  const imgurl =
    primaryImage?.url || "https://via.placeholder.com/200x300?text=No+Image";
  const year = startYear || "N/A";
  const aggregateRating = rating?.aggregateRating 

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300">
      <img
        src={imgurl}
        alt={`${primaryTitle} poster`}
        className="w-full h-72 object-cover"
      />
      <div className="p-4 text-center text-gray-100">
        <h3 className="text-lg font-semibold truncate">{primaryTitle}</h3>
        <p className="text-sm text-gray-400 mt-1">Type: {type}</p>
        <p className="text-sm text-gray-400">Year: {year}</p>
        <p className="text-yellow-400 mt-2 font-bold">
          {aggregateRating} ⭐
        </p>
      </div>
    </div>
  );
}