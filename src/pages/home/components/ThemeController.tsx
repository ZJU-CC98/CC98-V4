import React from 'react'
import { useDispatch } from 'react-redux'
import THEME, { getThemeName } from 'src/constants/theme'
import { GLOBAL_ACTION_TYPES } from 'src/store/global-actions'
import { themeMap } from 'src/config/theme'

const ThemeController: React.FC = () => {
  const dispatch = useDispatch()

  return (
    <>
      {Object.values(THEME).map((theme: THEME) => (
        <button
          style={{
            color: themeMap[theme].palette['text-color'],
            backgroundColor: themeMap[theme].palette.primary,
          }}
          type="button"
          key={theme}
          onClick={() => {
            dispatch({
              type: GLOBAL_ACTION_TYPES.SET_THEME,
              payload: theme,
            })
          }}
        >
          {getThemeName(theme)}
        </button>
      ))}
    </>
  )
}

export default ThemeController
