import './App.css';
import GalleryProvider from './context/GalleryContext';
import Canvas from './components/Canvas';

function App() {
	return (
		<GalleryProvider>
			<div className="min-h-screen bg-green-50 flex items-center content-center justify-center">
				<Canvas></Canvas>
			</div>
		</GalleryProvider>
	);
}

export default App;
