import BundlePlacer from "@/components/bundlePlacer";
import BundleInterface from "@/interfaces/BundleInterface";
import { useContext, useLayoutEffect, useState } from "react";
import { ToolTipContext } from "./_app";
import Tooltip from "@/components/tooltip";
import ItemPlacer from "@/components/itemPlacer";

export default function Home() {
	const [title, setTitle] = useState<string>("");
	const [bundles, setBundles] = useState<Array<BundleInterface>>();
	const { tooltip, setTooltip } = useContext(ToolTipContext);

	const [status, setStatus] = useState(0);
	const [bundle, setBundle] = useState(0);

	useLayoutEffect(() => {
		fetch("bundles.json")
			.then((response) => response.json())
			.then((data) => {
				setBundles(data.bundles);
				setTitle(data.title);
			});
	}, []);

	useLayoutEffect(() => {
		setTooltip({ name: "" });
	}, [status, setTooltip]);

	return (
		<>
			<main
				className={`flex min-h-screen flex-col items-center justify-between p-24`}
			>
				<div
					style={{
						imageRendering: "pixelated",
						position: "relative",
						width: "1280px",
						height: "720px",
					}}
				>
					{bundles && status == 0 && (
						<>
							<img
								alt="bundle-selector"
								src={"/bundle-selector.png"}
								style={{
									position: "absolute",
									width: "1280px",
									height: "720px",
								}}
								onClick={() => setStatus(0)}
							></img>
							<div
								style={{
									/*background: "red",
                        opacity: 0.5,*/
									position: "absolute",
									zIndex: 100,
									width: "420px",
									height: "60px",
									left: "436px",
									top: "10px",
									fontWeight: 600,
									fontSize: 42,
									textAlign: "center",
									whiteSpace: "nowrap",
								}}
							>
								{title}
							</div>
							<div
								style={{
									position: "absolute",
									zIndex: 100,
									width: "752px",
									height: "496px",
									left: "244px",
									top: "112px",
								}}
							>
								<div
									style={{
										position: "relative",
										width: "100%",
										height: "100%",
									}}
								>
									{bundles && (
										<BundlePlacer
											bundles={bundles}
											setBundle={setBundle}
											setStatus={setStatus}
										></BundlePlacer>
									)}
								</div>
							</div>
						</>
					)}
					{bundles && status == 1 && (
						<>
							<img
								alt="bundle-filler"
								src={"/bundle-filler.png"}
								style={{
									position: "absolute",
									width: "1280px",
									height: "720px",
								}}
								onClick={() => setStatus(0)}
							></img>
							<img
								alt="bundle-bgs"
								src={`/bundle-bgs/${bundles[bundle].bg}.png`}
								style={{
									position: "absolute",
									width: "128px",
									height: "128px",
									left: "872px",
									top: "88px",
								}}
								onClick={() => setStatus(0)}
							></img>
							<div
								style={{
									background: "#FFDC8E",
									position: "absolute",
									zIndex: 100,
									width: "234px",
									height: "52px",
									left: "816px",
									top: "228px",
									fontWeight: 100,
									whiteSpace: "nowrap",
									fontSize:
										bundles[bundle].name.length > 16
											? 32 - (bundles[bundle].name.length - 16 * 0.95)
											: 32,
									textAlign: "center",
									border: "4px solid #B9642D",
								}}
							>
								{bundles && bundles[bundle].name}
							</div>
							<div
								style={{
									/*background: "red",*/
									position: "absolute",
									display: "grid",
									gridTemplateColumns: "repeat(auto-fit, minmax(72px, 1fr))",
									gridGap: "4px",
									justifyItems: "center",
									alignItems: "center",
									justifyContent: "center",
									zIndex: 100,
									width: "348px",
									height: "152px",
									left: "756px",
									top: "284px",
									fontWeight: 100,
									whiteSpace: "nowrap",
									fontSize:
										bundles[bundle].name.length > 16
											? 32 - (bundles[bundle].name.length - 16 * 0.95)
											: 32,
									textAlign: "center",
								}}
							>
								{bundles &&
									bundles[bundle].items.map((item, i) => (
										<ItemPlacer key={i} item={item} drawSlot={false} />
									))}
							</div>
							<div
								style={{
									/*background: "red",*/
									position: "absolute",
									display: "grid",
									gridTemplateColumns: "repeat(auto-fit, minmax(72px, 1fr))",
									gridGap: "4px",
									justifyItems: "center",
									alignItems: "center",
									justifyContent: "center",
									zIndex: 100,
									width: "348px",
									height: "152px",
									left: "756px",
									top: "464px",
									fontWeight: 100,
									whiteSpace: "nowrap",
									fontSize:
										bundles[bundle].name.length > 16
											? 32 - (bundles[bundle].name.length - 16 * 0.95)
											: 32,
									textAlign: "center",
								}}
							>
								{bundles &&
									bundles[bundle].items.map((item, i) => (
										<ItemPlacer key={i} item={item} drawSlot={true} />
									))}
							</div>
						</>
					)}
				</div>
			</main>
			{tooltip.name != "" && <Tooltip />}
		</>
	);
}
