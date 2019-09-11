import React from 'react'

import s from './GlobalFooter.m.scss'

const GlobalFooter: React.FC = () => (
  <>
    <p className={s.p}>
      <span className={s.label}>友情链接</span>
      <a target="_blank" rel="noopener noreferrer" href="http://www.zju.edu.cn/">
        浙江大学
      </a>
      <span className={s.divider}>|</span>
      <a target="_blank" rel="noopener noreferrer" href="http://www.cs.zju.edu.cn/">
        浙江大学计算机学院
      </a>
      <span className={s.divider}>|</span>
      <a target="_blank" rel="noopener noreferrer" href="http://www.zju88.org/agent/index.do">
        飘渺水云间
      </a>
      <span className={s.divider}>|</span>
      <a target="_blank" rel="noopener noreferrer" href="http://www.qsc.zju.edu.cn/">
        求是潮
      </a>
      <span className={s.divider}>|</span>
      <a target="_blank" rel="noopener noreferrer" href="http://luckweb.057101.com/bt2/index.asp">
        缘网
      </a>
      <span className={s.divider}>|</span>
      <a target="_blank" rel="noopener noreferrer" href="http://www.nexushd.org">
        NexusHD
      </a>
      <span className={s.divider}>|</span>
      <a target="_blank" rel="noopener noreferrer" href="https://www.zdgd.zju.edu.cn/">
        浙江大学广播电视网
      </a>
      <span className={s.divider}>|</span>
      <a target="_blank" rel="noopener noreferrer" href="http://zy.zju.edu.cn/">
        浙大搜索
      </a>
    </p>
    <p className={s.p}>
      Copyright © 2003-{new Date().getFullYear()} CC98
      <span style={{ margin: '0 4px' }} role="img" aria-label="cherry">
        🍒
      </span>
      v4.0.0-dev
      <span className={s.divider}>|</span>
      <a href="mailto:contact@cc98.org">Email: contact@cc98.org</a>
    </p>
  </>
)

export default GlobalFooter
