import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';

const Draggable = ({
	id,
	index,
	src,
	desc,
	isSelected,
	handleCheckboxChange,
}) => {
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
	const {
		attributes,
		setNodeRef,
		transform,
		transition,
		isDragging,
		listeners,
		data,
	} = useSortable({
		id: id,
		getNewIndex: () => index,
	});
	// console.log('data', data);

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		zIndex: isDragging ? 100 : 0,
	};

	return (
		<div
			style={style}
			{...attributes}
			{...listeners}
			ref={setNodeRef}
			className={`border ${
				index === 0 ? 'col-span-2 row-span-2' : ''
			} w-full rounded-lg cursor-pointer group/item hover:bg-slate-100 relative ${
				isSelected
					? ' '
					: isDragging
					? ''
					: `after:bg-gray-950 after:h-full after:w-full after:absolute after:top-0 after:left-0 after:hover:opacity-60 after:opacity-0`
			} after:transition-all after:duration-300 after:rounded-lg`}
		>
			<img
				src={src}
				alt={desc}
				className={`h-auto w-full rounded-lg ${
					isDragging
						? 'opacity-0'
						: isSelected
						? 'opacity-50'
						: 'opacity-100'
				} `}
			/>
			<div className="">
				<input
					type="checkbox"
					name="checkbox"
					id=""
					className={`absolute top-5 left-5 accent-blue-700 outline-none
												border-none
												h-6 w-6 invisible group/edit ${
													isDragging
														? ''
														: `group-hover/item:visible 
												checked:visible`
												}
												z-10 `}
					onChange={e => handleCheckboxChange(e, index)}
					{...checkboxListeners}
				/>
			</div>
		</div>
	);
};

export default Draggable;
