import { useState, useEffect, useCallback } from 'react';

const usePosition = (ref) => {
	const [prevElement, setPrevElement] = useState(null);
	const [nextElement, setNextElement] = useState(null);

	function getPrevElement(list) {
		const sibling = list[0].previousElementSibling;
		if (sibling instanceof HTMLElement) {
			return sibling;
		}
		return sibling;
	}

	function getNextElement(list) {
		const sibling = list[list.length - 1].nextElementSibling;
		if (sibling instanceof HTMLElement) {
			return sibling;
		}
		return null;
	}

	const scrollToElement = useCallback(
		(element) => {
			const currentNode = ref.current;

			if (!currentNode || !element) return;

			let newScrollPosition;

			newScrollPosition =
				element.offsetLeft +
				element.getBoundingClientRect().width / 2 -
				currentNode.getBoundingClientRect().width / 2;

			currentNode.scroll({
				left: newScrollPosition,
				behavior: 'smooth',
			});
		},
		[ref]
	);

	const scrollRight = useCallback(
		() => scrollToElement(nextElement),
		[scrollToElement, nextElement]
	);

	const scrollLeft = useCallback(
		() => scrollToElement(prevElement),
		[scrollToElement, prevElement]
	);

	useEffect(() => {
		const element = ref.current;
		const update = () => {
			const rect = element.getBoundingClientRect();
			const visibleElements = Array.from(element.children).filter((child) => {
				const childRect = child.getBoundingClientRect();
				return (
					rect.left <= childRect.left && rect.right >= childRect.right - 10
				);
			});
			if (visibleElements.length > 0) {
				setPrevElement(getPrevElement(visibleElements));
				setNextElement(getNextElement(visibleElements));
			}
		};
		update();
		element.addEventListener('scroll', update, { passive: true });
		return () => {
			element.removeEventListener('scroll', update, { passive: true });
		};
	}, [ref]);
	return {
		hasItemOnLeft: prevElement !== null,
		hasItemOnRight: nextElement !== null,
		scrollLeft,
		scrollRight,
	};
};
export default usePosition;
