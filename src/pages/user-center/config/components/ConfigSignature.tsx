import React from 'react'
import { IEditUserInfo } from '@cc98/api'

import s from './ConfigSignature.m.scss'

interface IConfigSignatureProps {
  value: IEditUserInfo
  onChange: (value: Partial<IEditUserInfo>) => void
}

const ConfigSignature: React.FC<IConfigSignatureProps> = ({ value, onChange }) => (
  <div>
    <textarea
      className={s.textarea}
      value={value.SignatureCode}
      onChange={e => onChange({ SignatureCode: e.target.value })}
    />
    <p className={s.info}>注* 个性签名将在个人主页、发布文章、回复文章中显示，允许使用UBB代码</p>
  </div>
)

export default ConfigSignature
