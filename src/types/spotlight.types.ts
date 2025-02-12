import { ViewStyle, TextStyle, Animated } from "react-native";

export type SpotlightShape = "circle" | "oval" | "rectangle" | "custom";
export type ContentPosition = "top" | "bottom" | "left" | "right";

/**
 * Interface for custom spotlight shape properties
 * @interface CustomSpotlightShape
 * @param {number} width - Width of the custom spotlight shape in pixels
 * @param {number} height - Height of the custom spotlight shape in pixels
 * @param {number} [offsetX] - Optional horizontal offset from the center in pixels
 * @param {number} [offsetY] - Optional vertical offset from the center in pixels
 * @param {number} [borderRadius] - Optional border radius for the spotlight shape in pixels
 * @param {string} [backgroundColor] - Optional background color for the spotlight area
 * @param {number} [borderWidth] - Optional border width for the spotlight shape in pixels
 * @param {string} [borderColor] - Optional border color for the spotlight shape
 * @param {ViewStyle["borderStyle"]} [borderStyle] - Optional border style (solid, dashed, dotted)
 * @param {string} [shadowColor] - Optional shadow color for the spotlight shape
 * @param {ViewStyle["shadowOffset"]} [shadowOffset] - Optional shadow offset {width: number, height: number}
 * @param {number} [shadowOpacity] - Optional shadow opacity (0-1)
 * @param {number} [shadowRadius] - Optional shadow blur radius in pixels
 * @param {number} [elevation] - Optional elevation for Android shadow
 * @param {number} [opacity] - Optional opacity for the entire spotlight shape (0-1)
 * @param {number} [padding] - Optional padding around the spotlight shape in pixels
 */
export interface CustomSpotlightShape extends Record<string, any> {
  width: number;
  height: number;
  offsetX?: number;
  offsetY?: number;
}

/**
 * Interface for spotlight mask dimensions and position
 * @interface SpotlightMask
 * @param {number} x - X coordinate of the mask from the left edge of the screen in pixels
 * @param {number} y - Y coordinate of the mask from the top edge of the screen in pixels
 * @param {number} width - Width of the spotlight mask in pixels
 * @param {number} height - Height of the spotlight mask in pixels
 * @param {number} [borderRadius] - Optional border radius of the mask in pixels, used for rectangle and custom shapes
 */
export interface SpotlightMask {
  x: number;
  y: number;
  width: number;
  height: number;
  borderRadius?: number;
}

/**
 * Props interface for SpotlightGuide component
 */
export interface SpotlightGuideProps {
  children: React.ReactNode;
  isVisible: boolean;
  content: string;
  spotlightShape?: SpotlightShape | string;
  customShape?: CustomSpotlightShape;
  spotlightPadding?: number;
  overlayOpacity?: number;
  overlayColor?: string;
  onNext?: () => void;
  onPrev?: () => void;
  onFinish?: () => void;
  animationDuration?: number;
  contentPosition?: ContentPosition | string;
  contentContainerStyle?: ViewStyle | any;
  contentTextStyle?: TextStyle | any;
  buttonContainerStyle?: ViewStyle | any;
  buttonStyle?: ViewStyle | any;
  buttonTextStyle?: TextStyle | any;
  prevButtonText?: string;
  nextButtonText?: string;
  finishButtonText?: string;
}

export interface SpotlightContentProps {
  content: string;
  contentPosition: ContentPosition | string;
  contentContainerStyle?: ViewStyle;
  contentTextStyle?: TextStyle;
  buttonContainerStyle?: ViewStyle;
  buttonStyle?: ViewStyle;
  buttonTextStyle?: TextStyle;
  prevButtonText?: string;
  nextButtonText?: string;
  finishButtonText?: string;
  onNext?: () => void;
  onPrev?: () => void;
  onFinish?: () => void;
  mask: SpotlightMask | null;
  fadeAnim: Animated.Value;
}

export interface SpotlightOverlayProps {
  spotlightShape: SpotlightShape | string;
  customShape?: CustomSpotlightShape;
  overlayColor: string;
  mask: SpotlightMask | null;
  fadeAnim: Animated.Value;
}
