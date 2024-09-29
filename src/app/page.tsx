import Link from 'next/link';
export default function Home() {
  // have a nice message which welcomes the user and then a button that links to the /messages page

  return (
    <main className='flex -mt-16 min-h-screen flex-col align-center justify-center items-center px-24'>
      <h2 className='text-2xl pb-6 text-gray-400'>Welcome to the Clerk Drizzle Kit example</h2>
      <Link href='/messages'>
        <div className='bg-[#00E699] cursor-pointer transition-colors hover:bg-[#00e5BF] text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none'>
          Go to Messages
        </div>
      </Link>
    </main>
  );
}
