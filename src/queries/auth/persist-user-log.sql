INSERT INTO v1.user_logs (
    user_id,
    user_log_type,
    user_log_generated_on
)
VALUES ($1, $2, $3)
RETURNING user_log_id;
