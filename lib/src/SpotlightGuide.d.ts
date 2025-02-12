import React from "react";
import { ViewStyle, TextStyle } from "react-native";
export type ContentPosition = "top" | "bottom" | "left" | "right";
export interface SpotlightGuideProps {
    children: React.ReactNode;
    isVisible: boolean;
    content: string;
    spotlightShape?: "rectangle" | "circle" | "oval";
    spotlightPadding?: number;
    overlayOpacity?: number;
    buttonStyle?: ViewStyle;
    buttonTextStyle?: TextStyle;
    onNext?: () => void;
    onPrev?: () => void;
    onFinish?: () => void;
    contentStyle?: ViewStyle;
    animationDuration?: number;
    contentPosition?: ContentPosition;
}
export declare const SpotlightGuide: React.FC<SpotlightGuideProps>;
