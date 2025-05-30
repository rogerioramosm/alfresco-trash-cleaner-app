const PORT = process.env.PORT;

export const endPoint = `http://${process.env.END_POINT}:${PORT}/alfresco/api/-default-/public/alfresco/versions/1/deleted-nodes`;
export const token = process.env.TOKEN;