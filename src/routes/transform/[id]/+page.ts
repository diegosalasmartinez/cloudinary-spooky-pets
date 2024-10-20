import { getCldImageUrl } from 'svelte-cloudinary';

export async function load({ params }: { params: { id: string } }) {
	const url = getCldImageUrl({
		src: params.id,
		width: 500,
		crop: 'scale'
	});

	return {
		url
	};
}
