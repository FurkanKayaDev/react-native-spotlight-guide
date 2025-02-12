import React, { useEffect, useRef, useState } from "react";
import { Animated, LayoutChangeEvent, Modal, View } from "react-native";
import { SpotlightGuideProps } from "../../types/spotlight.types";
import { styles } from "./styles";
import { SpotlightContent } from "./SpotlightContent";
import { SpotlightOverlay } from "./SpotlightOverlay";
import { SPOTLIGHT_DEFAULTS } from "../../constants";
import {
  getSpotlightMask,
  measureChildInWindow,
} from "../../utils/spotlight.utils";

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
export const SpotlightGuide: React.FC<SpotlightGuideProps> = ({
  children,
  isVisible,
  content,
  spotlightShape = SPOTLIGHT_DEFAULTS.SHAPE,
  customShape,
  spotlightPadding = SPOTLIGHT_DEFAULTS.PADDING,
  overlayOpacity = SPOTLIGHT_DEFAULTS.OVERLAY_OPACITY,
  overlayColor = SPOTLIGHT_DEFAULTS.OVERLAY_COLOR,
  onNext,
  onPrev,
  onFinish,
  animationDuration = SPOTLIGHT_DEFAULTS.ANIMATION_DURATION,
  contentPosition = SPOTLIGHT_DEFAULTS.CONTENT_POSITION,
  contentContainerStyle,
  contentTextStyle,
  buttonContainerStyle,
  buttonStyle,
  buttonTextStyle,
  prevButtonText,
  nextButtonText,
  finishButtonText,
}) => {
  const [childMeasures, setChildMeasures] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
    pageX: number;
    pageY: number;
  } | null>(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const contentFadeAnim = useRef(new Animated.Value(0)).current;
  const childRef = useRef<View>(null);
  const measureAttempts = useRef(0);

  useEffect(() => {
    if (isVisible) {
      measureAttempts.current = 0;
      measureChild();
      fadeIn();
    } else {
      fadeOut();
    }
  }, [isVisible]);

  const onChildLayout = () => {
    measureAttempts.current = 0;
    attemptMeasurement();
  };

  const attemptMeasurement = () => {
    if (measureAttempts.current < SPOTLIGHT_DEFAULTS.MEASURE_ATTEMPTS) {
      setTimeout(() => {
        measureChild();
        measureAttempts.current += 1;
      }, SPOTLIGHT_DEFAULTS.MEASURE_DELAY * measureAttempts.current);
    }
  };

  const measureChild = () => {
    measureChildInWindow(childRef, setChildMeasures);
  };

  const fadeIn = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: overlayOpacity,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(contentFadeAnim, {
        toValue: 1,
        duration: animationDuration,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const fadeOut = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(contentFadeAnim, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const mask = getSpotlightMask(
    childMeasures,
    spotlightShape,
    customShape,
    spotlightPadding
  );

  return (
    <>
      <View
        ref={childRef}
        style={styles.childWrapper}
        onLayout={onChildLayout}
        collapsable={false}
      >
        {children}
      </View>
      <Modal visible={isVisible} transparent animationType="none">
        <SpotlightOverlay
          spotlightShape={spotlightShape}
          customShape={customShape}
          overlayColor={overlayColor}
          mask={mask}
          fadeAnim={fadeAnim}
        />
        <SpotlightContent
          content={content}
          contentPosition={contentPosition}
          contentContainerStyle={contentContainerStyle}
          contentTextStyle={contentTextStyle}
          buttonContainerStyle={buttonContainerStyle}
          buttonStyle={buttonStyle}
          buttonTextStyle={buttonTextStyle}
          prevButtonText={prevButtonText}
          nextButtonText={nextButtonText}
          finishButtonText={finishButtonText}
          onNext={onNext}
          onPrev={onPrev}
          onFinish={onFinish}
          mask={mask}
          fadeAnim={contentFadeAnim}
        />
      </Modal>
    </>
  );
};
