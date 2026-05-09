import { APIResponse } from '@/dto/api.page.dto'
import { UniversityByIdReq, UniversityByIdRes } from '@/dto/university.page.dto'

export class UniversityPageAPI {
  static getById<T extends { id: string }>(
    request: UniversityByIdReq,
    universities: T[],
  ): APIResponse<UniversityByIdRes<T>> {
    return {
      success: true,
      data: {
        university: universities.find((item) => item.id === request.id),
      },
    }
  }
}
