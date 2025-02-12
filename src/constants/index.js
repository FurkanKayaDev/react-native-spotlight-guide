"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SPOTLIGHT_DEFAULTS = exports.SCREEN = void 0;
const react_native_1 = require("react-native");
exports.SCREEN = {
    WIDTH: react_native_1.Dimensions.get("window").width,
    HEIGHT: react_native_1.Dimensions.get("window").height,
};
exports.SPOTLIGHT_DEFAULTS = {
    SHAPE: "rectangle",
    PADDING: 10,
    OVERLAY_OPACITY: 0.7,
    OVERLAY_COLOR: "rgba(0, 0, 0, 0.7)",
    ANIMATION_DURATION: 300,
    CONTENT_POSITION: "bottom",
    MEASURE_ATTEMPTS: 5,
    MEASURE_DELAY: 100,
};
