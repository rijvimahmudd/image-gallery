import { twMerge } from 'tailwind-merge';

interface PhotoProps {
	src: string;
	alt: string;
	className?: string;
}
const Photo = ({ src, alt, className }: PhotoProps) => {
	return (
		<img
			src={src}
			alt={alt}
			className={twMerge(
				`h-full w-full rounded-lg border-[1.5px] bg-white object-cover ${className}`
			)}
		/>
	);
};

export default Photo;
