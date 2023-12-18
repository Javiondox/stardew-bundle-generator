import BundleInterface from "@/interfaces/BundleInterface";
import { ToolTipContext } from "@/pages/_app";
import { useContext, useEffect, useLayoutEffect, useState } from "react";

interface Props {
	bundles: Array<BundleInterface>;
	setBundle: Function;
	setStatus: Function;
}

interface Position {
	x: number;
	y: number;
}

interface BundleIconInterface {
	bundle: BundleInterface;
	position: Position;
	onClick: Function;
}

function BundleIcon({ bundle, position, onClick }: BundleIconInterface) {
	const { tooltip, setTooltip } = useContext(ToolTipContext);
	const getStatus = () => {
		return bundle.items.every((item) => item.completed === true);
	};
	const [showTooltip, setShowTooltip] = useState(false);

	useEffect(() => {
		if (showTooltip) {
			setTooltip(bundle.name);
		} else {
			setTooltip("");
		}
	}, [showTooltip]);

	return (
		<>
			<div
				style={{
					position: "absolute",
					left: position.x,
					top: position.y,
					width: "64px",
					height: "64px",
				}}
				onMouseEnter={() => setShowTooltip(true)}
				onMouseLeave={() => setShowTooltip(false)}
				onClick={() => onClick()}
			>
				<img
					alt="bundle"
					style={{ height: "100%", width: "100%" }}
					src={
						getStatus()
							? `bundle-icons/${bundle.icon}/1.png`
							: `bundle-icons/${bundle.icon}/0.png`
					}
				/>
			</div>
		</>
	);
}

export default function BundlePlacer({ bundles, setBundle, setStatus }: Props) {
	const radius = 240; // radius of the circle
	const width = 752; // container width
	const height = 496; // container height
	const bwidth = 64; //bundle width
	const bheight = 64; //bundle height

	const [positions, setPositions] = useState<Array<Position>>([]);

	function calcPositions() {
		let angle = 0;
		const step = (2 * Math.PI) / bundles.length;
		let newPositions: Array<Position> = [];
		bundles.forEach(() => {
			let x = Math.round(width / 2 + radius * Math.cos(angle) - bwidth / 2),
				y = Math.round(height / 2 + radius * Math.sin(angle) - bheight / 2);
			const position: Position = { x, y };
			newPositions.push(position);
			angle += step;
		});

		console.log("newPositions", newPositions);
		setPositions(newPositions);
	}

	useLayoutEffect(() => {
		calcPositions();
	}, []);

	return (
		positions.length === bundles.length && (
			<>
				{bundles.map((bundle, index) => (
					<BundleIcon
						key={index}
						bundle={bundle}
						position={positions[index]}
						onClick={() => {
							setBundle(index);
							setStatus(1);
						}}
					/>
				))}
			</>
		)
	);
}
