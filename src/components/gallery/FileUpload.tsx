import convertToBase64 from '../../utils/imgTo64';

const FileUpload = ({
	uploadImage,
}: {
	uploadImage: (image: string, name: string) => void;
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
					className="hidden"
					onChange={e => {
						const file = e.target.files?.[0];

						if (file) {
							convertToBase64(file).then(res => {
								uploadImage(
									res as string,
									file?.name as string
								);
							});
						}
					}}
				/>
				<img src="/images/photo.png" className="w-4 h-auto"></img>
				Add Images
			</label>
		</div>
	);
};

export default FileUpload;
