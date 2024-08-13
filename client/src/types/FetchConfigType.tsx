export type FetchConfigType = {
    method: string,
    headers: HeadersInit,
    body: string | null,
    signal: AbortSignal,
};
