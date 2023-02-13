type StatusProps = {
  isChampionFound: boolean;
  championsFound: string[];
};
function Status({ isChampionFound, championsFound }: StatusProps) {
  return (
    <div
      className={`fixed z-10 mt-4 rounded-md px-2 py-1 ${
        isChampionFound ? 'bg-green-700' : 'bg-red-700 '
      }`}
    >
      <p className="text-center text-3xl font-bold tracking-wider text-gray-100">
        {isChampionFound
          ? `You found ${championsFound.at(-1)}!`
          : 'Keep Looking!'}
      </p>
    </div>
  );
}

export default Status;
