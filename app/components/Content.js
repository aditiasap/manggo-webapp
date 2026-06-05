'use client';

import { useState } from 'react';

import {
	PiHeartStraightBold,
	PiSwordBold,
	PiCastleTurretBold,
} from 'react-icons/pi';
import {
	TbRobot,
	TbChevronDown,
} from 'react-icons/tb';
import {
	LuSparkles,
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
/*const listStyles = [
	{
		id: 'shonen',
		name: 'Shonen',
		icon: PiSwordBold,
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
];*/

const Content = (props) => {
	const [selectedStyle, setSelectedStyle] = useState('shonen');

	return (
		<div className="bg-white shadow-xl rounded-md py-4">
			<div className="px-4 mb-4">
				<p className="text-pink-700 font-semibold mb-2">PROMPT</p>
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
			<div className="px-4">
				<p className="text-pink-700 font-semibold mb-2">STYLE</p>
				<div className="flex flex-wrap gap-3">
					{
						listStyles.map((style) => {
							const isActive = selectedStyle === style.id;
							const AssIcon = style.icon;

							return (
								<button
									key={style.id}
									onClick={() => setSelectedStyle(style.id)}
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
		</div>
	);
};

export { Content as default };