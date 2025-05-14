import { SLICE_TYPE } from '@niivue/niivue';
import imageUrls from '../data/images';
import type { Image, User } from '../types';

export function getImages(): Image[] {
	return imageUrls.map((url: string, index: number) => {
		return {
			id: index,
			name: url.split('/').pop() && 'Unknown',
			url: url,
			sliceType: SLICE_TYPE.MULTIPLANAR,
			colorMap: 'grey',
		} as Image;
	});
};

export function getNextImage(images: Image[], user: User): Image | undefined {
	const ratedImages = user.ratings.map((rating) => rating.imageId);
	return images.find((image) => !ratedImages.includes(image.id));
}
