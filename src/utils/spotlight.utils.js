"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSpotlightMask = exports.measureChildInWindow = void 0;
const constants_1 = require("../constants");
const measureChildInWindow = (childRef, callback) => {
    if (childRef.current) {
        childRef.current.measureInWindow((x, y, width, height) => {
            if (typeof x === "number" &&
                typeof y === "number" &&
                typeof width === "number" &&
                typeof height === "number" &&
                !isNaN(x) &&
                !isNaN(y) &&
                !isNaN(width) &&
                !isNaN(height)) {
                callback({
                    x,
                    y,
                    width,
                    height,
                    pageX: x,
                    pageY: y,
                });
            }
            else {
                callback(null);
            }
        });
    }
};
exports.measureChildInWindow = measureChildInWindow;
const getSpotlightMask = (childMeasures, spotlightShape, customShape, spotlightPadding = constants_1.SPOTLIGHT_DEFAULTS.PADDING) => {
    if (!childMeasures)
        return null;
    const { pageX, pageY, width: childWidth, height: childHeight, } = childMeasures;
    const padding = spotlightPadding;
    if (typeof pageX !== "number" ||
        typeof pageY !== "number" ||
        typeof childWidth !== "number" ||
        typeof childHeight !== "number" ||
        isNaN(pageX) ||
        isNaN(pageY) ||
        isNaN(childWidth) ||
        isNaN(childHeight)) {
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
exports.getSpotlightMask = getSpotlightMask;
