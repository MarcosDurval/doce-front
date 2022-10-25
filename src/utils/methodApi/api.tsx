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

export const patchApi = async (
  page: string,
  id = "",
  body: unknown
): Promise<IGet | null> => {
  const URL = `api/v1/${page}/${id}/`;
  try {
    const response = await api.patch(URL, body);
    const result = response.data as unknown as IGet;
    return result;
  } catch (error) {
    return null;
  }
};

export const deleteApi = async (page: string, id: string) => {
  const URL = `api/v1/${page}/${id}/`;
  try {
    await api.delete(URL);
    return true;
  } catch (error) {
    return null;
  }
};

export const createdItem = async (page: string, body: unknown) => {
  const URL = `api/v1/${page}/`;
  try {
    await api.post(URL, body);
    return true;
  } catch (error) {
    return null;
  }
};
