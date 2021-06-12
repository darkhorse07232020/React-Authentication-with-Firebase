/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { useEffect, useState } from 'react';

const useFirestoreDoc = (ref: any) => {
  const [docState, setDocState] = useState({
    isLoading: true,
    data: null,
  });

  useEffect(() => {
    return ref.onSnapshot((doc: any) => {
      setDocState({
        isLoading: false,
        data: doc,
      });
    });
  }, []);

  return docState;
};

export default useFirestoreDoc;
