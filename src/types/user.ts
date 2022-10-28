import { UserMetadata, MultiFactorUser, UserInfo } from 'firebase/auth';

export interface User {
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
  isAnonymous: boolean;
  metadata: UserMetadata;
  multiFactor: MultiFactorUser;
  phoneNumber: string | null;
  photoURL: string | null;
  providerData: UserInfo[];
  providerId: string;
  refreshToken: string;
  tenantId: string | null;
  uid: string;
}

export interface UserData {
  [key: string]: {
    role: string;
  };
}
