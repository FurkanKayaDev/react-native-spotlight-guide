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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotlightGuide = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_svg_1 = __importStar(require("react-native-svg"));
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = react_native_1.Dimensions.get("window");
const SpotlightGuide = ({ children, isVisible, content, spotlightShape = "rectangle", spotlightPadding = 10, overlayOpacity = 0.7, buttonStyle, buttonTextStyle, onNext, onPrev, onFinish, contentStyle, animationDuration = 300, contentPosition = "bottom", }) => {
    const [childLayout, setChildLayout] = (0, react_1.useState)(null);
    const [childMeasures, setChildMeasures] = (0, react_1.useState)(null);
    const fadeAnim = (0, react_1.useRef)(new react_native_1.Animated.Value(0)).current;
    const childRef = (0, react_1.useRef)(null);
    const measureAttempts = (0, react_1.useRef)(0);
    (0, react_1.useEffect)(() => {
        if (isVisible) {
            measureAttempts.current = 0;
            measureChild();
            fadeIn();
        }
        else {
            fadeOut();
        }
    }, [isVisible]);
    const onChildLayout = (event) => {
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
                if (typeof x === "number" &&
                    typeof y === "number" &&
                    typeof width === "number" &&
                    typeof height === "number" &&
                    !isNaN(x) &&
                    !isNaN(y) &&
                    !isNaN(width) &&
                    !isNaN(height)) {
                    setChildMeasures({
                        x,
                        y,
                        width,
                        height,
                        pageX: x,
                        pageY: y,
                    });
                }
                else {
                    attemptMeasurement();
                }
            });
        }
    };
    const fadeIn = () => {
        react_native_1.Animated.timing(fadeAnim, {
            toValue: 1,
            duration: animationDuration,
            useNativeDriver: true,
        }).start();
    };
    const fadeOut = () => {
        react_native_1.Animated.timing(fadeAnim, {
            toValue: 0,
            duration: animationDuration,
            useNativeDriver: true,
        }).start();
    };
    const getSpotlightMask = () => {
        if (!childMeasures)
            return null;
        const { pageX, pageY, width, height } = childMeasures;
        const padding = spotlightPadding;
        if (typeof pageX !== "number" ||
            typeof pageY !== "number" ||
            typeof width !== "number" ||
            typeof height !== "number" ||
            isNaN(pageX) ||
            isNaN(pageY) ||
            isNaN(width) ||
            isNaN(height)) {
            return null;
        }
        switch (spotlightShape) {
            case "circle": {
                const diameter = Math.max(width, height) + padding * 2;
                const centerX = pageX + width / 2;
                const centerY = pageY + height / 2;
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
                    width: width + padding * 2,
                    height: height + padding * 2,
                    borderRadius: Math.min(width, height) / 2,
                };
            default:
                return {
                    x: pageX - padding,
                    y: pageY - padding,
                    width: width + padding * 2,
                    height: height + padding * 2,
                    borderRadius: 8,
                };
        }
    };
    const getContentPosition = (mask) => {
        const margin = 20;
        const defaultPosition = {
            top: 100,
            left: 20,
            right: 20,
        };
        if (!mask || typeof mask.y !== "number" || isNaN(mask.y)) {
            return defaultPosition;
        }
        switch (contentPosition) {
            case "top": {
                const bottom = SCREEN_HEIGHT - mask.y + margin;
                return {
                    bottom: isNaN(bottom) ? 100 : bottom,
                    left: 20,
                    right: 20,
                };
            }
            case "bottom": {
                const top = mask.y + mask.height + margin;
                return {
                    top: isNaN(top) ? 100 : top,
                    left: 20,
                    right: 20,
                };
            }
            case "left": {
                const width = Math.min(300, mask.x - margin * 2);
                return {
                    top: isNaN(mask.y) ? 100 : mask.y,
                    right: isNaN(mask.x) ? 20 : SCREEN_WIDTH - mask.x + margin,
                    width: isNaN(width) ? 300 : width,
                };
            }
            case "right": {
                const left = mask.x + mask.width + margin;
                const width = Math.min(300, SCREEN_WIDTH - (mask.x + mask.width + margin * 2));
                return {
                    top: isNaN(mask.y) ? 100 : mask.y,
                    left: isNaN(left) ? 20 : left,
                    width: isNaN(width) ? 300 : width,
                };
            }
            default:
                return defaultPosition;
        }
    };
    const renderOverlay = () => {
        const mask = getSpotlightMask();
        if (!mask)
            return null;
        const SpotlightShape = () => {
            switch (spotlightShape) {
                case "circle":
                    return (<react_native_svg_1.Circle cx={mask.x + mask.width / 2} cy={mask.y + mask.height / 2} r={mask.width / 2} fill="white"/>);
                case "oval":
                    return (<react_native_svg_1.Rect x={mask.x} y={mask.y} width={mask.width} height={mask.height} rx={Math.min(mask.width, mask.height) / 2} ry={Math.min(mask.width, mask.height) / 2} fill="white"/>);
                default:
                    return (<react_native_svg_1.Rect x={mask.x} y={mask.y} width={mask.width} height={mask.height} rx={8} ry={8} fill="white"/>);
            }
        };
        return (<react_native_1.Animated.View style={[
                styles.overlay,
                {
                    opacity: fadeAnim,
                },
            ]}>
        <react_native_svg_1.default width={SCREEN_WIDTH} height={SCREEN_HEIGHT}>
          <react_native_svg_1.Defs>
            <react_native_svg_1.Mask id="spotlight">
              <react_native_svg_1.Rect x="0" y="0" width={SCREEN_WIDTH} height={SCREEN_HEIGHT} fill="black"/>
              <SpotlightShape />
            </react_native_svg_1.Mask>
          </react_native_svg_1.Defs>
          <react_native_svg_1.Rect x="0" y="0" width={SCREEN_WIDTH} height={SCREEN_HEIGHT} fill={`rgba(0, 0, 0, ${overlayOpacity})`} mask="url(#spotlight)"/>
        </react_native_svg_1.default>

        {/* Spotlight çerçevesi */}
        <react_native_1.View style={{
                position: "absolute",
                left: mask.x,
                top: mask.y,
                width: mask.width,
                height: mask.height,
                borderRadius: mask.borderRadius,
                borderColor: "rgba(255, 255, 255, 0.5)",
                borderWidth: 1,
                backgroundColor: "transparent",
            }}/>
      </react_native_1.Animated.View>);
    };
    const renderContent = () => {
        const mask = getSpotlightMask();
        if (!mask)
            return null;
        const contentPositionStyle = getContentPosition(mask);
        return (<react_native_1.Animated.View style={[
                styles.contentContainer,
                contentPositionStyle,
                contentStyle,
                { opacity: fadeAnim },
            ]}>
        <react_native_1.Text style={styles.contentText}>{content}</react_native_1.Text>
        <react_native_1.View style={styles.buttonContainer}>
          {onPrev && (<react_native_1.TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPrev}>
              <react_native_1.Text style={[styles.buttonText, buttonTextStyle]}>Önceki</react_native_1.Text>
            </react_native_1.TouchableOpacity>)}
          <react_native_1.TouchableOpacity style={[styles.button, buttonStyle]} onPress={onNext || onFinish}>
            <react_native_1.Text style={[styles.buttonText, buttonTextStyle]}>
              {onNext ? "Sonraki" : "Bitir"}
            </react_native_1.Text>
          </react_native_1.TouchableOpacity>
        </react_native_1.View>
      </react_native_1.Animated.View>);
    };
    return (<>
      <react_native_1.View ref={childRef} style={styles.childWrapper} onLayout={onChildLayout} collapsable={false}>
        {children}
      </react_native_1.View>
      <react_native_1.Modal visible={isVisible} transparent animationType="none">
        {renderOverlay()}
        {renderContent()}
      </react_native_1.Modal>
    </>);
};
exports.SpotlightGuide = SpotlightGuide;
const styles = react_native_1.StyleSheet.create({
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
    spotlightMaskContainer: Object.assign(Object.assign({}, react_native_1.StyleSheet.absoluteFillObject), { overflow: "hidden" }),
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
