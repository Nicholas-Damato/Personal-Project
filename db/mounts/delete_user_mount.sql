DELETE FROM user_to_mount um 
WHERE um.user_id = $1 AND um.mount_id = $2;
SELECT * FROM user_to_mount um 
JOIN mount mo ON mo.mount_id = um.mount_id
WHERE um.user_id = $1;