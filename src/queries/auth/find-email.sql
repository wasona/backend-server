SELECT *
FROM v1.users
WHERE user_email = ($1);
