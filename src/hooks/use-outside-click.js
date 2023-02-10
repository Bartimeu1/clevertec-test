import { useRef, useEffect } from "react";

export const useClickOutside = (callback, outsideDomNode) => {
  const domNode = useRef();

  useEffect(() => {
    const maybeHandler = (e) => {
      if (domNode.current && !domNode.current.contains(e.target) && !outsideDomNode.current.contains(e.target)) {
        callback();
      }
    }

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return domNode;
}