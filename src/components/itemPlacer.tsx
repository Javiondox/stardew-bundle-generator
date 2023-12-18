import BundleItemInterface from "@/interfaces/BundleItemInterface";
import { ToolTipContext } from "@/pages/_app";
import { useContext } from "react";

interface Props {
	item: BundleItemInterface;
	drawSlot: boolean;
}

interface ItemImageProps {
	item: BundleItemInterface;
}

function ItemImage({ item }: ItemImageProps) {
	return (
		<img
			alt={item.name}
			src={`item-icons/${item.icon}.png`}
			style={{
				width: "64px",
				height: "64px",
			}}
		></img>
	);
}

export default function ItemPlacer({ item, drawSlot }: Props) {
	const { tooltip, setTooltip } = useContext(ToolTipContext);
	return (
		<div
			onMouseEnter={() =>
				setTooltip({
					name: item.name,
					desc: item.desc ? item.desc : "",
				})
			}
			onMouseLeave={() => setTooltip({ name: "" })}
		>
			{drawSlot ? (
				item.completed ? (
					<div className={"fullSlot"}>
						<ItemImage item={item}></ItemImage>
					</div>
				) : (
					<div className={"slot"}></div>
				)
			) : (
				<div
					style={{ width: "72px", height: "72px" }}
					onClick={() => {
						item.url ? window.open(item.url) : undefined;
					}}
				>
					<ItemImage item={item}></ItemImage>
				</div>
			)}
		</div>
	);
}
