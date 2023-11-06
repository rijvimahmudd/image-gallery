import Gallery from './Gallery';
import GalleryHeader from './GalleryHeader';

const Canvas = () => {
	return (
		<div className="bg-white  border min-h-[600px] w-10/12 rounded-lg relative my-10">
			<GalleryHeader></GalleryHeader>
			<Gallery></Gallery>
		</div>
	);
};

export default Canvas;
