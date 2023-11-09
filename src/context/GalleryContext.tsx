import { UniqueIdentifier } from '@dnd-kit/core';
import { createContext, useState } from 'react';
import imgs from '../data/imageList.json';
import generateUuid from '../utils/uuid';
import convertToBase64 from '../utils/imgTo64';

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
	uploadImage: (files: File[]) => void;
	setActiveId: React.Dispatch<React.SetStateAction<UniqueIdentifier | null>>;
	handleCheckBox: (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => void;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		const files = [...(e.target.files as FileList)];

		if (files && files.length > 0) {
			uploadImage(files);
		}
		e.target.value = '';
		e.target.files = null;
	};
	const uploadImage = (files: File[]): void => {
		const len = files.length;

		if (files && len > 0) {
			for (let i = 0; i < len; i++) {
				convertToBase64(files[i])?.then(res => {
					const newImg = {
						id: generateUuid(),
						src: res as string,
						desc: files[i].name,
						isSelected: false,
					};
					setImages(prev => [...prev, newImg]);
				});
			}
		}
	};
	// setImages(prev => [...prev, newImg]);
	const options = {
		images,
		activeId: activeId as unknown as UniqueIdentifier,
		setActiveId,
		setImages,
		handleDelete,
		isSelected: selectedItems > 0,
		lengthOfItems: selectedItems,
		handleCheckBox: handleCheckBox,
		handleChange,
	};
	return (
		<GalleryContext.Provider value={options}>
			{children}
		</GalleryContext.Provider>
	);
};

export default GalleryProvider;
