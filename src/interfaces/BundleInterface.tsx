import BundleItemInterface from "./BundleItemInterface";

export default interface BundleInterface {
	icon: string;
	name: string;
	bg: string;
	items: Array<BundleItemInterface>;
}
