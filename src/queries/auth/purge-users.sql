-- deletes from users all accounts that haven't verified email within 24 hours

DELETE FROM v1.users
WHERE
    user_verified = false
    AND user_created_at < (NOW() - INTERVAL '24 hours');
