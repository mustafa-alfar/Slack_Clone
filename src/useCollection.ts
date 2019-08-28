import React from 'react';
import { db } from './firebase';

function useCollection(
  path: string,
  orderBy?: string,
  where?: [string, string, boolean]
) {
  const [channels, setChannels] = React.useState([]);
  React.useEffect(() => {
    let collection: any = db.collection(path);
    if (orderBy) {
      collection = collection.orderBy(orderBy);
    }
    if (where) {
      const [qureyField, queryOperator, queryValue] = where;
      collection = collection.where(qureyField, queryOperator, queryValue);
    }
    return collection.onSnapshot((snapshot: Snapshot) => {
      const docs: any = [];
      snapshot.forEach((doc: Doc) => {
        docs.push({
          ...doc.data(),
          id: doc.id
        });
      });
      setChannels(docs);
    });
  }, [path, orderBy, where]);
  return channels;
}

type Snapshot = {
  docs: [];
} & [];

type Doc = {
  exists: boolean;
  id: string;
  data: () => {};
};

export { useCollection };
