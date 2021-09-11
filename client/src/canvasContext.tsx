import {
  createContext,
  PropsWithChildren,
  RefObject,
  useContext,
  useRef,
} from "react";

export const CanvasContext = createContext(
  {} as RefObject<HTMLCanvasElement>
);
export const CanvasProvider = ({ children }: PropsWithChildren<{}>) => {
  const ref = useRef<HTMLCanvasElement>(null);
  return (
    <CanvasContext.Provider value={ref}>
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => {
  return useContext(CanvasContext);
};
