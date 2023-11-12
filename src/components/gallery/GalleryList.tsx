import {
	DndContext,
	DragEndEvent,
	DragOverlay,
	KeyboardSensor,
	PointerSensor,
	TouchSensor,
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
import { useContext } from 'react';
import { GalleryContext, key, options } from '../../context/GalleryContext';
import Draggable from './Draggable';
import FileUpload from './FileUpload';
import Grid from './Grid';
import storage from '../../utils/Storage';

const GalleryList = () => {
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(TouchSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	const { images, activeId, setActiveId, updateImagesList, handleChange } =
		useContext(GalleryContext) as unknown as options;

	if (!images) return null;

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (active.id !== over?.id) {
			updateImagesList(prev => {
				const activeIndex = prev.findIndex(
					item => item.id === active.id
				);
				const overIndex = prev.findIndex(item => item.id === over?.id);
				const newImgs = arrayMove(prev, activeIndex, overIndex);
				storage.save(key, newImgs);
				return newImgs;
			});
		}
	};
	return (
		<DndContext
			sensors={sensors}
			autoScroll={true}
			onDragStart={event => {
				setActiveId(event.active.id);
			}}
			onDragEnd={handleDragEnd}
			collisionDetection={closestCenter}
		>
			<SortableContext items={images} strategy={rectSortingStrategy}>
				<Grid>
					{images.length <= 0 &&
						Array(12)
							.fill(null)
							.map((_, index) => (
								<div
									key={index}
									className="flex min-h-[170px] h-full w-full items-center justify-center border-2 rounded-lg bg-slate-200 animate-pulse"
								/>
							))}
					{images.map((img, index) => (
						<Draggable
							key={img.id}
							{...img}
							index={index}
							isSelected={img.isSelected}
						/>
					))}

					{images.length > 0 && (
						<FileUpload handleChange={handleChange} />
					)}
				</Grid>
				<DragOverlay adjustScale={true}>
					{activeId
						? images
								.filter(item => item.id === activeId)
								.map(image => (
									<img
										key={image.id}
										src={image.src}
										alt={image.desc}
										className={`h-full w-full rounded-lg border-[1.5px] bg-white object-cover`}
									/>
								))
						: null}
				</DragOverlay>
			</SortableContext>
		</DndContext>
	);
};

export default GalleryList;
