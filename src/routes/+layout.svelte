<script lang="ts">
	import '../app.css';
	import { configureCloudinary } from 'svelte-cloudinary';

	configureCloudinary({
		cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
		apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY,
		uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
	});
</script>

<svelte:head>
	<title>Cloudinary Spooky Pets</title>
	<meta name="description" content="TODO: Complete this" />
</svelte:head>

<div class="app">
	<main>
		<slot />
	</main>
</div>
