SELECT * FROM user_to_mount um 
JOIN mounts mo ON mo.mount_id = um.mount_id
WHERE um.user_id = $1;