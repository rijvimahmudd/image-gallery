const FileUpload = ({
	handleChange,
}: {
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
	return (
		<div className="w-full rounded-lg border-2 border-dashed flex items-center justify-center">
			<label
				htmlFor="upload_image"
				className="h-full w-full flex flex-col items-center justify-center
									gap-3 cursor-pointer text-slate-700 md:text-sm"
			>
				<input
					type="file"
					name="upload_image"
					id="upload_image"
					className="hidden w-full h-full"
					multiple
					onChange={handleChange}
				/>
				<img src="/images/photo.png" className="w-4 h-auto"></img>
				Add Images
			</label>
		</div>
	);
};

export default FileUpload;
