import React from 'react'
import produce from 'immer'
import { omit } from 'lodash'
import cn from 'classnames'
import { IRecommendationReading } from '@cc98/api'
import Button from 'src/components/Button'
import Pagination from 'src/components/Pagination'
import { addManageItem, updateManageItem } from 'src/service/config'
import notice from 'src/utils/notice'

import { ALL_MANAGE_TYPE, FORM_TYPE, getManageTypeDesc, MANAGE_MAP, MANAGE_TYPE } from './constants'

import s from './Advertisement.m.scss'

const PAGE_SIZE = 10

// 添加时临时用的 id
// 从 -1 开始递减
let baseId = -1

const Advertisement: React.FC = () => {
  const [currentType, setCurrentType] = React.useState<MANAGE_TYPE>()
  const [data, setData] = React.useState<IRecommendationReading[]>([])
  const [currentPage, setCurrentPage] = React.useState(1)

  const { formItems } = MANAGE_MAP[currentType || MANAGE_TYPE.RECOMMENDATION_READING]

  const makeHandleButtonClick = (manageType: MANAGE_TYPE) => () => {
    const { initService } = MANAGE_MAP[manageType]
    setData([])

    initService().then(res => {
      setData(res)
      setCurrentType(manageType)
      setCurrentPage(1)
    })
  }

  const makeHandleCheckboxChange = (id: number, name: keyof IRecommendationReading) => ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setData(
      produce<(state: IRecommendationReading[]) => void>(state => {
        const current = state.find(item => item.id === id)
        if (!current) return
        // @ts-ignore TODO:
        current[name] = target.checked
      })
    )
  }

  const makeHandleNumberInputChange = (id: number, name: keyof IRecommendationReading) => ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setData(
      produce<(state: IRecommendationReading[]) => void>(state => {
        const current = state.find(item => item.id === id)
        if (!current) return
        // @ts-ignore TODO:
        current[name] = parseInt(target.value, 10)
      })
    )
  }

  const makeHandleInputChange = (id: number, name: keyof IRecommendationReading) => ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setData(
      produce<(state: IRecommendationReading[]) => void>(state => {
        const current = state.find(item => item.id === id)
        if (!current) return
        // @ts-ignore TODO:
        current[name] = target.value
      })
    )
  }

  const makeHandleSave = (id: number) => async () => {
    const current = data.find(item => item.id === id)

    if (!current) return

    if (id < 0) {
      await addManageItem(omit(current, 'id'))
    } else {
      await updateManageItem(id, current)
    }

    notice('修改成功')

    if (currentType) {
      MANAGE_MAP[currentType].initService().then(setData)
    }
  }

  const handleAdd = () => {
    if (currentType) {
      setData(prev => [
        {
          title: '',
          content: '',
          url: '',
          imageUrl: '',
          enable: true,
          id: baseId,
          type: currentType,
          time: '',
          expiredTime: '',
          orderWeight: 0,
        },
        ...prev,
      ])
      setCurrentPage(1)
      baseId -= 1
    }
  }

  const getInputProps = (
    item: IRecommendationReading,
    formType: FORM_TYPE,
    name: keyof IRecommendationReading
  ): JSX.IntrinsicElements['input'] => {
    switch (formType) {
      case FORM_TYPE.CHECKBOX:
        return {
          checked: item[name] as boolean,
          onChange: makeHandleCheckboxChange(item.id, name),
        }
      case FORM_TYPE.NUMBER_INPUT:
        return {
          value: `${item[name]}`,
          onChange: makeHandleNumberInputChange(item.id, name),
        }
      case FORM_TYPE.INPUT:
        return {
          value: item[name] as string,
          onChange: makeHandleInputChange(item.id, name),
        }
      default:
        return {}
    }
  }

  return (
    <div>
      <p className={s.title}>
        <span>自定义栏目</span>
        {ALL_MANAGE_TYPE.map(manageType => (
          <Button
            key={manageType}
            primary
            disabled={currentType === manageType}
            onClick={makeHandleButtonClick(manageType)}
          >
            {getManageTypeDesc(manageType)}
          </Button>
        ))}
        <Button primary disabled={!currentType} onClick={handleAdd}>
          添 加
        </Button>
      </p>
      {currentType && (
        <table className={s.table}>
          <thead>
            <tr>
              <th className={s.id}>id</th>
              <th className={s.type}>type</th>
              {formItems.map(({ name, formType }) => (
                <th className={cn({ [s.checkbox]: formType === FORM_TYPE.CHECKBOX })} key={name}>
                  {name}
                </th>
              ))}
              <th className={s.save}>save</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(PAGE_SIZE * (currentPage - 1), PAGE_SIZE * currentPage).map(row => (
              <tr key={row.id}>
                <td className={s.id}>{row.id > 0 ? row.id : '新增'}</td>
                <td className={s.type}>{getManageTypeDesc(row.type)}</td>
                {formItems.map(({ name, formType, formatItem = item => item }) => (
                  <td
                    className={cn({ [s.checkbox]: formType === FORM_TYPE.CHECKBOX })}
                    key={`${row.id}-${name}`}
                  >
                    {formType === FORM_TYPE.TEXT ? (
                      formatItem(row[name])
                    ) : (
                      <input type={formType} {...getInputProps(row, formType, name)} />
                    )}
                  </td>
                ))}
                <td className={s.save}>
                  <Button primary onClick={makeHandleSave(row.id)}>
                    保 存
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {currentType && data.length > PAGE_SIZE && (
        <div className={s.pager}>
          <Pagination
            total={Math.ceil(data.length / PAGE_SIZE)}
            onChange={setCurrentPage}
            current={currentPage}
          />
        </div>
      )}
    </div>
  )
}

export default Advertisement
