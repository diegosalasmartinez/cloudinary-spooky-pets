import { getCldImageUrl } from 'svelte-cloudinary';

export async function load({ params }: { params: { id: string } }) {
	const url = getCldImageUrl({
		src: params.id,
		height: 300,
		width: 300,
		crop: 'fill',
		gravity: 'auto',
		format: 'jpg',
		quality: 'auto'
	});

	return {
		url
	};
}
