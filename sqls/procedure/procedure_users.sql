DROP PROCEDURE IF EXISTS create_new_user; 

CREATE PROCEDURE create_new_user (
    IN p_username VARCHAR(100),
    IN p_senha VARCHAR(255),
    IN p_nome_completo VARCHAR(150)
)
BEGIN
    INSERT INTO usuario (username, senha, nome_completo) 
    VALUES (p_username, p_senha, p_nome_completo);
END;