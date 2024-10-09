import { Request } from "express";

declare module 'express' {
  export interface Request {
    userId?: string;
  };
};

/* 

Anotações quanto a arquivos '.d.ts'

Definição: Os arquivos com a extensão '.d.ts' são conhecidos como arquivos de definição de tipos. Eles contém declarações de tipos para bibliotecas JS, 
permitindo que o TS verifique e entenda os tipos usados nessas bibliotecas.

Objetivo: Esses arquivos ajudam a fornecer informações sobre variáveis, funções, classes e outros elementos exportados por uma biblioteca, permitindo 
que os desenvolvedores utilizem essas bibliotecas com segurança em projetos TS.

Utilizando 'express.d.ts' (1express.2d.ts') como exemplo, porque essa nomenclatura?
1. Nome da biblioteca: o nome do arquivo geralmente reflete ao nome da biblioteca ou modulo que ele descreve.
2. Convenção de Nomenclatura: A convenção de usar 'd.ts' indica claramente que o arquivo contém definições de tipo. Isso ajuda a distinguir entre os arquivos de 
implementação (como 'express.js') e os arquivos que apenas definem tipos.

*/