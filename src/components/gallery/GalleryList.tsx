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
import { GalleryContext, options } from '../../context/GalleryContext';
import Draggable from './Draggable';
import FileUpload from './FileUpload';
import Grid from './Grid';

const GalleryList = () => {
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(TouchSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	const { images, activeId, setActiveId, setImages, uploadImage } =
		useContext(GalleryContext) as unknown as options;

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (active.id !== over?.id) {
			setImages(prev => {
				const activeIndex = prev.findIndex(
					item => item.id === active.id
				);
				const overIndex = prev.findIndex(item => item.id === over?.id);
				return arrayMove(prev, activeIndex, overIndex);
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
					{images.map((img, index) => (
						<Draggable
							key={img.id}
							{...img}
							index={index}
							isSelected={img.isSelected}
						></Draggable>
					))}
					<FileUpload uploadImage={uploadImage} />
				</Grid>
				<DragOverlay adjustScale={true}>
					{activeId
						? images
								.filter(item => item.id === activeId)
								.map(image => (
									<div>
										<img
											key={image.id}
											src={image.src}
											alt={image.desc}
											className={`h-full w-full rounded-lg `}
										/>
									</div>
								))
						: null}
				</DragOverlay>
			</SortableContext>
		</DndContext>
	);
};

export default GalleryList;
