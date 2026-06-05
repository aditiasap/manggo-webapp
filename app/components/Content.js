'use client';

const listStyles = [
	{
		id: 'shonen',
		name: 'Shonen',
		icon: '',
	},
	{
		id: 'shojo',
		name: 'Shojo',
		icon: '',
	},
	{
		id: 'gibli',
		name: 'Studio Gibli',
		icon: '',
	},
	{
		id: 'cyberpunk',
		name: 'Cyberpunk',
		icon: '',
	},
	{
		id: 'darkfan',
		name: 'Dark Fantasy',
		icon: '',
	},
];

const Content = (props) => {
	return (
		<div className="bg-white shadow-md rounded-md p-4">
			<p className="text-pink-700 font-semibold mb-4">PROMPT</p>
			<textarea
				placeholder="Describe your anime scene..."
				rows={5}
				className="
					w-full
					rounded-md
					border border-slate-300
					p-4
					placeholder:text-slate-400
					outline-none
					resize-none
					focus:border-pink-500
					focus:ring-2
					focus:ring-pink-500/30
					transition
				"
			/>
		</div>
	);
};

export { Content as default };