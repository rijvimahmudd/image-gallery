import { UniqueIdentifier } from '@dnd-kit/core';
import { ReactElement, createContext, useState } from 'react';
import images from '../data/imageList.json';
import generateUuid from '../utils/uuid';

/** GalleryContext */

interface imageData {
	src: string;
	desc: string;
	id: string;
	isSelected: boolean;
}
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

/** creating a context */
export const GalleryContext = createContext({
	img: {} as imageData[],
	isSelected: false,
	lengthOfItems: 0,
	handleDeleteFiles: () => {},
});

/** creating the provider for the context and passing the children to it as props to be rendered in the parent */
const GalleryProvider = ({ children }: { children: ReactElement }) => {
	/** initialize the states */

	/**  activeId is the id of the image that is currently being dragged */
	const [activeId, setActiveId] = useState<number | null | UniqueIdentifier>(
		null
	);

	/** initialize images with states
	 * img is the array of images
	 * here we are processing the properties of the images and generate id and other properties dynamically
	 */
	const [img, setImg] = useState<imageData[]>(
		images.map(image => {
			return {
				id: generateUuid(),
				isSelected: false,
				...image,
			};
		})
	);
	/** it is used to store the ids of the images that are selected via checkbox */
	const [selectedItems, setSelectedItems] = useState<number[]>([]);

	/** it is used to delete the images which are selected via checkbox */
	const handleDeleteFiles = () => {
		setSelectedItems([]);
		setImg(prev => {
			return prev.filter(image => {
				return image.isSelected === false;
			});
		});
	};

	/** it is used to handle the checkbox change */
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
	// const resetImg = (cb: (prev: imageData[]) => unknown) => {
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
