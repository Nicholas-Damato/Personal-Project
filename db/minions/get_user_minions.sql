SELECT * FROM user_to_minion u
JOIN minion m ON m.minion_id = u.minion_id
WHERE u.user_id = $1;