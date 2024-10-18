UPDATE v1.user_tokens
SET user_token_used_on = ($2)
WHERE user_token_id = ($1)
RETURNING true;
