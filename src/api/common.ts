import { BaseAPI } from './client'

export class CommonAPI extends BaseAPI {
  /**
   * 루트 엔드포인트
   */
  async getRoot(): Promise<any> {
    return this.get<any>('/')
  }

  /**
   * 헬스 체크 엔드포인트
   */
  async healthCheck(): Promise<any> {
    return this.get<any>('/health')
  }
}

// 싱글톤 인스턴스 생성
export const commonAPI = new CommonAPI()
