import { View } from "react-native";
import { SpotlightMask, CustomSpotlightShape } from "../types/spotlight.types";
export declare const measureChildInWindow: (childRef: React.RefObject<View>, callback: (measures: {
    x: number;
    y: number;
    width: number;
    height: number;
    pageX: number;
    pageY: number;
} | null) => void) => void;
export declare const getSpotlightMask: (childMeasures: {
    pageX: number;
    pageY: number;
    width: number;
    height: number;
} | null, spotlightShape: string, customShape?: CustomSpotlightShape, spotlightPadding?: number) => SpotlightMask | null;
