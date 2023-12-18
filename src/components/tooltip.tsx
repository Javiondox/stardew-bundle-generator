import { ToolTipContext } from "@/pages/_app";
import useMousePosition from "@/react/useMousePosition";
import { useContext } from "react";

export default function Tooltip() {
	const position = useMousePosition();

	const { tooltip } = useContext(ToolTipContext);

	return (
		position.x > 0 && (
			<div
				style={{
					position: "absolute",
					left: position.x + 32,
					top: position.y - 32,
					zIndex: 10000,
					fontSize: 30,
					background: "#f1b768",
					padding: "0.25em 0.5em",
					border: "5px solid #bc6131",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<p>{tooltip.name}</p>
				{tooltip.desc && (
					<>
						<span className="divider" />
						<p>{tooltip.desc}</p>
					</>
				)}
			</div>
		)
	);
}
