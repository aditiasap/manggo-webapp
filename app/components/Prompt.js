import {
	PiHeartStraightBold,
	PiSwordBold,
	PiCastleTurretBold,
	PiMagicWandBold,
} from 'react-icons/pi';
import {
	TbRobot,
} from 'react-icons/tb';
import {
	LuSparkles,
	LuLightbulb,
} from 'react-icons/lu';

const listStyles = [
	{
		id: 'shonen',
		name: 'Shonen',
		icon: PiSwordBold,
	},
	{
		id: 'shojo',
		name: 'Shojo',
		icon: PiHeartStraightBold,
	},
	{
		id: 'ghibli',
		name: 'Studio Ghibli',
		icon: LuSparkles,
	},
	{
		id: 'cyberpunk',
		name: 'Cyberpunk',
		icon: TbRobot,
	},
	{
		id: 'darkfan',
		name: 'Dark Fantasy',
		icon: PiCastleTurretBold,
	},
];

const Prompt = (props) => {
	const onNewPrompt = () => {
		props.setPrompt('');
		props.setSelectedStyle('shonen');
	};

	return (
		<div className="bg-white shadow-xl rounded-md py-4 mb-4">
			<div className="px-4 mb-4">
				<div className="flex justify-between items-center mb-2">
					<p className="text-pink-700 font-semibold">PROMPT</p>
					<button type="button"
						onClick={onNewPrompt}
						className="border px-4 py-2 border-slate-300
						rounded-md text-xs text-slate-600">
						New Prompt
					</button>
				</div>
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
					value={props.prompt}
					onChange={(e) => props.setPrompt(e.target.value)}
				/>
			</div>
			<div className="px-4 mb-8">
				<p className="text-pink-700 font-semibold mb-2">STYLE</p>
				<div className="flex flex-wrap gap-3">
					{
						listStyles.map((style) => {
							const isActive = props.selectedStyle === style.id;
							const AssIcon = style.icon;

							return (
								<button
									key={style.id}
									onClick={() => props.setSelectedStyle(style.id)}
									className={`
										flex items-center gap-2
										rounded-md
										px-4
										py-2
										text-xs
										transition
										border
										${
											isActive
											? 'border-pink-300 bg-pink-100'
											: 'border-slate-300 bg-white hover:border-pink-500'
										}
									`}
								>
									<AssIcon size={18} />
									{style.name}
								</button>
							);
						})
					}
				</div>
			</div>
			<div className="px-4 flex justify-between items-center">
				<div className="flex gap-2 text-slate-400 text-xs">
					<LuLightbulb size={16} />
					Tip: Be specific for better results!
				</div>
				<button type="button" className="flex items-center gap-2 rounded-lg
					bg-pink-500 px-6 py-2 text-white font-semibold text-base">
					<PiMagicWandBold size={18} />
					Generate
				</button>
			</div>
		</div>
	);
};

export { Prompt as default };