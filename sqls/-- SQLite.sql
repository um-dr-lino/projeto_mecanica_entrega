-- SQLite
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