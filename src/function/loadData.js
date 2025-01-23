import { endPoint, token } from "../config/config.js";

export async function loadData(skipCount, maxItems) {
  try {
    const options = {
      method: 'GET',
      headers: { Authorization: `Basic ${token}` }
    };

    const result = await fetch(`${endPoint}?skipCount=${skipCount}&maxItems=${maxItems}`, options)

    const json = await result.json();
    if (!json.list) {
      console.error("Erro ao retornar resultados!");
      return false;
    }
    
    return {
      totalItems: json.list.pagination.totalItems,
      files: json.list.entries
    }
  } catch (error) {
    console.error("Erro ao tentar carregar arquivos: "+error)
    return false;
  }
}