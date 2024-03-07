import { useQuery } from '@tanstack/react-query';
import { getUniversitiesByName } from 'src/services/univesities';
import { useDebouncedValue } from './useDebounceValue';

export const useGetUniversities = (name: string) => {
  const debouncedInputValue = useDebouncedValue(name, 500);

  return useQuery({
    queryKey: ['universities', debouncedInputValue],
    queryFn: async () => {
      try {
        const { data } = await getUniversitiesByName(debouncedInputValue);

        return data.map((item) => ({ value: item.name, label: item.name }));
      } catch (error) {
        alert('Something went wrong');
      }
    },
  });
};
