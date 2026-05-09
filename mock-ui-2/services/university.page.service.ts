import { UniversityByIdReq } from '@/dto/university.page.dto'
import { UniversityPageAPI } from '@/services/university.page.api'
import { UniversityPageUtils, TrendingDateItem } from '@/utils/university.page.utils'

export class UniversityPageService {
  static getUniversityById<T extends { id: string }>(id: string, universities: T[]): T | undefined {
    const response = UniversityPageAPI.getById(new UniversityByIdReq(id), universities)
    return response.data?.university
  }

  static getSortedCommunityPosts<T extends TrendingDateItem>(posts: T[]): T[] {
    return UniversityPageUtils.sortByTrendingThenDate(posts)
  }

  static getUnreadCount<T extends { isRead: boolean }>(notifications: T[]): number {
    return notifications.filter((item) => !item.isRead).length
  }
}
