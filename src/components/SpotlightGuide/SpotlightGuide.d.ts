import React from 'react';
import { SpotlightGuideProps } from '../../types/spotlight.types';
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
export declare const SpotlightGuide: React.FC<SpotlightGuideProps>;
