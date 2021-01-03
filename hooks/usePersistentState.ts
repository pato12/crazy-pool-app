import { useEffect, useLayoutEffect, useState } from 'react';
import * as localStorage from '../services/local-storage';

interface PersistentPayload<K> {
  payload: K;
}

function usePersistentState<K>(key: string, initialValue: K) {
  const [value, setValue] = useState(initialValue);

  useLayoutEffect(() => {
    const loadValue = async () => {
      const savedValue = await localStorage.getItem<PersistentPayload<K>>(getSafeKey(key));

      if (savedValue) {
        setValue(savedValue.payload);
      }
    };

    loadValue();
  }, [key]);

  useEffect(() => {
    const storeValue = async () => {
      await localStorage.storeItem<PersistentPayload<K>>(getSafeKey(key), { payload: value });
    };

    storeValue();
  }, [value]);

  return [value, setValue] as const;
}

export default usePersistentState;

function getSafeKey(key: string) {
  return `persistent.state.${key}`;
}
