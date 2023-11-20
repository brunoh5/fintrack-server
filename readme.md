# App

Financial Management app

## RFs

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- Deve ser possível (Conta Bancária)
  - [x] criar;
  - [x] listar por id;
	- [x] listar vários;
  - [x] atualizar;
  - [x] deletar;
- [x] Deve ser possível obter o balanço de uma conta
- Deve ser possível (Transação)
  - [x] criar;
  - [x] listar por id;
	- [x] listar vários;
  - [x] atualizar;
  - [x] deletar;
- [x] Deve ser possível importar uma lista de transações
- [ ] Deve ser possível criar um objetivo
- [ ] Deve ser possível obter as métricas de gastos do usuário

## RNs

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] Ao criar uma transação o balanço de uma conta deve mudar;
- [x] Ao apagar uma conta deverá apagar todas as transações da mesma;
- [x] Transações com o tipo sent devem diminuir o valor do balanço da conta
- [x] Transações com o tipo received devem aumentar o valor do balanço da conta
- [ ] Transações do tipo **sent** não deve ser criadas caso balanço da conta não for o suficiente

## RNFs

- [x] A senha do usuário precisa estar criptografada;
- [ ] Todas as listas de dados precisam estar paginadas com 5 itens por página;
- [ ] O usuário deve ser identificado por um JWT(JSON Web Token);
- [x] A conta deve ser associada a um usuário;
- [x] A transação deve ser associada a uma conta;
- [x] O numero da conta deve ter os 4 últimos números mascarados
