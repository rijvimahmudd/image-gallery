import { useContext } from 'react';
import { GalleryContext, options } from '../../context/GalleryContext';

const GalleryHeader = () => {
	const { isSelected, lengthOfItems, handleDelete } = useContext(
		GalleryContext
	) as options;
	return (
		<div className="header h-14  w-full rounded-tr-lg rounded-t-lg border-b flex items-center justify-between px-12">
			{isSelected ? (
				<>
					<div className="flex items-center gap-3">
						<input
							type="checkbox"
							name="checkbox"
							checked={lengthOfItems === 0 ? false : true}
							className="accent-blue-700 outline-none
                    border-none
                    h-5 w-5"
						/>
						<span className="text-lg font-[500]">
							{lengthOfItems === 0
								? `No files selected`
								: lengthOfItems === 1
								? `${lengthOfItems} file selected`
								: `${lengthOfItems} files selected`}
						</span>
					</div>
					<button
						className="text-red-500 font-medium tracking-tight hover:underline"
						onClick={handleDelete}
					>
						{lengthOfItems === 0
							? ``
							: lengthOfItems === 1
							? `Delete file`
							: `Delete files`}
					</button>
				</>
			) : (
				<h3 className="text-xl font-semibold">Gallery</h3>
			)}
		</div>
	);
};

export default GalleryHeader;
