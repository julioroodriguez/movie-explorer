import { CastMember } from './cast-member.model';

export interface CreditsResponse {
  id: number;
  cast: CastMember[];
}