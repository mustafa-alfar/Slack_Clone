import { useEffect, useState } from 'react';
import { db } from './firebase';
import { Channel } from './types';
function useDoc(path: string, type: 'topic'): Channel;

function useDoc(path: string) {
  const [docs, setDocs] = useState({});
  useEffect(() => {
    return db.doc(path).onSnapshot((docs: any) => {
      setDocs({
        ...docs.data(),
        id: docs.id
      });
    });
  }, [path]);
  return docs;
}

export default useDoc;
