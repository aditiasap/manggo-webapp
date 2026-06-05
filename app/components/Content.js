'use client';

import { useState } from 'react';

import Prompt from './Prompt';
import Gallery from './Gallery';

const Content = (props) => {
	const [prompt, setPrompt] = useState('');
	const [selectedStyle, setSelectedStyle] = useState('shonen');

	return (
		<div className="">
			<Prompt
				prompt={prompt} setPrompt={setPrompt}
				selectedStyle={selectedStyle} setSelectedStyle={setSelectedStyle}
			/>
			<Gallery
				setPrompt={setPrompt} setSelectedStyle={setSelectedStyle}
			/>
		</div>
	);
};

export { Content as default };