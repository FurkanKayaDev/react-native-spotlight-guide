import { LayoutRectangle, View } from "react-native";
import { SpotlightMask, CustomSpotlightShape } from "../types/spotlight.types";
import { SPOTLIGHT_DEFAULTS } from "../constants";

export const measureChildInWindow = (
  childRef: React.RefObject<View>,
  callback: (
    measures: {
      x: number;
      y: number;
      width: number;
      height: number;
      pageX: number;
      pageY: number;
    } | null
  ) => void
) => {
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
        callback({
          x,
          y,
          width,
          height,
          pageX: x,
          pageY: y,
        });
      } else {
        callback(null);
      }
    });
  }
};

export const getSpotlightMask = (
  childMeasures: {
    pageX: number;
    pageY: number;
    width: number;
    height: number;
  } | null,
  spotlightShape: string,
  customShape?: CustomSpotlightShape,
  spotlightPadding: number = SPOTLIGHT_DEFAULTS.PADDING
): SpotlightMask | null => {
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
