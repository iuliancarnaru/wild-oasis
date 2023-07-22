import { RefObject, useEffect } from "react";

export const useOutsideClick = (
  ref: RefObject<HTMLElement>,
  handleClick: (event: MouseEvent | TouchEvent) => void,
  listeningCapture = true
): void => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handleClick(event);
      }
    };

    document.addEventListener("mousedown", listener, listeningCapture);
    document.addEventListener("touchstart", listener, listeningCapture);

    return () => {
      document.removeEventListener("mousedown", listener, listeningCapture);
      document.removeEventListener("touchstart", listener, listeningCapture);
    };
  }, [ref, handleClick, listeningCapture]);
};
export default useOutsideClick;
