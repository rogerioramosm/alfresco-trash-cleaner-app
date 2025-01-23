import { endPoint, token } from "../config/config.js";

export async function deleteFile(filesToDelete) {
  // Faz loop nos dados para executar deleção
  filesToDelete.files.map(dataJson => {
    try {
      const idFile = dataJson.entry.id;

      const options = {
        method: 'DELETE',
        headers: { Authorization: `Basic ${token}` }
      };

      const response = fetch(`${endPoint}/${idFile}`, options);
      if (!response) {
        console.log("Erro ao tentar deletar arquivo!");
        return false;
      }
      
      console.log("Deletado: " + idFile);
      return true;
    } catch (error) {
      console.error(error)
      return false;
    }
  });
}