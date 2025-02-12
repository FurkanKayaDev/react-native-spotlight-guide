"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotlightOverlay = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const react_native_svg_1 = __importStar(require("react-native-svg"));
const styles_1 = require("./styles");
const constants_1 = require("../../constants");
const SpotlightOverlay = ({ spotlightShape, customShape, overlayColor, mask, fadeAnim, }) => {
    if (!mask)
        return null;
    const SpotlightShape = () => {
        switch (spotlightShape) {
            case "circle":
                return (<react_native_svg_1.Circle cx={mask.x + mask.width / 2} cy={mask.y + mask.height / 2} r={mask.width / 2} fill="black"/>);
            case "oval":
                return (<react_native_svg_1.Rect x={mask.x} y={mask.y} width={mask.width} height={mask.height} rx={Math.min(mask.width, mask.height) / 2} ry={Math.min(mask.width, mask.height) / 2} fill="black"/>);
            default:
                return (<react_native_svg_1.Rect x={mask.x} y={mask.y} width={mask.width} height={mask.height} rx={8} ry={8} fill="black"/>);
        }
    };
    return (<react_native_1.Animated.View style={[styles_1.styles.overlay, { opacity: fadeAnim }]}>
      <react_native_svg_1.default width={constants_1.SCREEN.WIDTH} height={constants_1.SCREEN.HEIGHT}>
        <react_native_svg_1.Defs>
          <react_native_svg_1.Mask id="spotlight">
            <react_native_svg_1.Rect x="0" y="0" width={constants_1.SCREEN.WIDTH} height={constants_1.SCREEN.HEIGHT} fill="white"/>
            <SpotlightShape />
          </react_native_svg_1.Mask>
        </react_native_svg_1.Defs>
        <react_native_svg_1.Rect x="0" y="0" width={constants_1.SCREEN.WIDTH} height={constants_1.SCREEN.HEIGHT} fill={overlayColor} mask="url(#spotlight)"/>
      </react_native_svg_1.default>

      {/* Spotlight frame */}
      <react_native_1.View style={[
            {
                position: "absolute",
                left: mask.x,
                top: mask.y,
                width: mask.width,
                height: mask.height,
                borderRadius: mask.borderRadius,
                backgroundColor: spotlightShape === "custom" && (customShape === null || customShape === void 0 ? void 0 : customShape.backgroundColor)
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
        ]}/>
    </react_native_1.Animated.View>);
};
exports.SpotlightOverlay = SpotlightOverlay;
