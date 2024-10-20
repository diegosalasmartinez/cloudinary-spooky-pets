<script lang="ts">
	import { getCldImageUrl } from 'svelte-cloudinary';
	import { writable } from 'svelte/store';

	export let data;

	const isLoading = writable(false);
	const imageSrc = writable(data.url);
	const MAX_RETRIES = 3;

	type EFFECT = 'zombie' | 'ghost' | 'witch';

	const getBackgroundPrompt = (effect: EFFECT) => {
		switch (effect) {
			case 'zombie':
				return `Add a scary zombies and creepy graveyard to the background.`;
			case 'ghost':
				return `Add a dark and spooky abandoned house and scary ghosts to the background.`;
			//return `Add a dark and spooky abandoned house in the background with swirling fog and scary ghostly figures floating.`;
			case 'witch':
				return `Add a spooky witch in the top with dark shadows and eerie background.`;
			//return `Add a witch's cauldron with glowing smoke and a dark, eerie forest background.`;
			//return `Add a witch's cauldron with glowing green smoke, dark stormy skies, and eerie trees to the background.`;
			default:
				return '';
		}
	};

	const handleEffect = (effect: EFFECT, retries = 0) => {
		isLoading.set(true);

		const prompt = getBackgroundPrompt(effect);

		const url = getCldImageUrl({
			src: data.url,
			replaceBackground: prompt,
			height: 300,
			width: 300,
			crop: 'fill',
			gravity: 'auto',
			format: 'auto',
			quality: 'auto'
		});

		const img = new Image();
		img.src = url;

		img.onload = () => {
			imageSrc.set(url);
			isLoading.set(false);
		};

		img.onerror = () => {
			if (retries < MAX_RETRIES) {
				console.log(`Retrying... (${retries + 1}/${MAX_RETRIES})`);
				setTimeout(() => handleEffect(effect, retries + 1), 1000);
			} else {
				console.error('Error loading the transformed image after multiple retries.');
				isLoading.set(false);
			}
		};
	};
</script>

<section>
	<h1>Spookify your pet</h1>
	<div id="effect-buttons">
		<button id="zombie" on:click={() => handleEffect('zombie')} disabled={$isLoading}
			>Zombies</button
		>
		<button id="ghost" on:click={() => handleEffect('ghost')} disabled={$isLoading}>Ghost</button>
		<button id="witch" on:click={() => handleEffect('witch')} disabled={$isLoading}>Witch</button>
	</div>
	<div id="image-container">
		{#if $isLoading}
			<p>Loading...</p>
		{:else}
			<img src={$imageSrc} alt="Your spookify pet" width="300" height="300" />
		{/if}
	</div>
</section>

<style>
	h1 {
		font-size: 40px;
		margin-top: 40px;
		margin-bottom: 10px;
		text-align: center;
	}

	@media (min-width: 440px) {
		h1 {
			font-size: 50px;
		}
	}

	@media (min-width: 640px) {
		h1 {
			font-size: 65px;
		}
	}

	@media (min-width: 768px) {
		h1 {
			font-size: 72px;
		}
	}

	#effect-buttons {
		display: flex;
		justify-content: center;
		gap: 10px;
		margin-top: 20px;
		margin-bottom: 40px;
	}

	#effect-buttons button {
		padding: 10px 15px;
		border: none;
		font-size: 16px;
		cursor: pointer;
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
		border-radius: 5px;
		margin: 5px;
	}

	#effect-buttons button:hover {
		transform: scale(1.1);
	}

	#effect-buttons button#zombie {
		background-color: #556b2f;
		color: #f0e68c;
		box-shadow: 0 0 4px rgba(34, 139, 34, 0.6);
	}

	#effect-buttons button#ghost {
		background-color: #f8f8ff;
		color: #696969;
		box-shadow: 0 0 4px rgba(173, 216, 230, 0.9);
	}

	#effect-buttons button#witch {
		background-color: #4b0082;
		color: #ff4500;
		box-shadow: 0 0 4px rgba(255, 69, 0, 0.6);
	}

	#image-container {
		display: flex;
		justify-content: center;
		margin: 0 auto;
	}

	img {
		width: 100%;
		height: 100%;
		max-width: 300px;
		max-height: 300px;
		width: auto;
		border-radius: 10px;
	}
</style>
