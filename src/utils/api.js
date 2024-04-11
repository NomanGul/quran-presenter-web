import axios from "axios";

export const fetchWholeQuran = async () => {
  try {
    const response = await axios.get(`https://api.alquran.cloud/v1/quran/quran-uthmani`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching whole quran:", error);
    return [];
  }
};

export const listChapters = async () => {
  try {
    const response = await axios.get(`https://api.quran.com/api/v4/chapters?language=ur`);
    return response.data.chapters;
  } catch (error) {
    console.error("Error fetching chapters:", error);
    return [];
  }
};
