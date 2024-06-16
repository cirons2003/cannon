import { time } from "console";
import { useRef } from "react"

export const useDebounce = () => {
    const timeoutId = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    const debounce = (callback: () => void, delayInMilliseconds: number) => {
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }

        timeoutId.current = setTimeout(() => {
            callback();
        }, delayInMilliseconds) as ReturnType<typeof setTimeout>;
    };

    return { debounce };
};
