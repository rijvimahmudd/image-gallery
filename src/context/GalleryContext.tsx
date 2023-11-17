import { UniqueIdentifier } from '@dnd-kit/core';
import { createContext, useEffect, useState } from 'react';
import imgs from '../data/imageList.json';
import generateUuid from '../utils/uuid';
import convertToBase64 from '../utils/imgTo64';
import storage from '../utils/Storage';

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
	activeId: UniqueIdentifier | null;
	uploadImage: (files: File[]) => void;
	setActiveId: React.Dispatch<React.SetStateAction<UniqueIdentifier | null>>;
	handleCheckBox: (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => void;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	updateImagesList: (fn: (prev: imageData[]) => imageData[]) => void;
}

const options = {
	images: {} as imageData[],
	isSelected: false,
	lengthOfItems: 0,
};
export const GalleryContext = createContext(options);
export const key = 'gallery';

const GalleryProvider = ({ children }: { children: React.ReactNode }) => {
	/** load and make the image object */
	const [images, setImages] = useState<imageData[]>([]);

	useEffect(() => {
		const data = storage.get(key);
		if (data) {
			setImages(data);
		} else {
			setImages(
				imgs.map(img => ({
					...img,
					id: generateUuid(),
					isSelected: false,
				}))
			);
		}
	}, []);

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
			const newImgs = prev.filter(image => {
				return image.isSelected === false;
			});

			storage.save(key, newImgs);
			return newImgs;
		});
	};
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		images;
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
			const promises = files.map(file => {
				return convertToBase64(file)?.then(res => {
					return {
						id: generateUuid(),
						src: res as string,
						desc: file.name,
						isSelected: false,
					};
				});
			});

			Promise.all(promises)
				.then(newImages => {
					if (newImages) {
						setImages(prevImages => [
							...prevImages,
							...(newImages as imageData[]),
						]);
					}

					// Save all new images to storage
					storage.save(key, [
						...images,
						...(newImages as imageData[]),
					]);
				})
				.catch(error => {
					console.error('Error converting images to base64:', error);
				});
		}
	};

	const updateImagesList = (cb: (prev: imageData[]) => imageData[]) => {
		setImages(prev => cb(prev));
	};

	const options = {
		images,
		activeId: activeId as unknown as UniqueIdentifier,
		setActiveId,
		handleDelete,
		isSelected: selectedItems > 0,
		lengthOfItems: selectedItems,
		handleCheckBox,
		handleChange,
		updateImagesList,
	};
	return (
		<GalleryContext.Provider value={options}>
			{children}
		</GalleryContext.Provider>
	);
};

export default GalleryProvider;
