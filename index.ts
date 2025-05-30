import { deleteFile } from './src/function/deleteFile';
import { loadData } from './src/function/loadData';

(async () => {
/**
 * Esta variável irá receber o total de arquivos existentes na lixeira, na primeira iteração do loop While.
 * Inicia-se a variável com 1 para entrar no loop e fazer a verificação uma primeira vez.
 */
  let totalFilesToDelete: number = 1;
  let loadDataFromApi: any;

  // Quantidade de arquivos que serão excluidos por vez. Nos testes, 400 foi um número que não causou timeout
  const filesForDelete: number = 400;

  while (totalFilesToDelete > 0) {
  // Carrega arquivos na lixeira Alfresco através da API
    loadDataFromApi = await loadData(0, filesForDelete);

    if (loadDataFromApi) {
  // Atualiza informação da quantidade de arquivos que existem na lixeira
      totalFilesToDelete = loadDataFromApi.totalItems;

      if (totalFilesToDelete <= 0) {
        console.log("Não existem arquivos na lixeira para limpar!");
        break;
      }

      if (loadDataFromApi.files) {
        try {
          await deleteFile(loadDataFromApi);
  // Decrementa a quantidade de arquivos que são lidos por vez do total existente
          totalFilesToDelete -= filesForDelete;
          console.log("Arquivos para deletar: " + totalFilesToDelete);
        } catch (error: any) {
          console.error("Erro na deleção do arquivo: " + error);
        }
      }
    }
  }

  console.log("Nenhum arquivo para deletar!");
})();