import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  Dimensions,
  TextStyle,
} from 'react-native';
import {SpotlightGuide} from '../../src';

const {width} = Dimensions.get('window');
const CARD_WIDTH = width - 32;

function App(): React.JSX.Element {
  const [currentStep, setCurrentStep] = useState(0);
  const [showGuide, setShowGuide] = useState(true);

  // Define the steps for the spotlight guide
  const steps = [
    // Circle Spotlight Example
    {
      content: 'Circle spotlight is perfect for profile pictures and icons',
      spotlightShape: 'circle',
      contentPosition: 'bottom',
      overlayColor: 'rgba(0, 0, 0, 0.8)',
      onPressOverlay: () => setCurrentStep(prevStep => prevStep + 1),
      contentContainerStyle: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
      },
      contentTextStyle: {
        fontSize: 16,
        color: '#1a1a1a',
        lineHeight: 24,
        textAlign: 'center',
        fontWeight: '600',
      } as TextStyle,
    },

    // Rectangle Spotlight Example with Custom Content
    {
      content: 'Rectangle spotlight with custom content styling',
      contentPosition: 'bottom',
      overlayColor: 'rgba(0, 0, 0, 0.8)',
      onPressOverlay: () => setCurrentStep(prevStep => prevStep + 1),
      contentContainerStyle: {
        backgroundColor: '#1E1E1E',
        borderRadius: 20,
        padding: 24,
        borderWidth: 1,
        borderColor: '#007AFF',
        shadowColor: '#007AFF',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 5,
      },
      contentTextStyle: {
        color: '#FFFFFF',
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'center',
        fontWeight: '600',
      } as TextStyle,
      buttonContainerStyle: {
        marginTop: 16,
        gap: 12,
      },
      buttonStyle: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 12,
      },
      buttonTextStyle: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '600',
        letterSpacing: 0.3,
      },
    },

    // Custom Spotlight with Animation
    {
      content: 'Spotlight with custom overlay and animation settings',
      spotlightShape: 'rectangle',
      contentPosition: 'top',
      overlayColor: 'rgba(52, 73, 94, 0.9)',
      onPressOverlay: () => setCurrentStep(prevStep => prevStep + 1),
      animationDuration: 300,
      pulseAnimation: true,
      contentContainerStyle: {
        backgroundColor: '#34495e',
        borderRadius: 16,
        padding: 20,
        borderLeftWidth: 4,
        borderLeftColor: '#1abc9c',
      },
      contentTextStyle: {
        fontSize: 16,
        color: '#fff',
        lineHeight: 24,
        textAlign: 'center',
        fontWeight: '600',
      } as TextStyle,
      buttonStyle: {
        backgroundColor: '#1abc9c',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 12,
      },
      buttonTextStyle: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '600',
        letterSpacing: 0.3,
      },
    },

    // Custom Spotlight Example
    {
      content: 'Custom spotlight with specific dimensions and styling',
      spotlightShape: 'custom',
      contentPosition: 'top',
      overlayColor: 'rgba(0, 0, 0, 0.8)',
      customShape: {
        width: CARD_WIDTH,
        height: 240,
        backgroundColor: 'rgba(0, 122, 255, 0.1)',
        borderWidth: 2,
        borderColor: '#007AFF',
        borderStyle: 'dashed',
        offsetY: -60,
      },
      contentContainerStyle: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
      },
      contentTextStyle: {
        fontSize: 16,
        color: '#1a1a1a',
        lineHeight: 24,
        textAlign: 'center',
        fontWeight: '500',
      },
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowGuide(false);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setShowGuide(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome back</Text>
          <Text style={styles.nameText}>John Doe</Text>
        </View>
        {/* Circle Spotlight */}
        <SpotlightGuide
          isVisible={showGuide && currentStep === 0}
          {...steps[0]}
          onNext={handleNext}>
          <TouchableOpacity style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Image
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw4xIzlTTRJKIQB1tq1Jbs5Rfj7hU6h1UtPg&s',
                }}
                style={styles.avatarImage}
              />
              <View style={styles.onlineBadge} />
            </View>
          </TouchableOpacity>
        </SpotlightGuide>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Rectangle Spotlight with Custom Content */}
        <SpotlightGuide
          isVisible={showGuide && currentStep === 1}
          {...steps[1]}
          onNext={handleNext}
          onPrev={handlePrev}>
          <View style={styles.analyticsCard}>
            <View style={styles.analyticsHeader}>
              <Text style={styles.cardTitle}>Daily Statistics</Text>
              <View style={styles.analyticsDate}>
                <Text style={styles.dateText}>Today</Text>
              </View>
            </View>
            <View style={styles.analyticsGrid}>
              <View style={styles.analyticsItem}>
                <View
                  style={[
                    styles.analyticsIcon,
                    {backgroundColor: 'rgba(0, 122, 255, 0.1)'},
                  ]}>
                  <View
                    style={[styles.iconDot, {backgroundColor: '#007AFF'}]}
                  />
                </View>
                <Text style={styles.analyticsValue}>24</Text>
                <Text style={styles.analyticsLabel}>Tasks</Text>
              </View>
              <View style={styles.analyticsItem}>
                <View
                  style={[
                    styles.analyticsIcon,
                    {backgroundColor: 'rgba(76, 175, 80, 0.1)'},
                  ]}>
                  <View
                    style={[styles.iconDot, {backgroundColor: '#4CAF50'}]}
                  />
                </View>
                <Text style={styles.analyticsValue}>12</Text>
                <Text style={styles.analyticsLabel}>Meetings</Text>
              </View>
              <View style={styles.analyticsItem}>
                <View
                  style={[
                    styles.analyticsIcon,
                    {backgroundColor: 'rgba(255, 149, 0, 0.1)'},
                  ]}>
                  <View
                    style={[styles.iconDot, {backgroundColor: '#FF9500'}]}
                  />
                </View>
                <Text style={styles.analyticsValue}>89%</Text>
                <Text style={styles.analyticsLabel}>Efficiency</Text>
              </View>
            </View>
          </View>
        </SpotlightGuide>

        {/* Oval Spotlight yerine yeni örnek */}
        <SpotlightGuide
          isVisible={showGuide && currentStep === 2}
          {...steps[2]}
          onPrev={handlePrev}
          onNext={handleNext}>
          <View style={styles.activitiesCard}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.cardTitle}>Recent Activities</Text>
                <Text style={styles.cardSubtitle}>Last 24 hours</Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.seeAllButton,
                  {backgroundColor: 'rgba(26, 188, 156, 0.1)'},
                ]}>
                <Text style={[styles.seeAllText, {color: '#1abc9c'}]}>
                  See All
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.activityList}>
              <View style={styles.activityItem}>
                <View
                  style={[
                    styles.activityIcon,
                    {backgroundColor: 'rgba(26, 188, 156, 0.1)'},
                  ]}>
                  <View
                    style={[styles.activityDot, {backgroundColor: '#1abc9c'}]}
                  />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityText}>New project created</Text>
                  <Text style={styles.activityTime}>14:30</Text>
                </View>
              </View>
              <View style={styles.activityItem}>
                <View
                  style={[
                    styles.activityIcon,
                    {backgroundColor: 'rgba(26, 188, 156, 0.1)'},
                  ]}>
                  <View
                    style={[styles.activityDot, {backgroundColor: '#1abc9c'}]}
                  />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityText}>Task completed</Text>
                  <Text style={styles.activityTime}>12:15</Text>
                </View>
              </View>
              <View style={styles.activityItem}>
                <View
                  style={[
                    styles.activityIcon,
                    {backgroundColor: 'rgba(26, 188, 156, 0.1)'},
                  ]}>
                  <View
                    style={[styles.activityDot, {backgroundColor: '#1abc9c'}]}
                  />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityText}>Meeting reminder</Text>
                  <Text style={styles.activityTime}>10:00</Text>
                </View>
              </View>
            </View>
          </View>
        </SpotlightGuide>

        {/* Custom Spotlight */}
        <SpotlightGuide
          isVisible={showGuide && currentStep === 3}
          {...steps[3]}
          onPrev={handlePrev}
          onFinish={() => setShowGuide(false)}>
          <View style={styles.customSpotlightCard}>
            <View style={styles.customHeader}>
              <View style={styles.customIcon}>
                <View style={styles.customDot} />
              </View>
              <Text style={styles.customTitle}>Custom Spotlight Shape</Text>
            </View>
            <Text style={styles.customDescription}>
              This example demonstrates a custom spotlight shape with specific
              dimensions, dashed borders, and a semi-transparent background.
              Perfect for highlighting special features or important content
              areas.
            </Text>
            <View style={styles.customFeatures}>
              <View style={styles.featureItem}>
                <View style={styles.featureIcon} />
                <Text style={styles.featureText}>Custom Dimensions</Text>
              </View>
              <View style={styles.featureItem}>
                <View
                  style={[
                    styles.featureIcon,
                    {backgroundColor: 'rgba(76, 175, 80, 0.1)'},
                  ]}
                />
                <Text style={styles.featureText}>Dashed Borders</Text>
              </View>
              <View style={styles.featureItem}>
                <View
                  style={[
                    styles.featureIcon,
                    {backgroundColor: 'rgba(255, 149, 0, 0.1)'},
                  ]}
                />
                <Text style={styles.featureText}>Semi-transparent BG</Text>
              </View>
            </View>
          </View>
        </SpotlightGuide>
      </ScrollView>

      {/* Restart Button */}
      {!showGuide && (
        <TouchableOpacity
          style={styles.restartButton}
          onPress={handleRestart}
          activeOpacity={0.8}>
          <Text style={styles.buttonText}>Restart Guide</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  welcomeText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  nameText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    letterSpacing: 0.3,
  },
  avatarContainer: {
    position: 'relative',
    padding: 4,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 2,
    borderColor: '#fff',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  onlineBadge: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#fff',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  analyticsCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    width: CARD_WIDTH,
  },
  analyticsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  analyticsDate: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  dateText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  analyticsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  analyticsItem: {
    alignItems: 'center',
    flex: 1,
  },
  analyticsIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  analyticsValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  analyticsLabel: {
    fontSize: 13,
    color: '#666',
    letterSpacing: 0.3,
  },
  activitiesCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    width: CARD_WIDTH,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    letterSpacing: 0.3,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    letterSpacing: 0.3,
  },
  seeAllButton: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  seeAllText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  activityList: {
    gap: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  activityContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityText: {
    fontSize: 15,
    color: '#1a1a1a',
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  activityTime: {
    fontSize: 13,
    color: '#666',
    letterSpacing: 0.3,
  },
  customSpotlightCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    marginVertical: 8,
    width: CARD_WIDTH,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    minHeight: 240,
  },
  customHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  customIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  customDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#007AFF',
  },
  customTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    letterSpacing: 0.3,
  },
  customDescription: {
    fontSize: 15,
    color: '#666',
    lineHeight: 24,
    letterSpacing: 0.3,
  },
  customFeatures: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  restartButton: {
    backgroundColor: '#007AFF',
    margin: 16,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

export default App;
