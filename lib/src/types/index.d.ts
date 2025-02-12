export interface SpotlightGuideProps {
    steps: SpotlightStep[];
    isVisible: boolean;
    onFinish: () => void;
    onSkip?: () => void;
    overlayColor?: string;
    overlayOpacity?: number;
    spotlightPadding?: number;
}
export interface SpotlightStep {
    target: any;
    title?: string;
    description: string;
    shape?: "rectangle" | "circle" | "square";
    spotlightStyles?: any;
    contentStyles?: any;
    buttonStyles?: any;
    nextButtonText?: string;
    prevButtonText?: string;
    finishButtonText?: string;
}
