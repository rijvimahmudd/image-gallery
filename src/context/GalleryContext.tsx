import { UniqueIdentifier } from '@dnd-kit/core';
import { createContext, useState } from 'react';
import imgs from '../data/imageList.json';
import generateUuid from '../utils/uuid';

export interface imageData {
	src: string;
	desc: string;
	id: string;
	isSelected: boolean;
}

export interface options {
	images: imageData[];
	isSelected: boolean;
	lengthOfItems: number;
	handleDelete: () => void;
	setImages: React.Dispatch<React.SetStateAction<imageData[]>>;
	activeId: UniqueIdentifier | null;
	handleCheckbox: (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => void;
	uploadImage: (image: string, name: string) => void;
	setActiveId: React.Dispatch<React.SetStateAction<UniqueIdentifier | null>>;
}

const options = {
	images: {} as imageData[],
	isSelected: false,
	lengthOfItems: 0,
};
export const GalleryContext = createContext(options);

const GalleryProvider = ({ children }: { children: React.ReactNode }) => {
	/** load and make the image object */
	const [images, setImages] = useState(
		imgs.map(img => ({ ...img, id: generateUuid(), isSelected: false }))
	);
	/** initialize states */
	const [activeId, setActiveId] = useState<number | null | UniqueIdentifier>(
		null
	);

	/** looking for the selected items */
	const [selectedItems, setSelectedItems] = useState<number>(0);

	/** handle the checkbox event */

	const handleCheckBox = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		const updatedImg = [...images]; // Create a copy of the img state
		updatedImg[index].isSelected = !updatedImg[index].isSelected; // Toggle isSelected
		if (e.target.checked) {
			setSelectedItems(prev => prev + 1);
		} else {
			setSelectedItems(prev => prev - 1);
		}
		setImages(updatedImg);
	};

	/** delete the selected images */
	const handleDelete = () => {
		setSelectedItems(0);
		setImages(prev => {
			return prev.filter(image => {
				return image.isSelected === false;
			});
		});
	};

	const uploadImage = (img: string, desc: string) => {
		const newImg = {
			id: generateUuid(),
			src: img,
			desc: desc,
			isSelected: false,
		};
		setImages(prev => [...prev, newImg]);
	};

	const options = {
		images,
		activeId: activeId as unknown as UniqueIdentifier,
		setActiveId,
		setImages,
		handleDelete,
		isSelected: selectedItems > 0,
		lengthOfItems: selectedItems,
		handleCheckBox,
		uploadImage,
	};
	return (
		<GalleryContext.Provider value={options}>
			{children}
		</GalleryContext.Provider>
	);
};

export default GalleryProvider;
