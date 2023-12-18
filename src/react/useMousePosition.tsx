import React from "react";

interface MousePosition {
	x: number;
	y: number;
	clientX: number;
	clientY: number;
}

interface Position {
	x: number;
	y: number;
}

const useMousePosition = () => {
	const [mousePosition, setMousePosition] = React.useState<Position>({
		x: 0,
		y: 0,
	});
	React.useEffect(() => {
		const updateMousePosition = (ev: MousePosition) => {
			setMousePosition({ x: ev.clientX, y: ev.clientY });
		};
		window.addEventListener("mousemove", updateMousePosition);
		return () => {
			window.removeEventListener("mousemove", updateMousePosition);
		};
	}, []);
	return mousePosition;
};
export default useMousePosition;
