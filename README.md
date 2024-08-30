# App

Gympass style app.

## RFs (Requisitos funcionais)
O que o usuário pode realizar na aplicação

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas (até 10km);
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)
Caminhos que cada requisito pode tomar.

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só pode ser validado até 20 minutos após criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)
São requisitos que não partem dos clientes, são requisitos técnicos (Banco de dados, etc)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisa estar persistidos em um banco PostgreSQL;
- [x] Todas as litas de dados precisam estar paginadas com até 20 itens por páginas;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);