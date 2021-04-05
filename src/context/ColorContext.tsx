import { createContext, ReactNode, useContext } from "react";

const colorMap = {
  bgColor: { light: "#3A7D44", dark: "#A97237" },
  colorTh: { light: "#1A202C", dark: "#A0AEC0" },
  color: { light: "black", dark: "#fff" },
};

const ColorContext = createContext({} as typeof colorMap);

type ColorContextProviderType = {
  children: ReactNode;
};

const ColorContextProvider = ({ children }: ColorContextProviderType) => {
  return (
    <ColorContext.Provider value={colorMap}>{children}</ColorContext.Provider>
  );
};

const useColor = () => useContext(ColorContext);
export { ColorContextProvider, ColorContext, useColor };
