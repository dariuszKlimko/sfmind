import { useState, useEffect } from "react";
import { HttpMethod } from "../types/HttpMethodType";
import { UseFetchType } from "../types/UseFetchType";
import { FetchConfigType } from "../types/FetchConfigType";
import { GeneralObjectType } from "../types/GeneralObjectType";

export function useFetch<T>(url: string, method: HttpMethod, headers: HeadersInit, data: GeneralObjectType | null, initialState: T ): UseFetchType<T> {
    const [response, setResponse] = useState<T>(initialState);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [trigger, setTrigger] = useState<boolean>(false);
    
    useEffect(() => {
        if (trigger) {
            const abortController = new AbortController();
            (async (): Promise<void> => {

                try {
                    const config: FetchConfigType = {
                        method: method,
                        headers: headers,
                        body: data && JSON.stringify(data),
                        signal: abortController.signal,
                    };
                    const result = await fetch(url, config);
                    const resultJson = await result.json();
                    setResponse(resultJson);
                    setLoading(false);
                    setTrigger(false);
                } catch (error) {
                    if (error instanceof Error) {
                        if (error.name === "AbortError") {
                            setError(error.message);
                            setLoading(false);
                            setTrigger(false);
                        } else {
                            setError(error.message);
                            setLoading(false);
                            setTrigger(false);
                        }
                    } else {
                        throw error;
                    }
                }
            })();
            return () => abortController.abort();
        }
    }, [trigger]);

    function  runFetch(): void {
        setTrigger(true);
    }

    return { response, loading, error, runFetch };
};
