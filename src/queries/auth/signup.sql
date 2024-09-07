INSERT INTO users (
  user_invitee_id,
  user_authority_id,
  user_email,
  user_pw,
  user_name,
  user_phone,
  user_country,
  user_subnational
)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
