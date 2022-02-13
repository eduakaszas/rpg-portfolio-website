import { useCallback, useEffect, useState } from 'react';

export default function useKeyPress(key: string | string[]) {
    const [isKeyPressed, press] = useState(false);
    const keys = Array.isArray(key) ? key : [key];

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (!isKeyPressed && keys.includes(event.key)) {
              press(true);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [...keys, isKeyPressed]
    );
    const handleKeyUp = useCallback(
        (event: KeyboardEvent) => {
            if (isKeyPressed && keys.includes(event.key)) {
              press(false);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [...keys, isKeyPressed]
    );

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [handleKeyDown, handleKeyUp]);

    return isKeyPressed;
}
