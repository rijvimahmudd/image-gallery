import GalleryHeader from './GalleryHeader';
import GalleryList from './GalleryList';

const Gallery = () => {
	return (
		<div className="bg-white border min-h-[600px] w-10/12 rounded-lg relative mx-auto">
			<GalleryHeader />
			<GalleryList />
		</div>
	);
};

export default Gallery;
