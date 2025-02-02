import { Dimensions, Platform } from 'react-native'
import DeviceInfo from 'react-native-device-info'

const defaultColors = {
  backgroundWhite: '#FFFFFF',
  backgroundGray1: '#D8D8D8',

  purple: '#5D396E',
  lightPurple: '#9E5FC2',
  gray: '#9b9b9b',
  gray1: '#D8D8D8',

  black: '#000000',
  black50: 'rgba(0, 0, 0, .75)',
  
  textBlack: '#000000',
  textBlack1: '#3D3D3D',
  textBlack2: '#55465F',
  textPurple: '#5D396E',
  textWhite: '#FFF',
  textGray: '#979797',
}

function getThemeColors(theme: Theme): AppColors {
  switch (theme) {
    case 'normal':
    default:
      return defaultColors
  }
}

const width: number = Dimensions.get('window').width
const height: number = Dimensions.get('window').height
const hasNotch = DeviceInfo.hasNotch()
const iPhoneX = Platform.OS === 'ios' && (height === 812 || height === 896)

const fonts = {
  anBold: 'AvenirNextLTPro-Bold',
  anItalic: 'AvenirNextLTPro-It',
  anRegular: 'AvenirNextLTPro-Regular',
}

const scale = (value: number) => {
  if (height / width >= 2) {
    return (value * width) / 768
  } else {
    return (value * height) / 1024
  }
}

const textSizes: {
  [number]: { fontSize: number, letterSpacing: number, lineHeight: number }
} = {
  [9]: {
    fontSize: scale(9),
    letterSpacing: scale(0.5),
    lineHeight: scale(10)
  },
  [10]: {
    fontSize: scale(10),
    letterSpacing: scale(0.5),
    lineHeight: scale(10)
  },
  [11]: {
    fontSize: scale(11),
    letterSpacing: scale(0.5),
    lineHeight: scale(11)
  },
  [12]: {
    fontSize: scale(12),
    letterSpacing: scale(0.5),
    lineHeight: scale(12)
  },
  [14]: {
    fontSize: scale(14),
    letterSpacing: scale(0.5),
    lineHeight: scale(14)
  },
  [16]: {
    fontSize: scale(16),
    letterSpacing: scale(0.5),
    lineHeight: scale(16),
  },
  [18]: {
    fontSize: scale(18),
    letterSpacing: scale(0.5),
    lineHeight: scale(18)
  },
  [20]: {
    fontSize: scale(20),
    letterSpacing: scale(0.5),
    lineHeight: scale(20)
  },
  [24]: {
    fontSize: scale(24),
    letterSpacing: scale(0.5),
    lineHeight: scale(24)
  },
  [26]: {
    fontSize: scale(26),
    letterSpacing: scale(0.5),
    lineHeight: scale(26)
  },
  [30]: {
    fontSize: scale(30),
    letterSpacing: 0,
    lineHeight: scale(30)
  },
  [40]: {
    fontSize: scale(40),
    letterSpacing: 0,
    lineHeight: scale(40)
  }
}

const commonStyles = (colors: AppColors, getTextStyle) => {
  const viewCentered = { alignItems: 'center', justifyContent: 'center' }
  return {
    backgroundImage: { height: '100%', width: '100%' },
    bottomButtonView: { alignItems: 'center', flex: 1, justifyContent: 'flex-end' },
    content: { flex: 1, paddingHorizontal: scale(20) },
    flexView: { flex: 1 },
    fullImageBackground: {
      height,
      paddingHorizontal: scale(20),
      width
    },
    viewCentered
  }
}

const textStyle = ({ color, font, size }: TextStyleInputs, colors: AppColors) => ({
  color: colors[color],
  fontFamily: fonts[font],
  fontSize: textSizes[size].fontSize,
  letterSpacing: textSizes[size].letterSpacing,
  lineHeight: textSizes[size].lineHeight
})

export default function getThemeStyle(theme: Theme) {
  const colors = getThemeColors(theme)
  const getTextStyle = (inputs: TextStyleInputs) => textStyle(inputs, colors)
  return {
    ...colors,
    ...commonStyles(colors, getTextStyle),
    ...fonts,
    getTextStyle,
    hasNotch,
    iPhoneX,
    scale,
    statusBarStyle: theme === 'dark' ? 'light-content' : 'dark-content',
    window: { height, width }
  }
}

export type TextSizes = 9 | 10 | 11 | 12 | 14 | 16 | 18 | 20 | 24 | 26 | 30 | 40
export type TextStyleInputs = { color: ColorKeys, font: FontKeys, size: TextSizes }
export type AppColors = { [ColorKeys]: ColorValues }
export type AppFonts = { [FontKeys]: FontValues }
export type ColorKeys = $Keys<typeof defaultColors>
export type ColorValues = $Values<typeof defaultColors>
export type FontKeys = $Keys<typeof fonts>
export type FontValues = $Values<typeof fonts>
export type Theme = 'dark' | 'normal'
export type ThemeStyle<T> = $Call<typeof getThemeStyle, T>
