import { useQuery } from '@tanstack/react-query';
import { fetchMenu } from '../lib/api';

export function useMenu(category?: string) {
  return useQuery({
    queryKey: ['menu', category],
    queryFn: () => fetchMenu(category),
    staleTime: 5 * 60 * 1000,
  });
}
