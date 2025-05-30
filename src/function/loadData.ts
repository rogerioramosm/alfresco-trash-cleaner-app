import { endPoint, token } from "../Config/config";

interface Pagination {
  totalItems: number;
}

interface FileEntry {
  id: string;
  name?: string;
}

interface ApiResponse {
  list: {
    entries: FileEntry[];
    pagination: Pagination;
  };
}

export async function loadData(
  skipCount: number,
  maxItems: number
): Promise<{ totalItems: number; files: FileEntry[] } | false> {
  try {
    const options = {
      method: 'GET',
      headers: { Authorization: `Basic ${token}` }
    };

    const result = await fetch(`${endPoint}?skipCount=${skipCount}&maxItems=${maxItems}`, options);

    const json: ApiResponse = await result.json();
    
    if (!json.list) {
      console.error("Erro ao retornar resultados ou Servidor ocupado!");
      return false;
    }

    return {
      totalItems: json.list.pagination.totalItems,
      files: json.list.entries
    };
  } catch (error) {
    console.error("Erro ao tentar carregar arquivos: " + error);
    return false;
  }
}