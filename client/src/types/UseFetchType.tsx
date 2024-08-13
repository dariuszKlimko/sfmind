export type UseFetchType<T> = {
    response: T, 
    loading: boolean, 
    error: string | null,
    runFetch: () => void,
}