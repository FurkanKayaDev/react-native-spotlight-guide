import React from "react";
import { ViewStyle, TextStyle } from "react-native";
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
interface CustomSpotlightShape extends Record<string, any> {
    width: number;
    height: number;
    offsetX?: number;
    offsetY?: number;
}
/**
 * SpotlightGuide Component
 * A component that creates a spotlight effect to highlight UI elements with a guided tour.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The component to be highlighted
 * @param {boolean} props.isVisible - Controls the visibility of the spotlight guide
 * @param {string} props.content - Text content to be displayed in the guide
 * @param {SpotlightShape} [props.spotlightShape="rectangle"] - Shape of the spotlight (circle, oval, rectangle, custom)
 * @param {CustomSpotlightShape} [props.customShape] - Properties for custom spotlight shape when spotlightShape is "custom"
 * @param {number} [props.spotlightPadding=10] - Padding around the spotlight area in pixels
 * @param {number} [props.overlayOpacity=0.7] - Opacity of the overlay background (0-1)
 * @param {string} [props.overlayColor="rgba(0, 0, 0, 0.7)"] - Color of the overlay background in rgba or hex
 * @param {() => void} [props.onNext] - Callback function when next button is pressed
 * @param {() => void} [props.onPrev] - Callback function when previous button is pressed
 * @param {() => void} [props.onFinish] - Callback function when finish button is pressed
 * @param {() => void} [props.onPressOverlay] - Callback function when overlay is pressed
 * @param {number} [props.animationDuration=300] - Duration of animations in milliseconds
 * @param {ContentPosition} [props.contentPosition="bottom"] - Position of the content relative to spotlight (top, bottom, left, right)
 * @param {ViewStyle} [props.contentContainerStyle] - Custom styles for the content container
 * @param {TextStyle} [props.contentTextStyle] - Custom styles for the content text
 * @param {ViewStyle} [props.buttonContainerStyle] - Custom styles for the button container
 * @param {ViewStyle} [props.buttonStyle] - Custom styles for the buttons
 * @param {TextStyle} [props.buttonTextStyle] - Custom styles for the button text
 * @param {string} [props.prevButtonText="Previous"] - Custom text for the previous button
 * @param {string} [props.nextButtonText="Next"] - Custom text for the next button
 * @param {string} [props.finishButtonText="Finish"] - Custom text for the finish button
 *
 * @example
 * ```tsx
 * <SpotlightGuide
 *   isVisible={true}
 *   content="This is a sample spotlight guide"
 *   spotlightShape="circle"
 *   onNext={() => console.log('Next')}
 * >
 *   <View>
 *     <Text>Highlighted Content</Text>
 *   </View>
 * </SpotlightGuide>
 * ```
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
    onPressOverlay?: () => void;
    animationDuration?: number;
    contentPosition?: ContentPosition | string;
    contentContainerStyle?: ViewStyle;
    contentTextStyle?: TextStyle;
    buttonContainerStyle?: ViewStyle;
    buttonStyle?: ViewStyle;
    buttonTextStyle?: TextStyle;
    prevButtonStyle?: ViewStyle;
    prevButtonTextStyle?: TextStyle;
    prevButtonText?: string;
    nextButtonText?: string;
    finishButtonText?: string;
}
export declare const SpotlightGuide: React.FC<SpotlightGuideProps>;
export {};
