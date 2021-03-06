declare module '*.scss' {
  const classnames: {
    [classname: string]: string
  }

  export default classnames
}

declare module '*.jpg' {
  const url: string

  export default url
}

declare module '*.png' {
  const url: string

  export default url
}

declare module '*.ico' {
  const url: string

  export default url
}

declare module '*.gif' {
  const url: string

  export default url
}
