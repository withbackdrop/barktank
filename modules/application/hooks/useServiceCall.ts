import { useEffect, useState } from 'react';

/**
 * Usage: const { data, isLoading } = useServiceCall(getUserById, ['aYKwjABvvAIPAD5A4c9P']);
 *
 * @param serviceMethod
 * @param params
 * @returns {{isLoading: boolean, data: unknown, error: unknown}}
 */
const useServiceCall = (serviceMethod, params = []) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        const result = await serviceMethod.apply(this, params);
        setData(result);
      } catch (_error) {
        setError(_error);
      }
      setIsLoading(false);
    })();
  }, []);

  return { data, isLoading, error };
};

export default useServiceCall;
