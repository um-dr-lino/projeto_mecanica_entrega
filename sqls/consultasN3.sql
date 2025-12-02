SELECT 
    v.id_veiculo,
    v.placa_veiculo,
    v.preco_veiculo,
    v.ano,
    p.nome AS nome_proprietario,
    t.tipo AS tipo_veiculo
FROM veiculo v
JOIN proprietario p ON v.id_proprietario = p.id_proprietario
JOIN tipo_veiculo t ON v.id_tipo = t.id_tipo
ORDER BY v.ano DESC;

SELECT 
    v.placa_veiculo,
    v.preco_veiculo,
    p.nome AS proprietario
FROM veiculo v
JOIN proprietario p ON v.id_proprietario = p.id_proprietario
WHERE v.preco_veiculo > 45000
ORDER BY v.preco_veiculo DESC;

SELECT 
    t.tipo,
    COUNT(v.id_veiculo) AS total_veiculos
FROM tipo_veiculo t
LEFT JOIN veiculo v ON v.id_tipo = t.id_tipo
GROUP BY t.tipo;

CREATE VIEW view_veiculos_recentes AS
SELECT 
    v.id_veiculo,
    v.placa_veiculo,
    v.preco_veiculo,
    v.ano,
    p.nome AS nome_proprietario
FROM veiculo v
JOIN proprietario p ON v.id_proprietario = p.id_proprietario
WHERE v.ano >= 2020;

CREATE VIEW view_resumo_tipo AS
SELECT 
    t.tipo,
    COUNT(v.id_veiculo) AS quantidade,
    AVG(v.preco_veiculo) AS media_preco
FROM tipo_veiculo t
LEFT JOIN veiculo v ON v.id_tipo = t.id_tipo
GROUP BY t.tipo;

CREATE TRIGGER trg_update_veiculo
AFTER UPDATE ON veiculo
FOR EACH ROW
BEGIN
    UPDATE veiculo
    SET data_atualizacao = CURRENT_TIMESTAMP
    WHERE id_veiculo = NEW.id_veiculo;
END;

CREATE PROCEDURE sp_inserir_veiculo(
    IN p_placa VARCHAR(10),
    IN p_id_proprietario INT,
    IN p_preco DECIMAL(10,2),
    IN p_ano INT
)
BEGIN
    DECLARE v_id_tipo INT;
    
    IF p_preco <= 45000 THEN
        SELECT id_tipo INTO v_id_tipo FROM tipo_veiculo WHERE tipo = 'popular';
    ELSEIF p_preco <= 90000 THEN
        SELECT id_tipo INTO v_id_tipo FROM tipo_veiculo WHERE tipo = 'luxo';
    ELSE
        SELECT id_tipo INTO v_id_tipo FROM tipo_veiculo WHERE tipo = 'Super Luxo';
    END IF;

    INSERT INTO veiculo (placa_veiculo, id_proprietario, preco_veiculo, ano, id_tipo)
    VALUES (p_placa, p_id_proprietario, p_preco, p_ano, v_id_tipo);
END;

