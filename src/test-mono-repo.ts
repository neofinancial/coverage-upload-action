import axios from 'axios';

const testMonoRepo = async (url: string, allData: Record<string,unknown>): Promise<string> => {

  try {
    const response = await axios.post(url, allData);

    return response.data.message;
  } catch (error) {
    throw new Error(error);
  }
};

export default testMonoRepo;
