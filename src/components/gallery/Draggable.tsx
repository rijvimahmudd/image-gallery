import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useContext } from 'react';
import {
	GalleryContext,
	imageData,
	options,
} from '../../context/GalleryContext';
interface DraggableProps {
	id: string;
	src: string;
	desc: string;
	isSelected: boolean;
	index: number;
}

const Draggable = (props: DraggableProps) => {
	const { id, src, desc, isSelected } = props as unknown as imageData;
	const index = props.index as number;
	const { handleCheckbox } = useContext(GalleryContext) as options;
	const {
		attributes,
		setNodeRef,
		transform,
		transition,
		isDragging,
		listeners,
	} = useSortable({
		id: id,
	});

	const checkboxListeners = {
		onPointerDown: (e: React.PointerEvent) => {
			e.stopPropagation();
			e.preventDefault();
		},
		onKeyDown: (e: React.KeyboardEvent) => {
			e.stopPropagation();
			e.preventDefault();
		},
	};

	return (
		<div
			ref={setNodeRef}
			{...attributes}
			{...listeners}
			className={`border ${
				index === 0 && 'col-span-2 row-span-2'
			} w-full rounded-lg h-auto md:h-full cursor-pointer group/item hover:bg-slate-100 relative ${
				isSelected
					? ' '
					: isDragging
					? ''
					: `after:bg-gray-950 after:h-full after:w-full after:absolute after:top-0 after:left-0 after:hover:opacity-60 after:opacity-0`
			} after:transition-all after:duration-300 after:rounded-lg`}
			style={{
				transform: CSS.Transform.toString(transform),
				transition,
				zIndex: isDragging ? 100 : 0,
				transformOrigin: '0 0',
			}}
		>
			<img
				src={src}
				alt={desc}
				className={`w-full h-full rounded-lg object-scale-down ${
					isDragging
						? 'opacity-0'
						: isSelected
						? 'opacity-50'
						: 'opacity-100'
				}`}
			/>
			<input
				type="checkbox"
				name="checkbox"
				id=""
				className={`absolute top-5 left-5 accent-blue-700 outline-none cursor-pointer 
												border-none
												h-6 w-6 invisible group/edit ${
													isDragging
														? ''
														: `group-hover/item:visible 
												checked:visible`
												}
												z-10 `}
				onChange={e => handleCheckbox(e, index)}
				{...checkboxListeners}
			/>
		</div>
	);
};

export default Draggable;
