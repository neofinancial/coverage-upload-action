import axios from 'axios';

const testMonoRepo = async (url: string, allData: unknown): Promise<void> => {

  console.log('data being sent, represents entire payload', allData)

  try {
    const response = await axios.post(url, allData);

    console.log('RECIEVED RESPONSE',response.data.message)
  } catch (error) {
    throw new Error(error);
  }
};

export default testMonoRepo;
