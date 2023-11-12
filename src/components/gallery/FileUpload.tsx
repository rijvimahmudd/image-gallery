import Photo from '../photo';

const FileUpload = ({
	handleChange,
}: {
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
	return (
		<div className="w-full rounded-lg border-2 border-dashed flex items-center justify-center">
			<label
				htmlFor="uploadImage"
				className="h-full w-full flex flex-col items-center justify-center
									gap-3 cursor-pointer text-slate-700 md:text-sm"
			>
				<input
					type="file"
					name="uploadImage"
					className="hidden w-full h-full"
					multiple
					onChange={handleChange}
				/>
				<Photo
					src="/images/photo.png"
					alt="upload photo"
					className="w-4 h-auto rounded-none border-none"
				/>
				Add Images
			</label>
		</div>
	);
};

export default FileUpload;
