/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { useEffect, useState } from 'react';

const useFirestoreQuery = (ref: any) => {
  const [docState, setDocState] = useState({
    isLoading: true,
    data: null,
  });

  useEffect(() => {
    return ref.onSnapshot((docs: any) => {
      setDocState({
        isLoading: false,
        data: docs,
      });
    });
  }, []);

  return docState;
};

export default useFirestoreQuery;
