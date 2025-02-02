import * as React from 'react'
import { Image, View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { useSelector } from 'react-redux'
import { setAction } from '@redux/actions'

import LinearGradient from 'react-native-linear-gradient'

import { SocialLoginButton } from '@components'

import type { Theme, ThemeStyle as StyleType } from '@utils/style'
import { useStyles, useTheme } from '@global/Hooks'
import { navigateHome } from '@utils/functions'

export default function Login() {
  const { themeStyle } = useTheme()
  const { navigate, replace } = useNavigation()
  const { styles } = useStyles(getStyles)
  const user = useSelector((state: any) => state.user)
  const onGoogleLogin = React.useCallback(async (index: number) => {
    // Login google
    setAction('user', { name: 'Test' })
    navigateHome(replace)
  }, [])
  return (
    <LinearGradient
      style={styles.container}
      start={{ x: 0.0, y: 0.0 }} end={{x: 0.0, y: 1.0}}
      locations={[0.7, 0.3]}
      colors={[themeStyle.purple, themeStyle.lightPurple]}
    >
      <SocialLoginButton
        provider={'google'}
        onPress={onGoogleLogin}
      />
    </LinearGradient>
  )
}

const getStyles = (themeStyle: StyleType<Theme>) => ({
  container: {
    flex: 1,
    ...themeStyle.viewCentered,
  },
  text: {
    ...themeStyle.getTextStyle({
      color: 'textBlack',
      font: 'anBold',
      size: 18
    }),
  }
})
