import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
} from 'react-native';
import {SpotlightGuide} from '../../src';

function App(): React.JSX.Element {
  const [currentStep, setCurrentStep] = useState(0);
  const [showGuide, setShowGuide] = useState(true);

  // Define the steps for the spotlight guide
  const steps = [
    // Basic circle spotlight example
    {
      content:
        'This is a basic circular spotlight highlighting a profile picture.',
      spotlightShape: 'circle',
      contentPosition: 'bottom',
    },

    // Rectangle spotlight with custom content position
    {
      content:
        'Rectangle spotlight can be used to highlight card-like components.',
      spotlightShape: 'rectangle',
      contentPosition: 'bottom',
    },

    // Oval spotlight for longer content
    {
      content:
        'Oval spotlight is perfect for highlighting longer text content or list items.',
      spotlightShape: 'oval',
      contentPosition: 'top',
    },

    // Custom spotlight with specific dimensions and offset
    {
      content:
        'Custom spotlight shape with specific dimensions and offset position.',
      spotlightShape: 'custom',
      contentPosition: 'top',
      // Define custom shape properties
      customShape: {
        width: 270,
        height: 120,
        borderRadius: 25,
        offsetX: -30,
        offsetY: 20,
      },
    },

    // Advanced styling example with custom colors and styles
    {
      content:
        'Advanced styling example with custom colors, borders, and button styles.',
      spotlightShape: 'custom',
      contentPosition: 'top',
      // Custom overlay color
      overlayColor: 'rgba(76, 175, 80, 0.7)',

      // Content container customization
      contentContainerStyle: {
        backgroundColor: '#1E1E1E',
        borderRadius: 15,
        padding: 25,
        borderWidth: 1,
        borderColor: '#4CAF50',
      },

      // Content text customization
      contentTextStyle: {
        color: '#FFFFFF',
        fontSize: 18,
        lineHeight: 24,
        textAlign: 'center',
      },

      // Button container customization
      buttonContainerStyle: {
        marginTop: 15,
        gap: 15,
      },

      // Button style customization
      buttonStyle: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 10,
      },

      // Button text customization
      buttonTextStyle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
      },

      // Custom button texts
      prevButtonText: 'Back',
      nextButtonText: 'Next',
      finishButtonText: 'Done',

      // Custom spotlight shape
      customShape: {
        width: 180,
        height: 180,
        borderRadius: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 2,
        borderColor: '#FFF',
        borderStyle: 'dashed',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
        padding: 20,
      },
    },
  ];

  // Handle navigation between steps
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
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Basic Circle Spotlight */}
        <SpotlightGuide
          isVisible={showGuide && currentStep === 0}
          {...steps[0]}
          onNext={handleNext}>
          <View style={styles.avatar}>
            <Image
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw4xIzlTTRJKIQB1tq1Jbs5Rfj7hU6h1UtPg&s',
              }}
              style={styles.avatarImage}
            />
          </View>
        </SpotlightGuide>

        {/* Rectangle Spotlight */}
        <SpotlightGuide
          isVisible={showGuide && currentStep === 1}
          {...steps[1]}
          onNext={handleNext}
          onPrev={handlePrev}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Feature Card</Text>
            <Text style={styles.cardText}>
              Example card component with rectangle spotlight.
            </Text>
          </View>
        </SpotlightGuide>

        {/* Oval Spotlight */}
        <SpotlightGuide
          isVisible={showGuide && currentStep === 2}
          {...steps[2]}
          onPrev={handlePrev}
          onNext={handleNext}>
          <View style={styles.longContent}>
            <Text style={styles.longContentText}>
              Example of a longer content section with oval spotlight shape.
              Perfect for highlighting paragraphs or list items.
            </Text>
          </View>
        </SpotlightGuide>

        {/* Custom Shape Spotlight */}
        <SpotlightGuide
          isVisible={showGuide && currentStep === 3}
          {...steps[3]}
          onPrev={handlePrev}
          onNext={handleNext}>
          <View style={[styles.customContent, {width: 270}]}>
            <Text style={styles.customContentText}>
              Custom shaped spotlight with specific dimensions and offset
              position. You can adjust size, position, and shape as needed.
            </Text>
          </View>
        </SpotlightGuide>

        {/* Advanced Styling Example */}
        <SpotlightGuide
          isVisible={showGuide && currentStep === 4}
          {...steps[4]}
          onPrev={handlePrev}
          onFinish={() => setShowGuide(false)}>
          <View style={styles.advancedContent}>
            <Text style={styles.advancedContentText}>
              Advanced styling example with custom colors, borders, shadows, and
              button styles.
            </Text>
          </View>
        </SpotlightGuide>

        {/* Restart Button */}
        {!showGuide && (
          <TouchableOpacity
            style={styles.restartButton}
            onPress={handleRestart}>
            <Text style={styles.buttonText}>Restart Guide</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    padding: 20,
    gap: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#666',
  },
  longContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  longContentText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#444',
  },
  restartButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 20,
  },
  customContent: {
    backgroundColor: '#F0F8FF',
    padding: 15,
    borderRadius: 25,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  customContentText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  coloredContent: {
    width: 200,
    height: 200,
    padding: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  coloredContentText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  advancedContent: {
    width: 180,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    padding: 20,
  },
  advancedContentText: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
  },
});

export default App;
