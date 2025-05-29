import { endPoint, token } from "../Config/config";

interface FileEntry {
  id: string;
}

interface FileData {
  entry: FileEntry;
}

interface FilesDelete {
  files: FileData[];
}

export async function deleteFile(filesToDelete: FilesDelete): Promise<boolean[]> {

  const results = await Promise.all(
    filesToDelete.files.map(async (dataJson: FileData) => {
      try {
        const idFile = dataJson.entry.id;

        const options = {
          method: 'DELETE',
          headers: { Authorization: `Basic ${token}` }
        };

        const response = await fetch(`${endPoint}/${idFile}`, options);
        
        if (!response.ok) {
          console.log(`Erro ao tentar deletar arquivo ${idFile}!`);
          return false;
        }
        
        console.log("Deletado: " + idFile);
        return true;
      } catch (error) {
        console.error(`Erro ao deletar arquivo: ${error}`);
        return false;
      }
    })
  );
  
  return results;
}