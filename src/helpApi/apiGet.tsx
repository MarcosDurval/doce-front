import { IGet } from "@/interface/responseApi";
import api from "@/services/api";

const getApi = async (page: string, end = ""): Promise<IGet | null> => {
  const URL = `api/v1/${page}/${end}`;
  try {
    const response = await api.get(URL);
    const result = response.data as unknown as IGet;
    return result;
  } catch (error) {
    return null;
  }
};

export default getApi;
