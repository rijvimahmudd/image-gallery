import {
	DndContext,
	DragEndEvent,
	DragOverlay,
	DragStartEvent,
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
import storage from '../utils/Storage';
import { useContext } from 'react';
import { GalleryContext, options, key } from '../context/GalleryContext';

const useDnd = () => {
	const { setActiveId, updateImagesList } = useContext(
		GalleryContext
	) as unknown as options;

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(TouchSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

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

	const handleDragStart = (event: DragStartEvent) => {
		setActiveId(event.active.id);
	};

	return {
		sensors,
		handleDragEnd,
		handleDragStart,
		DndContext,
		DragOverlay,
		SortableContext,
		rectSortingStrategy,
		closestCenter,
		arrayMove,
	};
};

export default useDnd;
