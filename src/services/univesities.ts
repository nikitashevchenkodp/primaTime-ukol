import axios from 'axios';
import { University } from 'src/types';

export const getUniversitiesByName = (name: string) => {
  return axios.get<University[]>(`http://universities.hipolabs.com/search?country=Czech+Republic&name=${name}`);
};
