export interface TrendingDateItem {
  trending: boolean
  date: string
}

export class UniversityPageUtils {
  static sortByTrendingThenDate<T extends TrendingDateItem>(items: T[]): T[] {
    return [...items].sort((leftItem, rightItem) => {
      if (leftItem.trending && !rightItem.trending) return -1
      if (!leftItem.trending && rightItem.trending) return 1
      return new Date(rightItem.date).getTime() - new Date(leftItem.date).getTime()
    })
  }
}
