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
const SpotlightGuide = ({ children, isVisible, content, spotlightShape = "rectangle", customShape, spotlightPadding = 10, overlayOpacity = 0.7, overlayColor = "rgba(0, 0, 0, 0.7)", onNext, onPrev, onFinish, onPressOverlay, animationDuration = 300, contentPosition = "bottom", contentContainerStyle, contentTextStyle, buttonContainerStyle, buttonStyle, buttonTextStyle, prevButtonText, nextButtonText, finishButtonText, }) => {
    const [childLayout, setChildLayout] = (0, react_1.useState)(null);
    const [childMeasures, setChildMeasures] = (0, react_1.useState)(null);
    const fadeAnim = (0, react_1.useRef)(new react_native_1.Animated.Value(0)).current;
    const childRef = (0, react_1.useRef)(null);
    const measureAttempts = (0, react_1.useRef)(0);
    (0, react_1.useEffect)(() => {
        if (isVisible) {
            measureAttempts.current = 0;
            measureChild();
            startAnimation();
        }
        else {
            endAnimation();
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
            try {
                childRef.current.measureInWindow((x, y, width, height) => {
                    // Ölçüm değerlerinin geçerli olduğundan emin olalım
                    const validMeasures = {
                        x: x || 0,
                        y: y || 0,
                        width: width || 0,
                        height: height || 0,
                        pageX: x || 0,
                        pageY: y || 0,
                    };
                    setChildMeasures(validMeasures);
                });
            }
            catch (error) {
                console.warn("Measure error:", error);
                // Varsayılan değerler atayalım
                setChildMeasures({
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                    pageX: 0,
                    pageY: 0,
                });
            }
        }
    };
    const startAnimation = () => {
        react_native_1.Animated.timing(fadeAnim, {
            toValue: 1,
            duration: animationDuration,
            useNativeDriver: true,
        }).start();
    };
    const endAnimation = () => {
        react_native_1.Animated.timing(fadeAnim, {
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
    const getSpotlightMask = () => {
        if (!childMeasures) {
            return {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                borderRadius: 0,
            };
        }
        const { pageX = 0, pageY = 0, width: childWidth = 0, height: childHeight = 0, } = childMeasures;
        const padding = spotlightPadding || 0;
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
        return (<react_native_1.TouchableOpacity activeOpacity={1} style={[styles.overlay]} onPress={onPressOverlay}>
        <react_native_1.Animated.View style={[styles.overlay, getAnimationStyle()]}>
          <react_native_svg_1.default width={SCREEN_WIDTH} height={SCREEN_HEIGHT}>
            <react_native_svg_1.Defs>
              <react_native_svg_1.Mask id="spotlight">
                <react_native_svg_1.Rect x="0" y="0" width={SCREEN_WIDTH} height={SCREEN_HEIGHT} fill="white"/>
                <SpotlightShape />
              </react_native_svg_1.Mask>
            </react_native_svg_1.Defs>
            <react_native_svg_1.Rect x="0" y="0" width={SCREEN_WIDTH} height={SCREEN_HEIGHT} fill={overlayColor} mask="url(#spotlight)"/>
          </react_native_svg_1.default>

          {/* Spotlight çerçevesi */}
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
        </react_native_1.Animated.View>
      </react_native_1.TouchableOpacity>);
    };
    const renderContent = () => {
        const mask = getSpotlightMask();
        if (!mask)
            return null;
        const contentPositionStyle = getContentPosition(mask);
        return (<react_native_1.Animated.View style={[
                styles.contentContainer,
                contentPositionStyle,
                contentContainerStyle,
                getAnimationStyle(),
            ]}>
        {content && (<react_native_1.Text style={[styles.contentText, contentTextStyle]}>{content}</react_native_1.Text>)}
        <react_native_1.View style={[styles.buttonContainer, buttonContainerStyle]}>
          {onPrev && (<react_native_1.TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPrev}>
              <react_native_1.Text style={[styles.buttonText, buttonTextStyle]}>
                {prevButtonText || "Previous"}
              </react_native_1.Text>
            </react_native_1.TouchableOpacity>)}
          {(onNext || onFinish) && (<react_native_1.TouchableOpacity style={[styles.button, buttonStyle]} onPress={onNext || onFinish}>
              <react_native_1.Text style={[styles.buttonText, buttonTextStyle]}>
                {onNext
                    ? nextButtonText || "Next"
                    : finishButtonText || "Finish"}
              </react_native_1.Text>
            </react_native_1.TouchableOpacity>)}
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
