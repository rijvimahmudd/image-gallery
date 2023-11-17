import { useContext } from 'react';
import { GalleryContext, options } from '../../context/GalleryContext';
import Draggable from './Draggable';
import FileUpload from './FileUpload';
import Grid from './Grid';

import Photo from '../photo';
import useDnd from '../../hooks/useDnd';

const GalleryList = () => {
	const {
		DndContext,
		sensors,
		handleDragStart,
		handleDragEnd,
		closestCenter,
		rectSortingStrategy,
		SortableContext,
		DragOverlay,
	} = useDnd();

	const { images, activeId, handleChange } = useContext(
		GalleryContext
	) as unknown as options;

	return (
		<DndContext
			sensors={sensors}
			autoScroll={true}
			onDragStart={handleDragStart}
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
									<Photo
										key={image.id}
										src={image.src}
										alt={image.desc}
									/>
								))
						: null}
				</DragOverlay>
			</SortableContext>
		</DndContext>
	);
};

export default GalleryList;
