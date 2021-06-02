SELECT * FROM user_to_minion u
JOIN minions m ON m.minion_id = u.minion_id
WHERE u.user_id = $1;