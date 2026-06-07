import Loader from "react-spinners/PulseLoader";

const Loading = (props) => {
	return (
		<div
			className="fixed top-0 left-0 right-0 bottom-0
				flex justify-center items-center z-50"
		>
			<div className="px-4 py-2 flex items-center rounded-md
				space-x-2 animate-pulse">
				<p className="text-pink-700 text-base italic">{props.message || ''}</p>
				<Loader
					color="#be185d" size={8}
				/>
			</div>
		</div>
	);
};

export { Loading as default };