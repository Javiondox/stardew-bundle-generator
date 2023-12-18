import "@/styles/globals.css";
import type { AppProps } from "next/app";
import localFont from "@next/font/local";
import { useState, createContext } from "react";

type ToolTipContextType = {
	tooltip: string;
	setTooltip: React.Dispatch<React.SetStateAction<string>>;
};

const ToolTipContextDefaultValues: ToolTipContextType = {
	tooltip: "",
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
	const [tooltip, setTooltip] = useState<string>("");
	return (
		<ToolTipContext.Provider value={{ tooltip, setTooltip }}>
			<main className={`${SVF.variable} font-sans`}>
				<Component {...pageProps} />
			</main>
		</ToolTipContext.Provider>
	);
}
