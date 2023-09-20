import { useState, useCallback } from "react";

export const useHttp = () => {
    const [processName, setProcessName] = useState("waiting");

    const request = useCallback(
        async (url, method = "GET", body = null, headers = { "Content-Type": "application/json" }) => {
            setProcessName("loading");

            try {
                const response = await fetch(url, { method, body, headers });

                if (!response.ok) {
                    throw new Error(`Could not fetch ${url}, received ${response.status}`);
                }

                const data = await response.json();

                return data;
            } catch (e) {
                setProcessName("error");
                throw e;
            }
        },
        [],
    );

    const clearError = useCallback(() => setProcessName("loading"), []);

    return { request, processName, clearError, setProcessName };
};
