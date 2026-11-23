import type { IBlockComponent } from "@/shared/Components/Block/types";

export type TBlockFactory = () => IBlockComponent;

export type TRouteAccess = "public" | "private" | "guest";
