import { useState } from "react"

export const useFlash = (setState: React.Dispatch<React.SetStateAction<boolean>>, onFlashFinished?: () => void) => {
    const [flashId, setFlashId] = useState<NodeJS.Timeout | undefined>(undefined);

    const flash = (duration: number) => {
        if (flashId) {
            cleanUp();
        }

        const onFlash = () => {
            setState(false);
            if (onFlashFinished) {
                onFlashFinished();
            }
        }

        setState(true);
        const id = setTimeout(onFlash, duration);
        setFlashId(id);
    };

    const cleanUp = () => {
        clearTimeout(flashId);
        setFlashId(undefined);
    }

    return { flash, cleanUp };
};