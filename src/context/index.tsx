import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  ReactNode,
  Dispatch,
} from "react";

interface MaterialUIState {
  miniSidenav: boolean;
  transparentSidenav: boolean;
  whiteSidenav: boolean;
  sidenavColor: string;
  transparentNavbar: boolean;
  fixedNavbar: boolean;
  openConfigurator: boolean;
  direction: string;
  layout: string;
  darkMode: boolean;
}

type MaterialUIAction =
  | { type: "MINI_SIDENAV"; value: boolean }
  | { type: "TRANSPARENT_SIDENAV"; value: boolean }
  | { type: "WHITE_SIDENAV"; value: boolean }
  | { type: "SIDENAV_COLOR"; value: string }
  | { type: "TRANSPARENT_NAVBAR"; value: boolean }
  | { type: "FIXED_NAVBAR"; value: boolean }
  | { type: "OPEN_CONFIGURATOR"; value: boolean }
  | { type: "DIRECTION"; value: string }
  | { type: "LAYOUT"; value: string }
  | { type: "DARKMODE"; value: boolean };

const MaterialUI = createContext<
  [MaterialUIState, Dispatch<MaterialUIAction>] | null
>(null);

MaterialUI.displayName = "MaterialUIContext";

function reducer(
  state: MaterialUIState,
  action: MaterialUIAction
): MaterialUIState {
  switch (action.type) {
    case "MINI_SIDENAV":
      return { ...state, miniSidenav: action.value };
    case "TRANSPARENT_SIDENAV":
      return { ...state, transparentSidenav: action.value };
    case "WHITE_SIDENAV":
      return { ...state, whiteSidenav: action.value };
    case "SIDENAV_COLOR":
      return { ...state, sidenavColor: action.value };
    case "TRANSPARENT_NAVBAR":
      return { ...state, transparentNavbar: action.value };
    case "FIXED_NAVBAR":
      return { ...state, fixedNavbar: action.value };
    case "OPEN_CONFIGURATOR":
      return { ...state, openConfigurator: action.value };
    case "DIRECTION":
      return { ...state, direction: action.value };
    case "LAYOUT":
      return { ...state, layout: action.value };
    case "DARKMODE":
      return { ...state, darkMode: action.value };
    default:
      const exhaustiveCheck: never = action;
      throw new Error(`Unhandled action type: ${exhaustiveCheck}`);
  }
}

interface MaterialUIControllerProviderProps {
  children: ReactNode;
}

function MaterialUIControllerProvider({
  children,
}: MaterialUIControllerProviderProps) {
  const initialState: MaterialUIState = {
    miniSidenav: false,
    transparentSidenav: false,
    whiteSidenav: false,
    sidenavColor: "info",
    transparentNavbar: true,
    fixedNavbar: true,
    openConfigurator: false,
    direction: "ltr",
    layout: "dashboard",
    darkMode: false,
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return (
    <MaterialUI.Provider
      value={value as [MaterialUIState, Dispatch<MaterialUIAction>]}
    >
      {children}
    </MaterialUI.Provider>
  );
}

function useMaterialUIController() {
  const context = useContext(MaterialUI);

  if (!context) {
    throw new Error(
      "useMaterialUIController should be used inside the MaterialUIControllerProvider."
    );
  }

  return context;
}

const setMiniSidenav = (dispatch: Dispatch<MaterialUIAction>, value: boolean) =>
  dispatch({ type: "MINI_SIDENAV", value });
const setTransparentSidenav = (
  dispatch: Dispatch<MaterialUIAction>,
  value: boolean
) => dispatch({ type: "TRANSPARENT_SIDENAV", value });
const setWhiteSidenav = (
  dispatch: Dispatch<MaterialUIAction>,
  value: boolean
) => dispatch({ type: "WHITE_SIDENAV", value });
const setSidenavColor = (dispatch: Dispatch<MaterialUIAction>, value: string) =>
  dispatch({ type: "SIDENAV_COLOR", value });
const setTransparentNavbar = (
  dispatch: Dispatch<MaterialUIAction>,
  value: boolean
) => dispatch({ type: "TRANSPARENT_NAVBAR", value });
const setFixedNavbar = (dispatch: Dispatch<MaterialUIAction>, value: boolean) =>
  dispatch({ type: "FIXED_NAVBAR", value });
const setOpenConfigurator = (
  dispatch: Dispatch<MaterialUIAction>,
  value: boolean
) => dispatch({ type: "OPEN_CONFIGURATOR", value });
const setDirection = (dispatch: Dispatch<MaterialUIAction>, value: string) =>
  dispatch({ type: "DIRECTION", value });
const setLayout = (dispatch: Dispatch<MaterialUIAction>, value: string) =>
  dispatch({ type: "LAYOUT", value });
const setDarkMode = (dispatch: Dispatch<MaterialUIAction>, value: boolean) =>
  dispatch({ type: "DARKMODE", value });

export {
  MaterialUIControllerProvider,
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
  setSidenavColor,
  setTransparentNavbar,
  setFixedNavbar,
  setOpenConfigurator,
  setDirection,
  setLayout,
  setDarkMode,
};
