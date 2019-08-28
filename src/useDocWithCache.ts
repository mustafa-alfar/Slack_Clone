import { useEffect, useState, useRef } from 'react';
import { db } from './firebase';
import { User, DynamicObject } from './types';

const cache: DynamicObject = {};

export default function useDocWithCache(path: string) {
  const [docs, setDocs] = useState<DynamicObject | User>(cache[path]);
  const isMounted = useMounted();
  useEffect(() => {
    if (docs) {
      return;
    }
    db.doc(path)
      .get()
      .then((doc: any) => {
        if (isMounted.current) {
          const user = {
            ...doc.data(),
            id: doc.id
          };
          setDocs(user);
          cache[path] = user;
        }
      });
  }, [path]);
  return docs;
}

function useMounted() {
  let isMounted = useRef(true);
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  return isMounted;
}
