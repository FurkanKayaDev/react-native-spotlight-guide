import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Modal,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Text,
  Dimensions,
  LayoutRectangle,
  LayoutChangeEvent,
  ViewStyle,
  TextStyle,
} from "react-native";
import Svg, { Defs, Rect, Circle, Mask } from "react-native-svg";

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
 * Interface for spotlight mask dimensions and position
 * @interface SpotlightMask
 * @param {number} x - X coordinate of the mask from the left edge of the screen in pixels
 * @param {number} y - Y coordinate of the mask from the top edge of the screen in pixels
 * @param {number} width - Width of the spotlight mask in pixels
 * @param {number} height - Height of the spotlight mask in pixels
 * @param {number} [borderRadius] - Optional border radius of the mask in pixels, used for rectangle and custom shapes
 */

interface SpotlightMask {
  x: number;
  y: number;
  width: number;
  height: number;
  borderRadius?: number;
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

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export const SpotlightGuide: React.FC<SpotlightGuideProps> = ({
  children,
  isVisible,
  content,
  spotlightShape = "rectangle",
  customShape,
  spotlightPadding = 10,
  overlayOpacity = 0.7,
  overlayColor = "rgba(0, 0, 0, 0.7)",
  onNext,
  onPrev,
  onFinish,
  onPressOverlay,
  animationDuration = 300,
  contentPosition = "bottom",
  contentContainerStyle,
  contentTextStyle,
  buttonContainerStyle,
  buttonStyle,
  buttonTextStyle,
  prevButtonText,
  nextButtonText,
  finishButtonText,
}) => {
  const [childLayout, setChildLayout] = useState<LayoutRectangle | null>(null);
  const [childMeasures, setChildMeasures] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
    pageX: number;
    pageY: number;
  } | null>(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const childRef = useRef<View>(null);
  const measureAttempts = useRef(0);

  useEffect(() => {
    if (isVisible) {
      measureAttempts.current = 0;
      measureChild();
      startAnimation();
    } else {
      endAnimation();
    }
  }, [isVisible]);

  const onChildLayout = (event: LayoutChangeEvent) => {
    measureAttempts.current = 0;
    attemptMeasurement();
  };

  const attemptMeasurement = () => {
    if (measureAttempts.current < 5) {
      setTimeout(() => {
        measureChild();
        measureAttempts.current += 1;
      }, 100 * measureAttempts.current);
    }
  };

  const measureChild = () => {
    if (childRef.current) {
      childRef.current.measureInWindow((x, y, width, height) => {
        if (
          typeof x === "number" &&
          typeof y === "number" &&
          typeof width === "number" &&
          typeof height === "number" &&
          !isNaN(x) &&
          !isNaN(y) &&
          !isNaN(width) &&
          !isNaN(height)
        ) {
          setChildMeasures({
            x,
            y,
            width,
            height,
            pageX: x,
            pageY: y,
          });
        } else {
          attemptMeasurement();
        }
      });
    }
  };

  const startAnimation = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
  };

