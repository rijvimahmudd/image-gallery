import { useContext, useState } from 'react';
import { GalleryContext, options } from '../context/GalleryContext';
import {
	DndContext,
	DragEndEvent,
	DragOverlay,
	DragStartEvent,
	KeyboardSensor,
	PointerSensor,
	closestCenter,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import {
	SortableContext,
	arrayMove,
	rectSortingStrategy,
	sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import Draggable from './Draggable';
import generateUuid from '../utils/uuid';

const Gallery = () => {
	const { img, setImg, setActiveId, activeId } = useContext(
		GalleryContext
	) as options;
	const [HW, setHW] = useState<{ height: number; width: number }>({
		height: 0,
		width: 0,
	});
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);
	const handleDragStart = (event: DragStartEvent) => {
		const { active } = event;

		setActiveId(active.id);
	};

	// const handleDragEnd = (event: DragEndEvent) => {
	//     const { active, over } = event;
	//     if (active.id !== over?.id) {
	//       setImg(prev => {
	//         const reorderedImages = [...prev];
	//         const srcIdx = prev.findIndex(item => item.id === active.id);
	//         const destIdx = prev.findIndex(item => item.id === over?.id);

	//         if (srcIdx !== -1 && destIdx !== -1) {
	//           const [movedImage] = reorderedImages.splice(srcIdx, 1);
	//           reorderedImages.splice(destIdx, 0, movedImage);
	//         }

	//         return reorderedImages;
	//       });
	//     }
	//   };

	console.log('HW', HW);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		console.log('event ->>', event);
		// console.log('index 0 ->>', img[0]);
		setHW({
			height: event.over?.rect.height || 0,
			width: event.over?.rect.width || 0,
		});
		if (active.id !== over?.id) {
			setImg(prev => {
				const activeIndex = prev.findIndex(
					item => item.id === active.id
				);
				const overIndex = prev.findIndex(item => item.id === over?.id);
				return arrayMove(prev, activeIndex, overIndex);
			});
		}
	};

	// const handleDragMove = (event: DragMoveEvent) => {
	// 	setHW({
	// 		height: event.over?.rect.height || 0,
	// 		width: event.over?.rect.width || 0,
	// 	});
	// };
	return (
		<DndContext
			// onDragMove={handleDragMove}
			// onDragCancel={() => {
			// 	console.log('cancel');
			// 	setActiveId(null);
			// }}
			onDragStart={handleDragStart}
			// onDragEnd={() => setActiveId(null)}
			onDragEnd={handleDragEnd}
			sensors={sensors}
			collisionDetection={closestCenter}
		>
			<SortableContext items={img} strategy={rectSortingStrategy}>
				<div className="grid grid-cols-[repeat(5,_minmax(160px,1fr))] gap-6 justify-items-start w-full h-auto px-12 my-4 auto-rows-[minmax(160px,1fr)]">
					{img?.map((image, index) => {
						return (
							<Draggable
								index={index}
								key={image.id}
								{...image}
								isSelected={image.isSelected}
							></Draggable>
						);
					})}

					<DragOverlay adjustScale>
						{activeId
							? img
									.filter(item => item.id === activeId)
									.map(image => (
										<div>
											<img
												key={image.id}
												src={image.src}
												alt={image.desc}
												className={`h-auto w-full rounded-lg `}
											/>
										</div>
									))
							: null}
					</DragOverlay>

					<div className="w-full rounded-lg border-2 border-dashed flex items-center justify-center">
						<label
							htmlFor="upload_image"
							className="h-full w-full flex flex-col items-center justify-center
									gap-3 cursor-pointer text-slate-700"
						>
							<input
								type="file"
								name="upload_image"
								id="upload_image"
								className="hidden"
								onChange={e => {
									const file = e.target.files?.[0];

									if (file) {
										// Create a URL for the selected image
										const imageURL =
											URL.createObjectURL(file);

										// Construct an image object to store in your array
										const imageObject = {
											id: generateUuid(), // You can use a function to generate a unique ID
											src: imageURL, // Store the URL of the image
											desc: 'Description for the image', // Provide a default description or prompt the user for one
											isSelected: false, // You can set this to true if needed
											// Add other properties as needed
										};
										console.log('imageObject', imageObject);

										// Push the image object to your array
										setImg(prev => [...prev, imageObject]);
										// URL.revokeObjectURL(imageURL);
									}
								}}
							/>
							<img
								src="/images/photo.png"
								className="w-4 h-auto"
							></img>
							Add Images
						</label>
					</div>
				</div>
			</SortableContext>
		</DndContext>
	);
};

export default Gallery;
