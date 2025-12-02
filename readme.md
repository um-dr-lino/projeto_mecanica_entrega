Camargo:
boa tarde, segue o domínio de problema: Desenvolver uma aplicação servidora em que o proprietário (cpf, nome e fone) possa ter um ou mais veículo (placa_veiculo, modelo_veiculo e preco_veiculo). Se o preço do veículo for maior ou igual a R$ 45.000,00 e menor R$ 90.000,00 associar à tabela tipo_veículo (id_tipo, tipo), o tipo luxo. Se for menor que R$ 45.000,00 associar popular. Do contrário associar super luxo. Para a implementação da persistência de dados, utilize a técnica de ORM - Object Relational Mapping. Essa aplicação tem que atender as requisições CRUD oriundas de qualquer cliente-server por meio de API Rest. Como também, permitir consultas de veículos por proprietário e tipo. Além disso, inserir a utilização de token (JWT) em um dos end-points da API ou se preferir adicione uma funcionalidade de login (usuário e senha) com token. 

Edicarsia:
Atividade Prática de Banco de Dados (N3)

Esta atividade tem como objetivo consolidar os conhecimentos de Banco de Dados, utilizando o cenário do projeto desenvolvido na disciplina de Server-side. Vocês deverão aplicar os conceitos aprendidos em Banco de Dados para criar consultas, views, triggers e procedures que interajam com o banco de dados do projeto de vocês.

Valor da Atividade: Esta atividade valerá 70% da nota final da disciplina de Banco de Dados.

O que deve ser feito?

x'Aproveitando o banco de dados do projeto desenvolvido em Server-side, vocês deverão criar os seguintes componentes:

1. Três Consultas Complexas:

o Crie três consultas SQL distintas onde uma delas envolva, no mínimo, três tabelas e as outras duas envolvam, no mínimo, duas tabelas cada.

o As consultas devem demonstrar a capacidade de relacionar dados de diferentes entidades e apresentar informações relevantes para o cenário do projeto de vocês.

o Pensem em perguntas que seriam interessantes responder sobre o sistema que vocês desenvolveram.

2. Duas Views (NÃO pode ser usado as consultas criadas na atividade 1):

o Crie duas views SQL que simplifiquem consultas complexas ou apresentem dados de forma mais organizada para um usuário específico.

o As views devem ser úteis para o contexto do projeto de vocês.

3. Um Trigger:

o Crie um trigger SQL que seja acionado por uma operação (INSERT, UPDATE ou DELETE) em uma das tabelas do banco de dados de vocês.

o O trigger deve executar alguma lógica como atualizar um campo automaticamente.

4. Uma Stored Procedure:

o Crie uma stored procedure SQL que realize uma tarefa específica no banco de dados.

o A procedure deve receber parâmetros (se necessário) e pode envolver operações como inserção, atualização, exclusão ou consulta de dados de forma mais complexa do que uma simples consulta direta. Pensem em uma operação que vocês poderiam reutilizar várias vezes.

Formato de Entrega:

Vocês deverão entregar um documento PDF no dia 05/12/2025, contendo:

1. Comandos SQL: O código SQL completo para cada consulta, view, trigger e procedure.

2. Enunciado/Objetivo: Uma breve descrição para cada item (consulta, view, trigger, procedure) explicando qual o objetivo do código e o que se espera que ele faça.

3. Resultados da Execução: Capturas de tela ou cópias do texto mostrando o resultado da execução de cada consulta, view, trigger (demonstrando seu funcionamento, por exemplo, mostrando os dados antes e depois de uma operação que acionou o trigger) e procedure.

4. Código Fonte: código fonte da rota e da função de consulta ao banco de dados onde cada comando é executado.

5. Prints de tela: print da tela do sistema que mostra o resultado de cada comando executado.