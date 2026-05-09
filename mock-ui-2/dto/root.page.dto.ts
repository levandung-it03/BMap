export class RootAuthorizeReq {
  hash: string

  constructor(hash: string) {
    this.hash = hash
  }
}

export interface RootAuthorizeRes {
  shouldAuthorize: boolean
  tab: string | null
}
