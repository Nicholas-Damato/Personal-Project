DELETE FROM user_to_minion u
WHERE u.user_id = $1 AND u.minion_id = $2; 
SELECT * FROM user_to_minion u
JOIN minion m ON m.minion_id = u.minion_id
WHERE u.user_id = $1;