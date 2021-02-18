import { createConnection } from 'typeorm';

createConnection().catch(error => {
    console.log('erro de conexao banco')
}); 