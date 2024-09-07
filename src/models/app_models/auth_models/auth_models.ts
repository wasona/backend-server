import { UUID } from "crypto";

export class SignupRequest {
  constructor(
    public user_invitee_id: UUID,
    public user_authority_id: number,
    public user_email: string,
    public user_pw: string,
    public user_name: string,
    public user_phone: string,
    public user_country: string, // bpchar(2)
    public user_verified: boolean,
    public user_status: boolean,
    public user_login_attempts_left: number,
    // replace with day.js objects later
    public user_created_at: Date = new Date(),
    public user_updated_at: Date,
    public user_subnational: string,
  ) {}
}
