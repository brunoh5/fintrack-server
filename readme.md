# App

Financial Management app

## RFs

- [x] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- Deve ser possível (Conta Bancária)
  - [ ] criar;
  - [ ] listar;
  - [ ] atualizar;
  - [ ] deletar;
- [ ] Deve ser possível obter o balanço de uma conta
- Deve ser possível (Transação)
  - [ ] criar;
  - [ ] listar;
  - [ ] atualizar;
  - [ ] deletar;
- [ ] Deve ser possível importar uma lista de transações
- [ ] Deve ser possível criar um objetivo
- [ ] Deve ser possível obter as métricas de gastos do usuário

## RNs

- [ ] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] Ao criar uma transação o balanço de uma conta deve mudar;

## RNFs

- [ ] A senha do usuário precisa estar criptografada;
- [ ] Todas as listas de dados precisam estar paginadas com 5 itens por página;
- [ ] O usuário deve ser identificado por um JWT(JSON Web Token);
- [ ] A conta deve ser associada a um usuário;
- [ ] A transação deve ser associada a uma conta;
- [ ] O numero da conta deve ter os 4 últimos números mascarados
