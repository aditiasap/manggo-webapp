'use client';

import { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { endPoint } from '@/lib/config';

import Prompt from './Prompt';
import Gallery from './Gallery';
import Loading from './Loading';

const Content = (props) => {
	const [loading, setLoading] = useState(false);
	const [loadingState, setLoadingState] = useState('');
	const [prompt, setPrompt] = useState('');
	const [selectedStyle, setSelectedStyle] = useState('shonen');
	const [sessionId, setSessionId] = useState(null);
	const [listImages, setListImages] = useState([]);

	const didRun = useRef(false);
	useEffect(() => {
		// make sure to run only once at mount
		if (didRun.current) return;
		didRun.current = true;

		const storedSession = localStorage.getItem("sessionId");
		if (storedSession) {
			checkSession(storedSession);
			return;
		}
		acquireSession();
	}, []);

	const checkSession = async (sess) => {
		setLoading(true);
		const errorTitle = 'Failed to check session';

		try {
			const controller = new AbortController(); // for timeout
			const timeoutId = setTimeout(() => controller.abort(), endPoint.timeout);

			const res = await fetch(endPoint.url + `/check-session/${sess}`, {
				method: 'GET',
				signal: controller.signal
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
			if (!res.ok) {
				if(res.status === 401) {
					return acquireSession();
				}

				throw new Error(responseData?.message);
			}
			setSessionId(sess);
		}
		catch(err) {
			toast.error(err?.message || errorTitle);
		}
		finally {
			setLoading(false);
		}
	};
	const acquireSession = async () => {
		setLoading(true);
		const errorTitle = 'Failed to get the session';

		try {
			const controller = new AbortController(); // for timeout
			const timeoutId = setTimeout(() => controller.abort(), endPoint.timeout);

			const res = await fetch(endPoint.url + '/get-session', {
				method: 'GET',
				signal: controller.signal
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
			if (!res.ok) {
				throw new Error(responseData?.message);
			}

			localStorage.setItem("sessionId", responseData?.sessId);
			setSessionId(responseData?.sessId);

			// needed to return sessId due to invalid old one
			return responseData?.sessId;
		}
		catch(err) {
			toast.error(err?.message || errorTitle);
		}
		finally {
			setLoading(false);
		}
	};

	const getGallery = async () => {
		setLoading(true);
		const Authorization = 'Bearer ' + sessionId;
		const errorTitle = 'Failed to get the images';

		try {
			const controller = new AbortController(); // for timeout
			const timeoutId = setTimeout(() => controller.abort(), endPoint.timeout);

			const res = await fetch(endPoint.url + '/gallery', {
				method: 'GET',
				headers: {
					Authorization,
					'Content-Type': 'application/json',
				},
				signal: controller.signal
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
			if (!res.ok) {
				throw new Error(responseData?.message);
			}

			setListImages(responseData);
		}
		catch(err) {
			toast.error(err?.message || errorTitle);
		}
		finally {
			setLoading(false);
		}
	};

	return (
		<div className="">
			<Prompt
				prompt={prompt} setPrompt={setPrompt}
				selectedStyle={selectedStyle} setSelectedStyle={setSelectedStyle}
				sessionId={sessionId}
				setLoading={setLoading} setLoadingState={setLoadingState}
				acquireSession={acquireSession}
				getGallery={getGallery}
			/>
			<Gallery
				setPrompt={setPrompt} setSelectedStyle={setSelectedStyle}
				sessionId={sessionId}
				setLoading={setLoading}
				listImages={listImages}
				getGallery={getGallery}
			/>
			{
				loading &&
				<Loading message={loadingState} />
			}
		</div>
	);
};

export { Content as default };