  const endAnimation = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
  };

  const getAnimationStyle = () => {
    return {
      opacity: fadeAnim,
    };
  };

  const getSpotlightMask = (): SpotlightMask | null => {
    if (!childMeasures) return null;

    const {
      pageX,
      pageY,
      width: childWidth,
      height: childHeight,
    } = childMeasures;
    const padding = spotlightPadding;

    if (
      typeof pageX !== "number" ||
      typeof pageY !== "number" ||
      typeof childWidth !== "number" ||
      typeof childHeight !== "number" ||
      isNaN(pageX) ||
      isNaN(pageY) ||
      isNaN(childWidth) ||
      isNaN(childHeight)
    ) {
      return null;
    }

    if (spotlightShape === "custom" && customShape) {
      const centerX = pageX + childWidth / 2;
      const centerY = pageY + childHeight / 2;
      return {
        x: centerX - customShape.width / 2 + (customShape.offsetX || 0),
        y: centerY - customShape.height / 2 + (customShape.offsetY || 0),
        width: customShape.width,
        height: customShape.height,
        borderRadius: customShape.borderRadius || 0,
      };
    }

    switch (spotlightShape) {
      case "circle": {
        const diameter = Math.max(childWidth, childHeight) + padding * 2;
        const centerX = pageX + childWidth / 2;
        const centerY = pageY + childHeight / 2;
        return {
          x: centerX - diameter / 2,
          y: centerY - diameter / 2,
          width: diameter,
          height: diameter,
          borderRadius: diameter / 2,
        };
      }
      case "oval":
        return {
          x: pageX - padding,
          y: pageY - padding,
          width: childWidth + padding * 2,
          height: childHeight + padding * 2,
          borderRadius: Math.min(childWidth, childHeight) / 2,
        };
      default:
        return {
          x: pageX - padding,
          y: pageY - padding,
          width: childWidth + padding * 2,
          height: childHeight + padding * 2,
          borderRadius: 8,
        };
    }
  };

  const getContentPosition = (mask: SpotlightMask) => {
    const margin = 20;
    const defaultPosition = {
      top: 100,
      left: 20,
      right: 20,
    };

    if (!mask || typeof mask.y !== "number" || isNaN(mask.y)) {
      return defaultPosition;
    }

    const contentHeight = 150; // Tahmini içerik yüksekliği

    switch (contentPosition) {
      case "top": {
        // Eğer spotlight ekranın üst kısmına çok yakınsa, içeriği alta al
        if (mask.y < contentHeight + margin) {
          return {
            top: mask.y + mask.height + margin,
            left: 20,
            right: 20,
          };
        }
        // Değilse içeriği üste koy
        return {
          top: Math.max(20, mask.y - contentHeight - margin),
          left: 20,
          right: 20,
        };
      }
      case "bottom": {
        // Eğer spotlight ekranın alt kısmına çok yakınsa, içeriği üste al
        if (mask.y + mask.height + contentHeight + margin > SCREEN_HEIGHT) {
          return {
            top: Math.max(20, mask.y - contentHeight - margin),
            left: 20,
            right: 20,
          };
        }
        // Değilse içeriği alta koy
        return {
          top: mask.y + mask.height + margin,
          left: 20,
          right: 20,
        };
      }
      case "left": {
        // Eğer spotlight ekranın sol kısmına çok yakınsa, içeriği sağa al
        if (mask.x < 300 + margin) {
          return {
            top: mask.y + (mask.height - contentHeight) / 2,
            left: mask.x + mask.width + margin,
            maxWidth: SCREEN_WIDTH - (mask.x + mask.width + margin * 2),
          };
        }
        // Değilse içeriği sola koy
        return {
          top: mask.y + (mask.height - contentHeight) / 2,
          right: SCREEN_WIDTH - mask.x + margin,
          maxWidth: mask.x - margin * 2,
        };
      }
      case "right": {
        // Eğer spotlight ekranın sağ kısmına çok yakınsa, içeriği sola al
        if (mask.x + mask.width + 300 + margin > SCREEN_WIDTH) {
          return {
            top: mask.y + (mask.height - contentHeight) / 2,
            right: SCREEN_WIDTH - mask.x + margin,
            maxWidth: mask.x - margin * 2,
          };
        }
        // Değilse içeriği sağa koy
        return {
          top: mask.y + (mask.height - contentHeight) / 2,
          left: mask.x + mask.width + margin,
          maxWidth: SCREEN_WIDTH - (mask.x + mask.width + margin * 2),
        };
      }
      default:
        return defaultPosition;
    }
  };

  const renderOverlay = () => {
    const mask = getSpotlightMask();
    if (!mask) return null;

    const SpotlightShape = () => {
      switch (spotlightShape) {
        case "circle":
          return (
            <Circle
              cx={mask.x + mask.width / 2}
              cy={mask.y + mask.height / 2}
              r={mask.width / 2}
              fill="black"
            />
          );
        case "oval":
          return (
            <Rect
              x={mask.x}
              y={mask.y}
              width={mask.width}
              height={mask.height}
              rx={Math.min(mask.width, mask.height) / 2}
              ry={Math.min(mask.width, mask.height) / 2}
              fill="black"
            />
          );
        default:
          return (
            <Rect
              x={mask.x}
              y={mask.y}
              width={mask.width}
              height={mask.height}
              rx={8}
              ry={8}
              fill="black"
            />
          );
      }
    };

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.overlay]}
        onPress={onPressOverlay}
      >
        <Animated.View style={[styles.overlay, getAnimationStyle()]}>
          <Svg width={SCREEN_WIDTH} height={SCREEN_HEIGHT}>
            <Defs>
              <Mask id="spotlight">
                <Rect
                  x="0"
                  y="0"
                  width={SCREEN_WIDTH}
                  height={SCREEN_HEIGHT}
                  fill="white"
                />
                <SpotlightShape />
              </Mask>
            </Defs>
            <Rect
              x="0"
              y="0"
              width={SCREEN_WIDTH}
              height={SCREEN_HEIGHT}
              fill={overlayColor}
              mask="url(#spotlight)"
            />
          </Svg>

          {/* Spotlight çerçevesi */}
          <View
            style={[
              {
                position: "absolute",
                left: mask.x,
                top: mask.y,
                width: mask.width,
                height: mask.height,
                borderRadius: mask.borderRadius,
                backgroundColor:
                  spotlightShape === "custom" && customShape?.backgroundColor
                    ? customShape.backgroundColor
                    : "transparent",
              },
              spotlightShape === "custom" && customShape
                ? {
                    padding: customShape.padding,
                    borderWidth: customShape.borderWidth,
                    borderColor: customShape.borderColor,
                    borderStyle: customShape.borderStyle,
                    shadowColor: customShape.shadowColor,
                    shadowOffset: customShape.shadowOffset,
                    shadowOpacity: customShape.shadowOpacity,
                    shadowRadius: customShape.shadowRadius,
                    elevation: customShape.elevation,
                    opacity: customShape.opacity,
                  }
                : {},
            ]}
          />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const renderContent = () => {
    const mask = getSpotlightMask();
    if (!mask) return null;

    const contentPositionStyle = getContentPosition(mask);

    return (
      <Animated.View
        style={[
          styles.contentContainer,
          contentPositionStyle,
          contentContainerStyle,
          getAnimationStyle(),
        ]}
      >
        <Text style={[styles.contentText, contentTextStyle]}>{content}</Text>
        <View style={[styles.buttonContainer, buttonContainerStyle]}>
          {onPrev && (
            <TouchableOpacity
              style={[styles.button, buttonStyle]}
              onPress={onPrev}
            >
              <Text style={[styles.buttonText, buttonTextStyle]}>
                {prevButtonText || "Previous"}
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.button, buttonStyle]}
            onPress={onNext || onFinish}
          >
            <Text style={[styles.buttonText, buttonTextStyle]}>
              {nextButtonText ||
                (onNext ? "Next" : finishButtonText || "Finish")}
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

  return (
    <>
      <View
        ref={childRef}
        style={styles.childWrapper}
        onLayout={onChildLayout}
        collapsable={false}
      >
        {children}
      </View>
      <Modal visible={isVisible} transparent animationType="none">
        {renderOverlay()}
        {renderContent()}
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  childWrapper: {
    alignSelf: "flex-start",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlayBackground: {
    position: "absolute",
  },
  spotlightHole: {
    overflow: "hidden",
  },
  spotlightContainer: {
    overflow: "hidden",
  },
  spotlightMaskContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },
  contentContainer: {
    position: "absolute",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxWidth: SCREEN_WIDTH - 40,
  },
  contentText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#007AFF",
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
