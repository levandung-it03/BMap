export class UniversityByIdReq {
  id: string

  constructor(id: string) {
    this.id = id
  }
}

export interface UniversityByIdRes<T> {
  university?: T
}
