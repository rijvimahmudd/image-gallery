const FileUpload = ({
	uploadImage,
}: {
	uploadImage: (files: File[]) => void;
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
					onChange={e => {
						e.preventDefault();
						const files = [...(e.target.files as FileList)];

						if (files && files.length > 0) {
							uploadImage(files);
						}
						e.target.value = '';
						e.target.files = null;
					}}
				/>
				<img src="/images/photo.png" className="w-4 h-auto"></img>
				Add Images
			</label>
		</div>
	);
};

export default FileUpload;
