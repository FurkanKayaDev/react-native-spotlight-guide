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
const { width, height } = react_native_1.Dimensions.get("window");
const SpotlightGuide = ({ steps, isVisible, onFinish, onSkip, overlayColor = "rgba(0, 0, 0, 0.8)", overlayOpacity = 0.8, spotlightPadding = 8, }) => {
    const [currentStep, setCurrentStep] = (0, react_1.useState)(0);
    const [targetMeasurements, setTargetMeasurements] = (0, react_1.useState)(null);
    const fadeAnim = react_1.default.useRef(new react_native_1.Animated.Value(0)).current;
    (0, react_1.useEffect)(() => {
        if (isVisible) {
            measureCurrentTarget();
            fadeIn();
        }
    }, [isVisible, currentStep]);
    const fadeIn = () => {
        react_native_1.Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };
    const measureCurrentTarget = () => {
        var _a;
        const currentTarget = (_a = steps[currentStep]) === null || _a === void 0 ? void 0 : _a.target;
        if (currentTarget === null || currentTarget === void 0 ? void 0 : currentTarget.current) {
            currentTarget.current.measure((_x, _y, width, height, pageX, pageY) => {
                setTargetMeasurements({
                    x: pageX - spotlightPadding,
                    y: pageY - spotlightPadding,
                    width: width + spotlightPadding * 2,
                    height: height + spotlightPadding * 2,
                });
            });
        }
    };
    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
        else {
            onFinish();
        }
    };
    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };
    const renderSpotlight = () => {
        if (!targetMeasurements)
            return null;
        const { shape = "rectangle" } = steps[currentStep];
        const borderRadius = shape === "circle"
            ? Math.max(targetMeasurements.width, targetMeasurements.height) / 2
            : shape === "square"
                ? 0
                : 8;
        return (<react_native_1.View style={[
                styles.spotlight,
                {
                    top: targetMeasurements.y,
                    left: targetMeasurements.x,
                    width: targetMeasurements.width,
                    height: targetMeasurements.height,
                    borderRadius,
                },
                steps[currentStep].spotlightStyles,
            ]}/>);
    };
    const renderContent = () => {
        const { title, description, contentStyles } = steps[currentStep];
        return (<react_native_1.View style={[styles.content, contentStyles]}>
        {title && <react_native_1.Text style={styles.title}>{title}</react_native_1.Text>}
        <react_native_1.Text style={styles.description}>{description}</react_native_1.Text>
        <react_native_1.View style={styles.buttonContainer}>
          {currentStep > 0 && (<react_native_1.TouchableOpacity style={[styles.button, steps[currentStep].buttonStyles]} onPress={handlePrev}>
              <react_native_1.Text style={styles.buttonText}>
                {steps[currentStep].prevButtonText || "Previous"}
              </react_native_1.Text>
            </react_native_1.TouchableOpacity>)}
          <react_native_1.TouchableOpacity style={[styles.button, steps[currentStep].buttonStyles]} onPress={handleNext}>
            <react_native_1.Text style={styles.buttonText}>
              {currentStep === steps.length - 1
                ? steps[currentStep].finishButtonText || "Finish"
                : steps[currentStep].nextButtonText || "Next"}
            </react_native_1.Text>
          </react_native_1.TouchableOpacity>
        </react_native_1.View>
      </react_native_1.View>);
    };
    if (!isVisible)
        return null;
    return (<react_native_1.Modal transparent visible={isVisible}>
      <react_native_1.Animated.View style={[
            styles.container,
            {
                backgroundColor: overlayColor,
                opacity: fadeAnim,
            },
        ]}>
        {renderSpotlight()}
        {renderContent()}
      </react_native_1.Animated.View>
    </react_native_1.Modal>);
};
exports.SpotlightGuide = SpotlightGuide;
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    spotlight: {
        position: "absolute",
        backgroundColor: "transparent",
        borderColor: "rgba(255, 255, 255, 0.5)",
        borderWidth: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    content: {
        position: "absolute",
        bottom: 50,
        left: 20,
        right: 20,
        backgroundColor: "white",
        padding: 20,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#333",
    },
    description: {
        fontSize: 16,
        color: "#666",
        marginBottom: 16,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 12,
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
