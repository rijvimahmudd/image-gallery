import { imageData } from '../context/GalleryContext';

class Storage {
	public save(key: string, data: imageData | imageData[]) {
		localStorage.setItem(key, JSON.stringify(data));
	}

	public get(key: string) {
		const json = localStorage.getItem(key);
		return JSON.parse(json as string);
	}
}

const storage = new Storage();
export default storage;
