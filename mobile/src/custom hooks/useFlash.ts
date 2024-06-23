import { useState } from "react"

export const useFlash = (setState: React.Dispatch<React.SetStateAction<boolean>>) => {
    const [flashId, setFlashId] = useState<NodeJS.Timeout | undefined>(undefined);

    const flash = (duration: number) => {
        if (flashId) {
            cleanUp();
        }

        setState(true);
        const id = setTimeout(() => setState(false), duration);
        setFlashId(id);
    };

    const cleanUp = () => {
        clearTimeout(flashId);
        setFlashId(undefined);
    }

    return { flash, cleanUp };
};