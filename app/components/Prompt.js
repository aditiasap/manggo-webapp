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
import toast from 'react-hot-toast';
import { endPoint } from '@/lib/config';

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
	const submitPrompt = async () => {
		props.setLoading(true);
		props.setLoadingState('');
		try {
			let session = props.sessionId;
			let result = await generateImage(session);
			if (result.status === 401) {
				session = await props.acquireSession();
				result = await generateImage(session);
			}

			if (!result.ok) {
				throw new Error(result.data?.message || 'Failed to generate image');
			}

			const jobId = result.data.jobId;

			// start polling
			pollJobStatus(jobId, session);
			props.setLoadingState('queueing');

			return jobId;
		} catch (err) {
			toast.error(err?.message || 'Failed to submit prompt');
			props.setLoading(false);
		}
	};
	const generateImage = async (sess) => {
		const errorTitle = 'Failed to submit prompt';
		const Authorization = 'Bearer ' + sess;

		const data = {
			prompt: props.prompt,
			style: props.selectedStyle,
		};

		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), endPoint.timeout);

		try {
			const res = await fetch(endPoint.url + '/generate-image', {
				method: 'POST',
				headers: {
					Authorization,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
				signal: controller.signal,
			});
			clearTimeout(timeoutId);

			let responseData;
			try {
				responseData = await res.json();
			} catch {
				responseData = null;
			}
			if (!responseData) {
				throw new Error(errorTitle + ': Invalid server response');
			}

			return {
				ok: res.ok,
				status: res.status,
				data: responseData,
			};
		} catch (err) {
			if (err?.name === "AbortError") {
				throw new Error("Request timeout");
			}
			throw err;
		}
	};
	// Polling status
	const pollJobStatus = async (jobId, sess) => {
		const Authorization = 'Bearer ' + sess;
		const interval = 3000; // 3s polling

		const check = async () => {
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), endPoint.timeout);
			try {
				const res = await fetch(`${endPoint.url}/statuscheck/${jobId}`, {
					method: 'GET',
					headers: {
						Authorization,
						'Content-Type': 'application/json',
					},
					signal: controller.signal
				});
				clearTimeout(timeoutId);

				const data = await res.json();
				if (!res.ok) {
					throw new Error(data?.message || 'Failed to check status');
				}

				// update loading state
				props.setLoadingState(data.status);

				// STOP condition
				if (data.status === 'success' || data.status === 'failed') {
					if (data.status === 'success') {
						props.getGallery();						
					}
					else {
						props.setLoading(false);
						toast.error(data?.error || 'Image creation failed');
					}
					return;
				}

				// loop again
				setTimeout(check, interval);
			} catch (err) {
				toast.error(err?.message || 'Polling error');
				props.setLoading(false);
			}
		};

		check();
	};

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
					maxLength={1000}
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
				<p className="text-xs text-right text-slate-500 italic">
					{1000 - props.prompt.length} characters left
				</p>
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
				<button type="button"
					onClick={submitPrompt}
					className="flex items-center gap-2 rounded-lg
						bg-pink-500 px-6 py-2 text-white font-semibold">
					<PiMagicWandBold size={18} />
					Generate Image
				</button>
			</div>
		</div>
	);
};

export { Prompt as default };