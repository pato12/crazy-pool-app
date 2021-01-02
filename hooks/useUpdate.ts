import { useCallback, useState } from 'react';

function useUpdate() {
  const [dep, setDep] = useState(0);

  const forceUpdate = useCallback(() => setDep(v => v + 1), []);

  return {
    dep,
    forceUpdate,
  };
}

export default useUpdate;
