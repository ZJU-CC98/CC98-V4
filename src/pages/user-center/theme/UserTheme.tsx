import React from 'react'
import { RootStore } from 'src/store'
import { useDispatch, useSelector } from 'react-redux'
import THEME, { getThemeName } from 'src/constants/Theme'
import Button from 'src/components/Button'
import { GLOBAL_ACTION_TYPES, GlobalActions } from 'src/store/global-actions'
import { setMyTheme } from 'src/service/user'
import { refreshUserInfo } from 'src/store/global-async-actions'
import { getPrimaryColor, themeMap } from 'src/config/theme'

import s from './UserTheme.m.scss'

function selector(state: RootStore) {
  return {
    currentTheme: state.global.theme,
  }
}

const UserTheme: React.FC = () => {
  const { currentTheme } = useSelector(selector)
  const dispatch = useDispatch()

  const makeHandleClick = (item: THEME) => () => {
    dispatch({
      type: GLOBAL_ACTION_TYPES.SET_THEME,
      payload: item,
    } as GlobalActions)

    setMyTheme(item).then(() => {
      dispatch(refreshUserInfo())
    })
  }

  return (
    <>
      <h3 className={s.title}>切换皮肤</h3>
      <p className={s.info}>当前皮肤：{getThemeName(currentTheme)}</p>
      {Object.values<THEME>(THEME as any)
        .filter(item => typeof item === 'number')
        .map(item => (
          <Button
            className={s.button}
            key={item}
            style={{
              backgroundColor: getPrimaryColor(item),
              color: themeMap[item].palette['text-color-primary'],
            }}
            onClick={makeHandleClick(item)}
            disabled={item === currentTheme}
          >
            {getThemeName(item)}
          </Button>
        ))}
    </>
  )
}

export default UserTheme
