import React from "react";
import { Animated, View } from "react-native";
import Svg, { Defs, Rect, Circle, Mask } from "react-native-svg";
import { SpotlightOverlayProps } from "../../types/spotlight.types";
import { styles } from "./styles";
import { SCREEN } from "../../constants";

export const SpotlightOverlay: React.FC<SpotlightOverlayProps> = ({
  spotlightShape,
  customShape,
  overlayColor,
  mask,
  fadeAnim,
}) => {
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
    <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
      <Svg width={SCREEN.WIDTH} height={SCREEN.HEIGHT}>
        <Defs>
          <Mask id="spotlight">
            <Rect
              x="0"
              y="0"
              width={SCREEN.WIDTH}
              height={SCREEN.HEIGHT}
              fill="white"
            />
            <SpotlightShape />
          </Mask>
        </Defs>
        <Rect
          x="0"
          y="0"
          width={SCREEN.WIDTH}
          height={SCREEN.HEIGHT}
          fill={overlayColor}
          mask="url(#spotlight)"
        />
      </Svg>

      {/* Spotlight frame */}
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
