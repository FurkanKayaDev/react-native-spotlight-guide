# 🎯 React Native Spotlight Guide

<div align="center">
  <img src="assets/logo.png" alt="React Native Spotlight Guide" width="200"/>
  
  <p align="center">
    A modern, customizable, and high-performance spotlight/walkthrough library for React Native
  </p>

  <p align="center">
    <a href="https://www.npmjs.com/package/react-native-spotlight-guide">
      <img src="https://img.shields.io/npm/v/react-native-spotlight-guide.svg" alt="npm version" />
    </a>
    <a href="https://www.npmjs.com/package/react-native-spotlight-guide">
      <img src="https://img.shields.io/npm/dm/react-native-spotlight-guide.svg" alt="npm downloads" />
    </a>
    <a href="https://github.com/FurkanKayaDev/react-native-spotlight-guide/blob/main/LICENSE">
      <img src="https://img.shields.io/npm/l/react-native-spotlight-guide.svg" alt="license" />
    </a>
  </p>
</div>

## 🎥 Demo

<div align="center">
  <img src="Demo/demo.gif" alt="React Native Spotlight Guide Demo" width="300"/>
</div>

## ✨ Features

- 🎨 Four spotlight shapes: rectangle, circle, oval, and custom
- 🌈 Fully customizable styles
- 📱 Native performance for iOS and Android
- 🔄 Forward/backward navigation support
- 🎭 Customizable button and content styles
- 🌓 Dark/light theme support
- 📐 Automatic positioning
- 🔧 TypeScript support

## 📦 Installation

### Requirements

- React Native >= 0.72.0
- React >= 18.2.0
- react-native-svg >= 13.0.0

## First, install the main package

```bash
# If you use npm:
npm install react-native-spotlight-guide

# Or if you use Yarn:
yarn add react-native-spotlight-guide
```

## Then, install required peer dependency

```bash
# If you use npm:
npm install react-native-svg

# Or if you use Yarn:
yarn add react-native-svg
```

## For iOS, install pods

```bash
cd ios && pod install && cd ..
```

## 🚀 Quick Start

```tsx
import { SpotlightGuide } from "react-native-spotlight-guide";

const App = () => {
  const [showGuide, setShowGuide] = useState(true);

  return (
    <SpotlightGuide
      isVisible={showGuide}
      content="Welcome! This button starts the main operations."
      spotlightShape="circle"
      contentPosition="bottom"
      onFinish={() => setShowGuide(false)}
    >
      <Button title="Start" onPress={() => {}} />
    </SpotlightGuide>
  );
};
```

## 📚 Props

### Core Props

| Prop          | Type            | Default | Description                   |
| ------------- | --------------- | ------- | ----------------------------- |
| \`children\`  | React.ReactNode | -       | Component to be highlighted   |
| \`isVisible\` | boolean         | false   | Controls spotlight visibility |
| \`content\`   | string          | -       | Text content to be displayed  |

### Appearance Props

| Prop                 | Type                                          | Default              | Description                             |
| -------------------- | --------------------------------------------- | -------------------- | --------------------------------------- |
| \`spotlightShape\`   | 'circle' \| 'oval' \| 'rectangle' \| 'custom' | 'rectangle'          | Shape of the spotlight                  |
| \`customShape\`      | CustomSpotlightShape                          | -                    | Custom spotlight shape configuration    |
| \`spotlightPadding\` | number                                        | 10                   | Padding between spotlight and component |
| \`overlayOpacity\`   | number                                        | 0.7                  | Background overlay opacity (0-1)        |
| \`overlayColor\`     | string                                        | 'rgba(0, 0, 0, 0.7)' | Background overlay color                |

### Position Props

| Prop                | Type                                   | Default  | Description             |
| ------------------- | -------------------------------------- | -------- | ----------------------- |
| \`contentPosition\` | 'top' \| 'bottom' \| 'left' \| 'right' | 'bottom' | Position of content box |

### Style Props

| Prop                      | Type      | Default | Description             |
| ------------------------- | --------- | ------- | ----------------------- |
| \`contentContainerStyle\` | ViewStyle | -       | Content container style |
| \`contentTextStyle\`      | TextStyle | -       | Content text style      |
| \`buttonContainerStyle\`  | ViewStyle | -       | Button container style  |
| \`buttonStyle\`           | ViewStyle | -       | Button style            |
| \`buttonTextStyle\`       | TextStyle | -       | Button text style       |

### Event Props

| Prop               | Type       | Default | Description                 |
| ------------------ | ---------- | ------- | --------------------------- |
| \`onNext\`         | () => void | -       | Next button press event     |
| \`onPrev\`         | () => void | -       | Previous button press event |
| \`onFinish\`       | () => void | -       | Finish button press event   |
| \`onPressOverlay\` | () => void | -       | Overlay press event         |

## 🎨 Customization

### Custom Shape Usage

```tsx
<SpotlightGuide
  spotlightShape="custom"
  customShape={{
    width: 200,
    height: 100,
    borderRadius: 12,
    backgroundColor: "rgba(0, 122, 255, 0.1)",
    borderWidth: 2,
    borderColor: "#007AFF",
    borderStyle: "dashed",
  }}
>
  <YourComponent />
</SpotlightGuide>
```

### Custom Styles

```tsx
<SpotlightGuide
  contentContainerStyle={{
    backgroundColor: "#1E1E1E",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  }}
  contentTextStyle={{
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  }}
  buttonStyle={{
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  }}
>
  <YourComponent />
</SpotlightGuide>
```

## 📱 Example App

To run the example app:

```console
git clone https://github.com/FurkanKayaDev/react-native-spotlight-guide.git
cd react-native-spotlight-guide/example
yarn install
cd ios && pod install && cd ..
yarn ios # or yarn android
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](https://github.com/FurkanKayaDev/react-native-spotlight-guide/blob/main/CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/FurkanKayaDev/react-native-spotlight-guide/blob/main/LICENSE) file for details.

## 🙋‍♂️ Support

If you have any questions or suggestions, please open an issue on [GitHub Issues](https://github.com/FurkanKayaDev/react-native-spotlight-guide/issues).

---

<p align="center">
  Made with ❤️ by Furkan Kaya
</p>
