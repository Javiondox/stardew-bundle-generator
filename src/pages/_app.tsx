import "@/styles/globals.css";
import type { AppProps } from "next/app";
import localFont from "@next/font/local";
import { useState, createContext } from "react";

type ToolTipObject = {
	name: string;
	desc?: string;
};

type ToolTipContextType = {
	tooltip: ToolTipObject;
	setTooltip: React.Dispatch<React.SetStateAction<ToolTipObject>>;
};

const ToolTipContextDefaultValues: ToolTipContextType = {
	tooltip: { name: "", desc: "" },
	setTooltip: () => {},
};

export const ToolTipContext = createContext<ToolTipContextType>(
	ToolTipContextDefaultValues
);

const SVF = localFont({
	src: [
		{
			path: "../../public/fonts/Stardew_Valley_Font.ttf",
		},
	],
	variable: "--font-SVF",
});

export default function App({ Component, pageProps }: AppProps) {
	const [tooltip, setTooltip] = useState<ToolTipObject>({ name: "", desc: "" });
	return (
		<ToolTipContext.Provider value={{ tooltip, setTooltip }}>
			<main className={`${SVF.variable} font-sans`}>
				<Component {...pageProps} />
			</main>
		</ToolTipContext.Provider>
	);
}
