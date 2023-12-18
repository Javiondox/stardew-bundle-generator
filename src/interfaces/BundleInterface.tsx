import BundleItemInterface from "./BundleItemInterface";

export default interface BundleInterface {
	icon: string;
	name: string;
	items: Array<BundleItemInterface>;
}
