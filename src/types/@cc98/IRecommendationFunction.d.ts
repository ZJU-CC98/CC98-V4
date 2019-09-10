declare module '@cc98/api' {
  export interface IRecommendationFunction {
    id: number
    title: string
    url: string
    imageUrl: string
    // 权重
    orderWeight: number
  }
}
