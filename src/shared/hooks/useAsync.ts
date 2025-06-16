
import { useState, useCallback, useEffect } from 'react';

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export interface UseAsyncOptions {
  immediate?: boolean;
}

// Overload for functions with no arguments that support immediate execution
export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  options?: UseAsyncOptions & { immediate?: boolean }
): AsyncState<T> & {
  execute: () => Promise<T>;
  reset: () => void;
};

// Overload for functions with arguments that don't support immediate execution
export function useAsync<T, Args extends any[]>(
  asyncFunction: (...args: Args) => Promise<T>,
  options?: Omit<UseAsyncOptions, 'immediate'>
): AsyncState<T> & {
  execute: (...args: Args) => Promise<T>;
  reset: () => void;
};

// Implementation
export function useAsync<T, Args extends any[] = []>(
  asyncFunction: (...args: Args) => Promise<T>,
  options: UseAsyncOptions = {}
) {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: Args) => {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      try {
        const data = await asyncFunction(...args);
        setState({ data, loading: false, error: null });
        return data;
      } catch (error) {
        const errorObj = error instanceof Error ? error : new Error(String(error));
        setState({ data: null, loading: false, error: errorObj });
        throw errorObj;
      }
    },
    [asyncFunction]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  useEffect(() => {
    if (options.immediate) {
      // This will only be called for the no-argument overload
      (execute as () => Promise<T>)();
    }
  }, [execute, options.immediate]);

  return {
    ...state,
    execute,
    reset,
  };
}
