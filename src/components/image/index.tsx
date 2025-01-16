import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

const LazyImage = ({
	src,
	alt,
	width,
	height,
	effect,
}: {
	src: string
	alt: string
	width?: string
	height?: string
	effect?: 'blur' | 'opacity' | 'black-and-white' | 'grayscale' | 'opacity-0' | 'opacity-100' | 'zoomIn' | 'blurOut'
}) => {
	return <LazyLoadImage src={src} alt={alt} width={width || 'auto'} height={height || 'auto'} effect={effect} />
}

export default LazyImage
