import axios from 'axios';

export const getCourses = async () => {
  return await axios.get('http://localhost:3003/course').then((respone) => respone.data[0]);
};

export const getSyllabuss = async () => {
  return await axios.get('http://localhost:3003/syll').then((respone) => respone.data[0]);
};

export const getBranches = async () => {
  return await axios.get('http://localhost:3003/branch').then((respone) => respone.data[0]);
};
