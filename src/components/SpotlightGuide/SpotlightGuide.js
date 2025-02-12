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
const styles_1 = require("./styles");
const SpotlightContent_1 = require("./SpotlightContent");
const SpotlightOverlay_1 = require("./SpotlightOverlay");
const constants_1 = require("../../constants");
const spotlight_utils_1 = require("../../utils/spotlight.utils");
/**
 * SpotlightGuide Component
 * A component that creates a spotlight effect to highlight UI elements with a guided tour.
 *
 * @component
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
const SpotlightGuide = ({ children, isVisible, content, spotlightShape = constants_1.SPOTLIGHT_DEFAULTS.SHAPE, customShape, spotlightPadding = constants_1.SPOTLIGHT_DEFAULTS.PADDING, overlayOpacity = constants_1.SPOTLIGHT_DEFAULTS.OVERLAY_OPACITY, overlayColor = constants_1.SPOTLIGHT_DEFAULTS.OVERLAY_COLOR, onNext, onPrev, onFinish, animationDuration = constants_1.SPOTLIGHT_DEFAULTS.ANIMATION_DURATION, contentPosition = constants_1.SPOTLIGHT_DEFAULTS.CONTENT_POSITION, contentContainerStyle, contentTextStyle, buttonContainerStyle, buttonStyle, buttonTextStyle, prevButtonText, nextButtonText, finishButtonText, }) => {
    const [childMeasures, setChildMeasures] = (0, react_1.useState)(null);
    const fadeAnim = (0, react_1.useRef)(new react_native_1.Animated.Value(0)).current;
    const contentFadeAnim = (0, react_1.useRef)(new react_native_1.Animated.Value(0)).current;
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
    const onChildLayout = () => {
        measureAttempts.current = 0;
        attemptMeasurement();
    };
    const attemptMeasurement = () => {
        if (measureAttempts.current < constants_1.SPOTLIGHT_DEFAULTS.MEASURE_ATTEMPTS) {
            setTimeout(() => {
                measureChild();
                measureAttempts.current += 1;
            }, constants_1.SPOTLIGHT_DEFAULTS.MEASURE_DELAY * measureAttempts.current);
        }
    };
    const measureChild = () => {
        (0, spotlight_utils_1.measureChildInWindow)(childRef, setChildMeasures);
    };
    const fadeIn = () => {
        react_native_1.Animated.parallel([
            react_native_1.Animated.timing(fadeAnim, {
                toValue: overlayOpacity,
                duration: animationDuration,
                useNativeDriver: true,
            }),
            react_native_1.Animated.timing(contentFadeAnim, {
                toValue: 1,
                duration: animationDuration,
                useNativeDriver: true,
            }),
        ]).start();
    };
    const fadeOut = () => {
        react_native_1.Animated.parallel([
            react_native_1.Animated.timing(fadeAnim, {
                toValue: 0,
                duration: animationDuration,
                useNativeDriver: true,
            }),
            react_native_1.Animated.timing(contentFadeAnim, {
                toValue: 0,
                duration: animationDuration,
                useNativeDriver: true,
            }),
        ]).start();
    };
    const mask = (0, spotlight_utils_1.getSpotlightMask)(childMeasures, spotlightShape, customShape, spotlightPadding);
    return (<>
      <react_native_1.View ref={childRef} style={styles_1.styles.childWrapper} onLayout={onChildLayout} collapsable={false}>
        {children}
      </react_native_1.View>
      <react_native_1.Modal visible={isVisible} transparent animationType="none">
        <SpotlightOverlay_1.SpotlightOverlay spotlightShape={spotlightShape} customShape={customShape} overlayColor={overlayColor} mask={mask} fadeAnim={fadeAnim}/>
        <SpotlightContent_1.SpotlightContent content={content} contentPosition={contentPosition} contentContainerStyle={contentContainerStyle} contentTextStyle={contentTextStyle} buttonContainerStyle={buttonContainerStyle} buttonStyle={buttonStyle} buttonTextStyle={buttonTextStyle} prevButtonText={prevButtonText} nextButtonText={nextButtonText} finishButtonText={finishButtonText} onNext={onNext} onPrev={onPrev} onFinish={onFinish} mask={mask} fadeAnim={contentFadeAnim}/>
      </react_native_1.Modal>
    </>);
};
exports.SpotlightGuide = SpotlightGuide;
