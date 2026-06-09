import Image from 'next/image';

import Content from './components/Content';

const HomePage = (props) => {
	return (
		<main className="min-h-screen bg-gradient-to-b from-orange-50 via-pink-50 to-white
			py-2 px-4 lg:px-12 flex flex-col">
			<header className="py-2">
				<Image
					src={"/manggo/images/logo_manggo_landscape.png"}
					width={1000}
					height={0}
					alt="App Logo"
					className="object-contain w-1/2 lg:w-1/6 mx-auto"
					priority
				/>
				<h1 className="mt-2 text-center text-pink-700 font-semibold text-lg font-poppins">
					Manga on the Go
				</h1>
				<h2 className="text-center text-slate-500">AI Anime Image Generator</h2>
			</header>
			<section className="py-6 flex-1">
				<Content />
			</section>
			<footer className="p-2 text-center text-slate-500 text-xs italic">
				Made with 💖 for anime lovers 🥭
			</footer>
		</main>
	);
};

export { HomePage as default };