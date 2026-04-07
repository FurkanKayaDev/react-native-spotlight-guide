import React from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { SpotlightContentProps, SpotlightMask } from '../../types/spotlight.types';
import { styles } from './styles';
import { SCREEN } from '../../constants';

const getContentPosition = (mask: SpotlightMask | null, contentPosition: string) => {
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
      if (mask.y + mask.height + contentHeight + margin > SCREEN.HEIGHT) {
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
          maxWidth: SCREEN.WIDTH - (mask.x + mask.width + margin * 2),
        };
      }
      return {
        top: mask.y + (mask.height - contentHeight) / 2,
        right: SCREEN.WIDTH - mask.x + margin,
        maxWidth: mask.x - margin * 2,
      };
    }
    case 'right': {
      if (mask.x + mask.width + 300 + margin > SCREEN.WIDTH) {
        return {
          top: mask.y + (mask.height - contentHeight) / 2,
          right: SCREEN.WIDTH - mask.x + margin,
          maxWidth: mask.x - margin * 2,
        };
      }
      return {
        top: mask.y + (mask.height - contentHeight) / 2,
        left: mask.x + mask.width + margin,
        maxWidth: SCREEN.WIDTH - (mask.x + mask.width + margin * 2),
      };
    }
    default:
      return defaultPosition;
  }
};

export const SpotlightContent: React.FC<SpotlightContentProps> = ({
  content,
  contentPosition,
  contentContainerStyle,
  contentTextStyle,
  buttonContainerStyle,
  buttonStyle,
  buttonTextStyle,
  prevButtonText,
  nextButtonText,
  finishButtonText,
  onNext,
  onPrev,
  onFinish,
  mask,
  fadeAnim,
  hideButtons = false,
}) => {
  const contentPositionStyle = getContentPosition(mask, contentPosition);
  const shouldRenderButtons = !hideButtons && !!(onPrev || onNext || onFinish);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <View style={[styles.contentContainer, contentPositionStyle, contentContainerStyle]}>
        {typeof content === 'string' || typeof content === 'number' ? (
          <Text style={[styles.contentText, contentTextStyle]}>{content}</Text>
        ) : (
          content
        )}
        {shouldRenderButtons && (
          <View style={[styles.buttonContainer, buttonContainerStyle]}>
            {onPrev && (
              <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPrev}>
                <Text style={[styles.buttonText, buttonTextStyle]}>{prevButtonText || 'Previous'}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onNext || onFinish}>
              <Text style={[styles.buttonText, buttonTextStyle]}>
                {nextButtonText || (onNext ? 'Next' : finishButtonText || 'Finish')}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Animated.View>
  );
};
