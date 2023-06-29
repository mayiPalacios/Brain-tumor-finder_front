import { AxiosError } from "axios";
import { useRef, useState, useCallback, useEffect } from "react";

export default function useLoading<F extends (...args: any) => Promise<any>>(
  func: F,
  deps?: readonly any[],
): [F, boolean, Error | undefined, () => void] {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<undefined | Error>(undefined);
  const isMountedRef = useRef(true);
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  const depsList = deps || [func];
  const wrappedFunc = useCallback(async (...args: any) => {
    setLoading(true);
    let ret;
    try {
      ret = await func(...args);
    } catch (e: any) {
      if (e instanceof AxiosError) {
        switch (e.code) {
          case "ERR_BAD_REQUEST":
            const detail = e.response?.data?.detail
            if (Array.isArray(detail)) {
              const [err] = detail
              setError(new Error(err.msg))
            } else {
              setError(new Error(e.response?.data.message))
            }
            break;
        }
      } else {
        setError(e);
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
    return ret;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, depsList);

  const resetError = () => { setError(undefined) }
  return [wrappedFunc as any, loading, error, resetError];
}
