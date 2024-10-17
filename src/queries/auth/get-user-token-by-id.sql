SELECT *
FROM v1.user_tokens
WHERE user_token_id = ($1);
