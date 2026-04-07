"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotlightContent = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const styles_1 = require("./styles");
const constants_1 = require("../../constants");
const getContentPosition = (mask, contentPosition) => {
    const margin = 20;
    const defaultPosition = {
        top: 100,
        left: 20,
        right: 20,
    };
    if (!mask || typeof mask.y !== 'number' || isNaN(mask.y)) {
        return defaultPosition;
    }
    const contentHeight = 150; // Estimated content height
    switch (contentPosition) {
        case 'top': {
            if (mask.y < contentHeight + margin) {
                return {
                    top: mask.y + mask.height + margin,
                    left: 20,
                    right: 20,
                };
            }
            return {
                top: Math.max(20, mask.y - contentHeight - margin),
                left: 20,
                right: 20,
            };
        }
        case 'bottom': {
            if (mask.y + mask.height + contentHeight + margin > constants_1.SCREEN.HEIGHT) {
                return {
                    top: Math.max(20, mask.y - contentHeight - margin),
                    left: 20,
                    right: 20,
                };
            }
            return {
                top: mask.y + mask.height + margin,
                left: 20,
                right: 20,
            };
        }
        case 'left': {
            if (mask.x < 300 + margin) {
                return {
                    top: mask.y + (mask.height - contentHeight) / 2,
                    left: mask.x + mask.width + margin,
                    maxWidth: constants_1.SCREEN.WIDTH - (mask.x + mask.width + margin * 2),
                };
            }
            return {
                top: mask.y + (mask.height - contentHeight) / 2,
                right: constants_1.SCREEN.WIDTH - mask.x + margin,
                maxWidth: mask.x - margin * 2,
            };
        }
        case 'right': {
            if (mask.x + mask.width + 300 + margin > constants_1.SCREEN.WIDTH) {
                return {
                    top: mask.y + (mask.height - contentHeight) / 2,
                    right: constants_1.SCREEN.WIDTH - mask.x + margin,
                    maxWidth: mask.x - margin * 2,
                };
            }
            return {
                top: mask.y + (mask.height - contentHeight) / 2,
                left: mask.x + mask.width + margin,
                maxWidth: constants_1.SCREEN.WIDTH - (mask.x + mask.width + margin * 2),
            };
        }
        default:
            return defaultPosition;
    }
};
const SpotlightContent = ({ content, contentPosition, contentContainerStyle, contentTextStyle, buttonContainerStyle, buttonStyle, buttonTextStyle, prevButtonText, nextButtonText, finishButtonText, onNext, onPrev, onFinish, mask, fadeAnim, hideButtons = false, }) => {
    const contentPositionStyle = getContentPosition(mask, contentPosition);
    const shouldRenderButtons = !hideButtons && !!(onPrev || onNext || onFinish);
    return (<react_native_1.Animated.View style={{ opacity: fadeAnim }}>
      <react_native_1.View style={[styles_1.styles.contentContainer, contentPositionStyle, contentContainerStyle]}>
        {typeof content === 'string' || typeof content === 'number' ? (<react_native_1.Text style={[styles_1.styles.contentText, contentTextStyle]}>{content}</react_native_1.Text>) : (content)}
        {shouldRenderButtons && (<react_native_1.View style={[styles_1.styles.buttonContainer, buttonContainerStyle]}>
            {onPrev && (<react_native_1.TouchableOpacity style={[styles_1.styles.button, buttonStyle]} onPress={onPrev}>
                <react_native_1.Text style={[styles_1.styles.buttonText, buttonTextStyle]}>{prevButtonText || 'Previous'}</react_native_1.Text>
              </react_native_1.TouchableOpacity>)}
            <react_native_1.TouchableOpacity style={[styles_1.styles.button, buttonStyle]} onPress={onNext || onFinish}>
              <react_native_1.Text style={[styles_1.styles.buttonText, buttonTextStyle]}>
                {nextButtonText || (onNext ? 'Next' : finishButtonText || 'Finish')}
              </react_native_1.Text>
            </react_native_1.TouchableOpacity>
          </react_native_1.View>)}
      </react_native_1.View>
    </react_native_1.Animated.View>);
};
exports.SpotlightContent = SpotlightContent;
