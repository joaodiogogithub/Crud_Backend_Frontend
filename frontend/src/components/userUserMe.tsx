import { useState, useEffect } from 'react';
import api from '@/api/instance';

interface UserInfo {
  user_id: string;
  email: string;
}

export function useUserInfo() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const response = await api.get('/users/me');
        setUserInfo(response.data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserInfo();
  }, []);

  return { userInfo, isLoading, error };
}