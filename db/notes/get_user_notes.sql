SELECT * FROM user_notes n
JOIN users u 
WHERE n.note_id = u.user_id;