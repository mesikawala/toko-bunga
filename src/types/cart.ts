import type { FlowerProduct } from "../data/content";

export type CartItem = FlowerProduct & { quantity: number };
