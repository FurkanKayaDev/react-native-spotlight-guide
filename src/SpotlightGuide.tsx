import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Modal,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Text,
  Dimensions,
  ViewStyle,
  TextStyle,
  LayoutRectangle,
  LayoutChangeEvent,
  ScrollView,
  findNodeHandle,
} from "react-native";
import Svg, { Defs, Rect, Circle, Mask } from "react-native-svg";

export type SpotlightShape = "circle" | "oval" | "rectangle" | "custom";
export type ContentPosition = "top" | "bottom" | "left" | "right";

interface CustomSpotlightShape extends Record<string, any> {
  width: number;
  height: number;
  offsetX?: number;
  offsetY?: number;
}

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
  contentContainerStyle?: Record<string, any>;
  contentTextStyle?: Record<string, any>;
  buttonContainerStyle?: Record<string, any>;
  buttonStyle?: Record<string, any>;
  buttonTextStyle?: Record<string, any>;
  prevButtonText?: string;
  nextButtonText?: string;
  finishButtonText?: string;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

interface SpotlightMask {
  x: number;
  y: number;
  width: number;
  height: number;
  borderRadius?: number;
}

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
      fadeIn();
    } else {
      fadeOut();
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

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
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
      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: fadeAnim,
          },
        ]}
      >
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
          { opacity: fadeAnim },
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
                {prevButtonText || "Önceki"}
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.button, buttonStyle]}
            onPress={onNext || onFinish}
          >
            <Text style={[styles.buttonText, buttonTextStyle]}>
              {nextButtonText ||
                (onNext ? "Sonraki" : finishButtonText || "Bitir")}
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
