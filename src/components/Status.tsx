type StatusProps = {
  championFound: string;
};
function Status({ championFound }: StatusProps) {
  return (
    <div
      className={`fixed z-10 mt-4 rounded-md px-2 py-1 ${
        championFound ? 'bg-green-700' : 'bg-red-700 '
      }`}
    >
      <p className="text-center text-3xl font-bold tracking-wider text-gray-100">
        {championFound ? `You found ${championFound}!` : 'Keep Looking!'}
      </p>
    </div>
  );
}

export default Status;
