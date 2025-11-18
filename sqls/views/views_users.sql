DROP VIEW IF EXISTS getallusers;

CREATE VIEW getallusers AS
SELECT 
    id_usuario AS matricula,
    username AS login,
    nome_completo AS "Nome completo"
FROM usuario;