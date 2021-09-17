import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
	const routePath = useLocation();
	const goToTop = () => {
		window.scrollTo(0, 0);
	};
	useEffect(() => {
		goToTop();
	}, [routePath]);
	return null;
};
export default ScrollToTop;
