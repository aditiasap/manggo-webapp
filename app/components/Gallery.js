import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiDownload, FiClock, FiEye, FiX } from 'react-icons/fi';
import { LuImages, LuRefreshCw } from 'react-icons/lu';
import { formatDistanceToNow } from 'date-fns';

const Gallery = (props) => {
	const [selectedImage, setSelectedImage] = useState(null);

	useEffect(() => {
		if (!props.sessionId) return;

		props.getGallery();
	}, [props.sessionId]);

	const onDownload = async (item) => {
		try {
			const response = await fetch(item.image);
			const blob = await response.blob();

			const url = window.URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = url;

			const now = new Date();
			link.download = `manggo-${now.getTime()}.png`;
			document.body.appendChild(link);
			link.click();
			link.remove();
			window.URL.revokeObjectURL(url);
		} catch (error) {
			console.error('Download failed', error);
		}
	};
	const onReusePrompt = (item) => {
		props.setPrompt(item.prompt);
		props.setSelectedStyle(item.style);
	};

	return (
		<>
			<div className="mt-8 py-4">
				<div className="px-4 mb-4 flex gap-6 items-center">
					<LuImages size={32} className="text-pink-700" />
					<div className="">
						<p className="font-semibold text-lg font-poppins text-pink-700">
							Your Creations
						</p>
						<p className="text-slate-500">
							All your generated anime images
						</p>
					</div>
				</div>
				<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
					{
						props.listImages && props.listImages.map((item) => (
							<div
								key={item.id}
								className="group overflow-hidden rounded-xl shadow-lg">
								<div className="relative aspect-square overflow-hidden">
									<Image
										src={item.image}
										alt={item.prompt}
										fill
										className="object-cover transition duration-300
											group-hover:scale-105"
									/>
								</div>
								<div className="space-y-2 p-4">
									<p className="font-semibold">
										{item.prompt}
									</p>
									<div className="text-xs text-slate-400 flex gap-2
										items-center">
										<FiClock size={14} />
										{formatDistanceToNow(new Date(item.createdAt),
											{ addSuffix: true }
										)}
									</div>
									<div className="flex items-center justify-between
										text-xs mt-4">
										<button type="button"
											onClick={() => setSelectedImage(item)}
											className="px-4 py-2 border-[1px] border-slate-300
												rounded-md flex gap-2 items-center">
											<FiEye size={14} />
											View
										</button>
										<button type="button"
											onClick={() => onReusePrompt(item)}
											className="px-4 py-2 border-[1px] border-slate-300
												rounded-md flex gap-2 items-center">
											<LuRefreshCw size={14} />
											Reuse Prompt
										</button>
										<button type="button"
											onClick={() => onDownload(item)}
											className="px-4 py-2 border-[1px] border-slate-300
												rounded-md">
											<FiDownload size={14} />
										</button>
									</div>
								</div>
							</div>
						))
					}
				</div>
			</div>
			{selectedImage && (
				<div
					onClick={() => setSelectedImage(null)}
					className="fixed inset-0 z-50 bg-black/90
						flex items-center justify-center p-4">
					<button type="button"
						onClick={() => onDownload(selectedImage)}
						className="absolute top-4 right-16 text-white">
						<FiDownload size={28} />
					</button>
					<button
						onClick={() => setSelectedImage(null)}
						className="absolute top-4 right-4 text-white">
						<FiX size={28} />
					</button>
					<div
						onClick={(e) => e.stopPropagation()}
						className="relative w-full h-full max-w-5xl max-h-[90vh]">
						<Image
							src={selectedImage.image}
							alt={selectedImage.prompt}
							fill
							className="object-contain"
						/>
					</div>
				</div>
			)}
		</>
	);
};

export { Gallery as default };