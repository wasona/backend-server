INSERT INTO v1.user_tokens (
    user_id,
    user_token_type,
    user_token_generated_on,
    user_token_expires_on
)
VALUES ($1, $2, $3, $4)
RETURNING user_token_id;
