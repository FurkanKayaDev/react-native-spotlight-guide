# React Native Spotlight Guide

Modern, özelleştirilebilir ve animasyonlu React Native spotlight/walkthrough kütüphanesi.

## Özellikler

- 🎯 Üç farklı spotlight şekli: dikdörtgen, daire ve oval
- 📍 Özelleştirilebilir spotlight konumu
- 🎨 Tamamen özelleştirilebilir stil ve animasyonlar
- 📱 iOS ve Android desteği
- 🔄 İleri/geri navigasyon
- 🎭 Özelleştirilebilir buton ve içerik stilleri

## Kurulum

```bash
npm install react-native-spotlight-guide
# veya
yarn add react-native-spotlight-guide
```

## Kullanım

```typescript
import { SpotlightGuide } from "react-native-spotlight-guide";

// ...

<SpotlightGuide
  isVisible={true}
  content="Bu bir örnek spotlight içeriğidir."
  spotlightShape="rectangle"
  contentPosition="bottom"
  onNext={() => {}}
>
  <YourComponent />
</SpotlightGuide>;
```

## Props

| Prop                | Tip                                    | Varsayılan  | Açıklama                                |
| ------------------- | -------------------------------------- | ----------- | --------------------------------------- |
| `children`          | React.ReactNode                        | -           | Spotlight'ın gösterileceği bileşen      |
| `isVisible`         | boolean                                | -           | Spotlight'ın görünür olup olmadığı      |
| `content`           | string                                 | -           | Gösterilecek açıklama metni             |
| `spotlightShape`    | 'rectangle' \| 'circle' \| 'oval'      | 'rectangle' | Spotlight'ın şekli                      |
| `spotlightPadding`  | number                                 | 10          | Spotlight ile bileşen arasındaki boşluk |
| `overlayOpacity`    | number                                 | 0.7         | Arkaplan karartma opaklığı              |
| `contentPosition`   | 'top' \| 'bottom' \| 'left' \| 'right' | 'bottom'    | Açıklama metninin konumu                |
| `buttonStyle`       | ViewStyle                              | -           | Buton stil objesi                       |
| `buttonTextStyle`   | TextStyle                              | -           | Buton metin stil objesi                 |
| `contentStyle`      | ViewStyle                              | -           | Açıklama kutusu stil objesi             |
| `animationDuration` | number                                 | 300         | Animasyon süresi (ms)                   |
| `onNext`            | () => void                             | -           | Sonraki butonu tıklama olayı            |
| `onPrev`            | () => void                             | -           | Önceki butonu tıklama olayı             |
| `onFinish`          | () => void                             | -           | Bitir butonu tıklama olayı              |

## Örnek

```typescript
import React, { useState } from "react";
import { View, Button } from "react-native";
import { SpotlightGuide } from "react-native-spotlight-guide";

const App = () => {
  const [showGuide, setShowGuide] = useState(true);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <SpotlightGuide
        isVisible={showGuide}
        content="Bu butona tıklayarak işlemi başlatabilirsiniz."
        spotlightShape="circle"
        contentPosition="bottom"
        spotlightPadding={10}
        onFinish={() => setShowGuide(false)}
      >
        <Button title="Başlat" onPress={() => {}} />
      </SpotlightGuide>
    </View>
  );
};

export default App;
```

## Lisans

MIT
