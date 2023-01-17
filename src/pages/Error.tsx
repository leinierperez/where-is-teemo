import { Link } from 'react-router-dom';

export default function Error() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2 bg-gray-900 text-4xl text-white">
      <h1>Oops!</h1>
      <h1 className="text-5xl font-bold">404</h1>
      <p className="text-center">Sorry, an unexpected error has occurred.</p>
      <Link to="/" className="rounded-md bg-cyan-700 px-5 py-2 font-bold">
        Go home
      </Link>
    </div>
  );
}
