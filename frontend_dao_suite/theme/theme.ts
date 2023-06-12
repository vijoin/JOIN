import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({ 
  colors: {
    brand: {
      primary: {
        default: "#5155DA",
        hover: "#4f4fde",
        disabled: "#695eff"
      },
      secondary: {
        default: "#EDEA00",
      },
    },
    neutrals: {
      gray: {
        100: "#A5A6BA",
        200: "#7A7A86",
        300: "#3A3A37",
        400: "#1C1C1C",
        500: "#101010"

      },
      light: {
        100: "#FFFF",
        200: "#F4F7FE",
        300: "#EAE8FD",
      },
    },
    semantic: {
      error: {
        red: "#F15151",
      },
      success: {
        200: "#00F5B4",
        600: "#00BC8B",
        800: "#00A378",
      },
    },
  },
 })

export default theme