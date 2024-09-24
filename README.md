Arquitetura: Clean Architecture Monolítica + Princípios de SOLID
Backend: em TYPESCRIPT e NODEJS
Framework Web utilizado: EXPRESS
Banco de Dados: SQL - MYSQL utilizando PRISMA como ORM
Testes em JESTJS

--- por que usar Clean Architecture Monolítica?
essa arquitetura foi escolhida devido à sua simplicidade inicial de desenvolvimento: menos sobrecarga inicial, já que tudo está em um único projeto. foi escolhida também visando a facilidade de implantação, pois existe apenas um serviço para ser configurado e mantido.

falando sobre clean architecture, foi escolhida para dividir o código em responsabilidades claras, facilitando a leitura e manutenção. além disso, é muito flexível, permitindo mudanças na lógica de negócio sem grandes reescritas. a arquitetura também oferece escalabilidade controlada; uma aplicação modularizada proporciona fácil migração caso haja necessidade de transição para microserviços, por exemplo. basicamente, com o tempo e crescimento do sistema, a clean architecture permite ajustes para evoluir sem precisar reescrever o código do zero.

--- por que um backend em TYPESCRIPT e NODEJS?
TYPESCRIPT oferece segurança e produtividade no desenvolvimento backend. com uma curva de aprendizado menor, ele é uma versão aprimorada do JAVASCRIPT, adicionando tipagem estática, o que facilita a detecção de erros em tempo de desenvolvimento. isso aumenta a confiabilidade do código. o TYPESCRIPT também permite o crescimento seguro e organizado de sistemas, tornando a modularização mais fácil, o que facilita a manutenção à medida que o código cresce.

embora o C# seja uma excelente linguagem para sistemas grandes, o TYPESCRIPT é mais flexível e simples de configurar e manter. o NODEJS oferece um vasto ecossistema de bibliotecas via NPM, desde autenticação até integração com bancos de dados. com sua arquitetura event-driven e non-blocking I/O, o NODEJS é eficiente para lidar com operações intensivas de I/O e múltiplas conexões simultâneas, como em APIs e sistemas em tempo real.

comparado com PYTHON, o NODEJS é mais rápido para operações de I/O intensivas e não requer soluções complexas como threads ou asyncio para obter um desempenho similar.

--- por que utilizar o EXPRESS como framework web?
o EXPRESS é minimalista, oferecendo apenas o necessário para construir uma aplicação web ou API. ele não impõe uma estrutura rígida, permitindo flexibilidade total na organização do projeto. Isso é vantajoso quando se deseja ter controle total sobre a arquitetura e a estrutura do código, o que frameworks mais opinativos, como NESTJS, SAILS.JS e ADONISJS, podem limitar.

além disso, o EXPRESS tem uma sobrecarga muito pequena, o que o torna uma boa escolha para aplicações onde o desempenho é crucial. apesar de sua simplicidade, o EXPRESS pode ser facilmente escalado para lidar com grandes projetos. sua modularidade, em combinação com boas práticas, facilita a gestão do crescimento do sistema.

--- por que utilizar um banco de dados SQL, MYSQL utilizando o PRISMA como ORM?
em comparação com bancos NOSQL, como MONGODB, que são ótimos para dados não estruturados, o MYSQL é geralmente a melhor escolha para dados estruturados e relacionais. Ele garante integridade referencial e é ideal para cenários com relações complexas entre tabelas, garantindo que os dados permaneçam consistentes durante operações como atualizações de registros.

o MYSQL suporta consultas SQL complexas, como joins, subconsultas e agregações, o que facilita a criação de relatórios e a execução de consultas mais avançadas. o PRISMA simplifica essas operações complexas em código e ainda fornece segurança tipada ao interagir com o banco de dados, tornando o processo de consulta mais seguro e fácil.

o PRISMA permite também integração com diferentes ambientes, como MYSQL para produção e SQLITE para desenvolvimento/testes, sem complicações. além disso, ele é projetado para funcionar perfeitamente com TYPESCRIPT, gerando tipos automáticos para o banco de dados e garantindo segurança ao interagir com ele. comparando com SEQUELIZE, que tem uma API mais complexa e menos amigável para TYPESCRIPT, o PRISMA é mais eficiente. O TYPEORM também oferece suporte ao TYPESCRIPT, mas o sistema de migrações do PRISMA é mais fácil de lidar em grandes aplicações.