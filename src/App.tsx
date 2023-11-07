import './App.css';
import PresentationLinks from './components/useful-links/PresentationLinks';
import Gallery from './components/gallery';
import GalleryProvider from './context/GalleryContext';

function App() {
	return (
		<GalleryProvider>
			<div className="flex md:flex-row flex-col md:items-start md:justify-around justify-center mx-auto w-full my-10 items-center gap-5 md:gap-0">
				<Gallery />
				<PresentationLinks></PresentationLinks>
			</div>
		</GalleryProvider>
	);
}

export default App;
