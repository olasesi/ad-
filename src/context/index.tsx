import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  ReactNode,
  Dispatch,
} from "react";

interface Adminii3UIState {
  miniSidenav: boolean;
  layout: string;
  darkMode: boolean;
}

type Adminii3UIAction =
  | { type: "MINI_SIDENAV"; value: boolean }
  | { type: "LAYOUT"; value: string }
  | { type: "DARKMODE"; value: boolean };

const Adminii3UI = createContext<
  [Adminii3UIState, Dispatch<Adminii3UIAction>] | null
>(null);

Adminii3UI.displayName = "AdminiiUI3Context";

function reducer(
  state: Adminii3UIState,
  action: Adminii3UIAction
): Adminii3UIState {
  switch (action.type) {
    case "MINI_SIDENAV":
      return { ...state, miniSidenav: action.value };
    case "LAYOUT":
      return { ...state, layout: action.value };
    case "DARKMODE":
      return { ...state, darkMode: action.value };
    default:
      const exhaustiveCheck: never = action;
      throw new Error(`Unhandled action type: ${exhaustiveCheck}`);
  }
}

interface Adminii3UIControllerProviderProps {
  children: ReactNode;
}

function Adminii3UIControllerProvider({
  children,
}: Adminii3UIControllerProviderProps) {
  const initialState: Adminii3UIState = {
    miniSidenav: false,
    layout: "dashboard",
    darkMode: false,
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return (
    <Adminii3UI.Provider
      value={value as [Adminii3UIState, Dispatch<Adminii3UIAction>]}
    >
      {children}
    </Adminii3UI.Provider>
  );
}

function useAdminii3UIController() {
  const context = useContext(Adminii3UI);

  if (!context) {
    throw new Error(
      "useAdminii3UIController should be used inside the Adminii3UIControllerProvider."
    );
  }

  return context;
}

const setMiniSidenav = (dispatch: Dispatch<Adminii3UIAction>, value: boolean) =>
  dispatch({ type: "MINI_SIDENAV", value });
const setLayout = (dispatch: Dispatch<Adminii3UIAction>, value: string) =>
  dispatch({ type: "LAYOUT", value });
const setDarkMode = (dispatch: Dispatch<Adminii3UIAction>, value: boolean) =>
  dispatch({ type: "DARKMODE", value });

export {
  Adminii3UIControllerProvider,
  useAdminii3UIController,
  setMiniSidenav,
  setLayout,
  setDarkMode,
};
