import { AbstractApiService } from '@/models/application/services/api/AbstractApiService';

export class AuthenticationApiService extends AbstractApiService {
  private static BASE_URL = 'auth';

  async resendVerificationEmail(userEmailAddressId: string): Promise<any> {
    return this.executeGetQuery<any>(
      `${AuthenticationApiService.BASE_URL}/send-verification-email/${userEmailAddressId}`
    );
  }

  async login(email: string, password: string): Promise<any> {
    return this.executePostQuery<any>(`${AuthenticationApiService.BASE_URL}/login`, {
      email: email.toLowerCase(),
      password,
    });
  }

  async getAuthToken(firebaseToken: string): Promise<any> {
    return this.executePostQuery<any>(`${AuthenticationApiService.BASE_URL}/tokens`, { firebaseToken });
  }

  async verifyEmail(token: string): Promise<any> {
    return this.executePostQuery<any>(`${AuthenticationApiService.BASE_URL}/verify-email`, { token });
  }
}
