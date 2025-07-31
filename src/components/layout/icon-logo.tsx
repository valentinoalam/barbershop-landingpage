import Link from 'next/link';

const IconLogo = ({ title = "Your App" }) => {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
        <svg
          className="w-5 h-5 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <span className="text-xl font-bold text-gray-900 dark:text-white">
        {title}
      </span>
    </Link>
  );
};

export default IconLogo;