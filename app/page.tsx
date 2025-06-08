export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden text-white">
      {/* Background GIF */}
      <img
        src="/5.gif" // Put the .gif file in the /public folder
        alt="Background"
        className="fixed top-0 left-0 w-full h-full object-cover z-[-2]"
      />

      {/* Dark overlay */}
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-60 z-[-1]" />

      {/* Navbar */}
      <nav className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-lg p-6 w-80 text-center mb-8 w-full bg-gray-800/80 py-4 shadow-lg z-10">
        <div className="max-w-7xl mx-auto flex justify-center items-center">
          <h1 className="text-5xl font-extrabold text-white">شموزی</h1>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-8 text-center">
       
        <p className="text-lg md:text-xl mb-10 text-gray-200 max-w-xl">
          The sacred realm of chaos, memes, and questionable life choices.
        </p>

        {/* Custom Discord Join Card */}
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-lg p-6 w-80 text-center mb-8">
          <h3 className="text-4xl font-extrabold text-white mb-3">
           شموزی

          </h3>
          <p className="text-gray-200 mb-5">
            Be part of our growing community and chat with us!
          </p>
          <a
            href="https://discord.gg/Q9Zh2KYCxs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-full transition duration-300"
          >
           Summon Shamoozy
          </a>
        </div>

        {/* Discord Badge (optional) */}
        <a
          href="https://discord.gg/Q9Zh2KYCxs"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="h-10"
            src="https://www.parti.ai/content/images/2023/03/image.png"
            alt="Join Discord"
          />
        </a>
      </main>

      {/* Footer */}
      <footer className="backdrop-blur rounded-xl shadow-lg py-4 text-center text-sm text-gray-300 z-10">
        &copy; {new Date().getFullYear()} شموزی. All rights reserved.
      </footer>
    </div>
  );
}
