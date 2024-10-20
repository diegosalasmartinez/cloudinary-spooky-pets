<script lang="ts">
	import { CldUploadWidget, type CloudinaryUploadWidgetResults } from 'svelte-cloudinary';
	import { goto } from '$app/navigation';

	const handleUpload = (event: CloudinaryUploadWidgetResults) => {
		if (event.event === 'success') {
			if (!event.info) return;

			if (typeof event.info === 'string') {
				console.log('success', event.info);
			} else {
				goto(`/transform/${event.info.public_id}`);
			}
		}
	};
</script>

<section>
	<h1>Give your pet a</h1>
	<h2 class="spooky">spooky transformation!</h2>
	<p>
		Upload a photo of your pet and watch them transform into a spooky creature! Whether it's turning
		your cat into a ghost or your dog into a pumpkin, we've made it simple, fun, and accessible for
		everyone.
	</p>
	<div id="button-container">
		<CldUploadWidget
			let:open
			let:isLoading
			options={{
				sources: ['local'],
				multiple: false,
				maxFiles: 1
			}}
			onUpload={handleUpload}
		>
			<button on:click={() => open()} disabled={isLoading}>Upload a photo</button>
		</CldUploadWidget>
	</div>
</section>

<style>
	h1 {
		margin-top: 40px;
		margin-bottom: 10px;
		font-size: 40px;
	}

	h2 {
		font-family: 'HalloweenMorning', sans-serif;
		font-size: 50px;
		line-height: 50px;
	}

	p {
		color: white;
		text-align: center;
		font-size: 22px;
		line-height: 30px;
		margin-top: 50px;
		text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.8);
	}

	@media (min-width: 440px) {
		h1 {
			font-size: 50px;
		}

		h2 {
			font-size: 60px;
			line-height: 60px;
		}
	}

	@media (min-width: 640px) {
		h1 {
			font-size: 65px;
		}

		h2 {
			font-size: 80px;
			line-height: 80px;
		}
	}

	@media (min-width: 768px) {
		h1 {
			font-size: 72px;
		}

		h2 {
			font-size: 100px;
			line-height: 100px;
		}

		p {
			font-size: 24px;
            line-height: 32px;
		}
	}

	#button-container {
		display: flex;
		justify-content: center;
		margin-top: 50px;
	}

	button {
		background-color: var(--primary-color);
		color: white;
		padding: 10px 20px;
		border: none;
		border-radius: 5px;
		font-size: 18px;
		cursor: pointer;
		box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.8);
	}
</style>
