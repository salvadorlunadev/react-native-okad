
type ScreensState = {
  previousScreen: string,
  currentScreen: string
}

export const initialScreens: ScreensState = {
  previousScreen: '',
  currentScreen: 'Splash',
}

export const screens = (state: ScreensState = initialScreens, action: ScreensAction) => {
  const { payload = {}, type } = action
  switch (type) {
    case 'clean_toast':
      return initialScreens
    case 'set_toast':
      return { ...state, ...payload }
    default:
      return state
  }
}

export type ScreensAction = { payload?: $Shape<ScreensState>, type: string }