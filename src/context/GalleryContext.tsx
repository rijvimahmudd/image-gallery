import { UniqueIdentifier } from '@dnd-kit/core';
import { ReactElement, createContext, useState } from 'react';
import images from '../data/imageList.json';
import generateUuid from '../utils/uuid';

interface imageData {
	src: string;
	desc: string;
	id: string;
	isSelected: boolean;
}
export const GalleryContext = createContext({
	img: {} as imageData[],
	isSelected: false,
	lengthOfItems: 0,
	// setImg: () => {},
	handleDeleteFiles: () => {},
});

export interface options {
	img: imageData[];
	isSelected: boolean;
	lengthOfItems: number;
	handleDeleteFiles: () => void;
	setImg: React.Dispatch<React.SetStateAction<imageData[]>>;
	activeId: UniqueIdentifier | null;
	handleCheckboxChange: (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => void;

	setActiveId: React.Dispatch<React.SetStateAction<UniqueIdentifier | null>>;
}
const GalleryProvider = ({ children }: { children: ReactElement }) => {
	const [activeId, setActiveId] = useState<number | null | UniqueIdentifier>(
		null
	);

	const [selectedItems, setSelectedItems] = useState<number[]>([]);
	const [img, setImg] = useState<imageData[]>(
		images.map(image => {
			return {
				id: generateUuid(),
				isSelected: false,
				...image,
			};
		})
	);

	const handleDeleteFiles = () => {
		setSelectedItems([]);
		setImg(prev => {
			return prev.filter(image => {
				return image.isSelected === false;
			});
		});
	};

	const handleCheckboxChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		console.log(index);
		const updatedImg = [...img]; // Create a copy of the img state
		updatedImg[index].isSelected = !updatedImg[index].isSelected; // Toggle isSelected
		if (e.target.checked) {
			setSelectedItems([...selectedItems, index]);
		} else {
			setSelectedItems(selectedItems.filter(item => item !== index));
		}
		setImg(updatedImg); // Update the state with the modified image
	};
	// const resetImg = cb => {
	// 	setImg(prev => cb(prev));
	// };
	const options = {
		img,
		// resetImg,
		setImg,
		setActiveId,
		activeId,
		handleCheckboxChange,
		isSelected: selectedItems.length > 0,
		lengthOfItems: selectedItems.length,
		handleDeleteFiles,
	};
	return (
		<GalleryContext.Provider value={options}>
			{children}
		</GalleryContext.Provider>
	);
};

export default GalleryProvider;
