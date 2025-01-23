import { deleteFile } from './src/function/deleteFile.js';
import { loadData } from './src/function/loadData.js';

// Informe aqui a quantidade de arquivos que existem na sua lixeira
// Esta informação pode receber executando uma vez a API de leitura da lixeira.
let totalFilesToDelete = 30388;

// Quantidade de arquivos que serão excluidos por vez. Nos testes, 400 foi um número que não causou timeout
const filesForDelete = 400;

while (totalFilesToDelete > 0) {
  // Carrega arquivos na lixeira Alfresco através da API
  const loadDataFromApi = await loadData(0, filesForDelete);

  if (loadDataFromApi) {
    try {
      await deleteFile(loadDataFromApi);
      
      // Decrementa a quantidade de arquivos que são lidos por vez do total existente
      totalFilesToDelete -= filesForDelete;

      console.log("Arquivos para deletar: " + totalFilesToDelete);
    } catch (error) {
      console.error("Erro na deleção do arquivo: " + error);
    }
  }
}