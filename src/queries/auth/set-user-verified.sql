UPDATE v1.users
SET user_verified = true
WHERE user_id = ($1)
RETURNING user_verified;
