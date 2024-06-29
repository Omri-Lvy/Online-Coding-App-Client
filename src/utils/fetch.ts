const defaultBaseUrl = import.meta.env.VITE_SOCKET_SERVER_URL;
export const fetchData = async (url: string, options = {}): Promise<never> => {
    if (url.startsWith('/')) {
        url = `${defaultBaseUrl}${url}`;
    }
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json() as never;
};