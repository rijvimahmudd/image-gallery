const PresentationLinks = () => {
	return (
		<div className="min-h-screen md:w-20 md:flex md:flex-col flex-row items-center justify-center ">
			<div className="w-full flex md:flex-col items-center justify-center gap-10  p-4 rounded-lg shadow-md">
				<p className="text-sm font-semibold">Useful links</p>
				<a
					className="w-8 h-auto"
					href="https://www.loom.com/share/41830153196e47f1b5b6705238aaaa0e"
					target={'_blank'}
				>
					<img
						src="/images/youtube.png"
						alt=""
						className="w-full h-auto"
					/>
				</a>
				<a
					className="w-8 h-auto"
					href="https://github.com/rijvimahmudd/image-gallery"
					target="_blank"
				>
					<img
						src="/images/github.png"
						alt=""
						className="w-full h-auto"
					/>
				</a>
			</div>
		</div>
	);
};

export default PresentationLinks;
