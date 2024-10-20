<script lang="ts">
	import { getCldImageUrl } from 'svelte-cloudinary';
	import { writable } from 'svelte/store';

	export let data;

	const isLoading = writable(false);
	const imageSrc = writable(data.url);
	const MAX_RETRIES = 3;

	type EFFECT = 'zombies' | 'ghost' | 'pumpkin' | 'witch' | 'frankenstein';

	const handleEffect = (effect: EFFECT, retries = 0) => {
		isLoading.set(true);

		const url = getCldImageUrl({
			src: data.url,
			replaceBackground: `Add ${effect} to the background`
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
	<h1>Cloudinary Spooky Pets</h1>
	<div id="effect-buttons">
		<button on:click={() => handleEffect('zombies')} disabled={$isLoading}>Zombies</button>
		<button on:click={() => handleEffect('ghost')} disabled={$isLoading}>Ghost</button>
		<button on:click={() => handleEffect('pumpkin')} disabled={$isLoading}>Pumpkin</button>
		<button on:click={() => handleEffect('witch')} disabled={$isLoading}>Witch</button>
		<button on:click={() => handleEffect('frankenstein')} disabled={$isLoading}>Frankenstein</button
		>
	</div>
	<div id="image-container">
		{#if $isLoading}
			<p>Loading...</p>
		{:else}
			<img src={$imageSrc} alt="Uploaded Image" height="auto" width="500" />
		{/if}
	</div>
</section>

<style>
	h1 {
		font-size: 40px;
		text-align: center;
		color: var(--primary-color);
	}

	#effect-buttons {
		display: flex;
		justify-content: center;
		gap: 10px;
		margin-top: 20px;
		margin-bottom: 20px;
	}

	#effect-buttons button {
	}

	#image-container {
		display: flex;
		justify-content: center;
		margin: 0 auto;
	}

	img {
		max-width: 500px;
		width: 100%;
		height: auto;
		border-radius: 10px;
	}
</style>
