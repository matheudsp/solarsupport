# Solar Support

## Descrição

O Solar Support é um sistema completo com backend e frontend, que inclui uma calculadora para simular o preço de sistemas solares. A simulação é baseada na comissão do vendedor, custo por kWh e geração de arquivos de proposta.

## PrintScreens

### Tela de Login
![Tela de Login](./imagens/login.png)

### Listagem de Vendedores
![Listagem de Vendedores](./imagens/lista-vendedores.png)

### Geração de Propostas
![Geração de Propostas](./imagens/gerar_proposta.png)

### Alterar Vendedores
![Alterar Vendedores](./imagens/alterar_vendedor.png)

### Calculadora para Vendedores
![Calculadora para Vendedores](./imagens/calculadora.png)

### Alterar Calculadora
![Alterar Calculadora](./imagens/alterar_calculadora.png)

### Cadastrar Vendedor
![Cadastrar Vendedor](./imagens/cadastrar_vendedor.png)



## Funcionalidades

- **Simulação de Preços**: Calcule o preço de sistemas solares com base em variáveis configuráveis.
- **Autenticação**: Sistema de login seguro utilizando JWT.
- **Geração de Propostas**: Criação de arquivos de proposta detalhados para clientes. (Em criação -- incompleta)
- **Interface Responsiva**: Frontend moderno e responsivo utilizando React e TailwindCSS.

## Tecnologias Utilizadas

### Backend

- **Prisma**: ORM para banco de dados.
- **Vercel Postgres**: Conexão com banco de dados Postgres.
- **Yumdocs**: Gerador de documentação.
- **Bcryptjs**: Criptografia de senhas.
- **ConvertAPI**: Conversão de arquivos.
- **Cors**: Permissões de compartilhamento de recursos entre origens.
- **Dotenv**: Gerenciamento de variáveis de ambiente.
- **Express**: Framework web para Node.js.
- **Express-Async-Errors**: Tratamento de erros assíncronos.
- **Jsonwebtoken**: Implementação de autenticação via JWT.

### Frontend

- **Headless UI**: Componentes de UI acessíveis.
- **Axios**: Cliente HTTP para requisições.
- **Docx-Templates**: Criação de documentos a partir de templates.
- **Eslint**: Linter para JavaScript e TypeScript.
- **Next.js**: Framework React para produção.
- **Nookies**: Manipulação de cookies.
- **Primereact**: Biblioteca de componentes UI.
- **React**: Biblioteca para construção de interfaces de usuário.
- **React DOM**: Pacote para manipulação do DOM com React.
- **React Icons**: Coleção de ícones para React.
- **React Select**: Componente de seleção personalizável.
- **React Toastify**: Notificações de toast para React.
- **TailwindCSS**: Framework CSS utilitário.
- **TypeScript**: Superset de JavaScript para tipagem estática.

## Instalação

### Pré-requisitos

- Node.js
- NPM ou Yarn
- PostgreSQL

### Backend

1. Clone o repositório:

    ```bash
    git clone https://github.com/matheudsp/solarsupport.git
    cd solarsupport/backend
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Configure as variáveis de ambiente:

    Crie um arquivo `.env` na raiz do diretório `backend` e adicione as seguintes variáveis:

    ```env
    DATABASE_URL=your_postgres_database_url
    JWT_SECRET=your_jwt_secret
    ```

4. Execute as migrações do Prisma:

    ```bash
    npx prisma migrate dev
    ```

5. Inicie o servidor:

    ```bash
    npm start
    ```

### Frontend

1. Navegue para o diretório `frontend`:

    ```bash
    cd ../frontend
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Inicie o servidor de desenvolvimento:

    ```bash
    npm run dev
    ```

## Uso

Após iniciar os servidores do backend e frontend, acesse o frontend através do seu navegador. A partir daí, você poderá utilizar a aplicação para simular preços de sistemas solares, gerar propostas e muito mais.

## Contribuição

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`).
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`).
4. Faça um push para a branch (`git push origin feature/MinhaFeature`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Feito com ❤️ por [Matheus](https://github.com/matheudsp)
