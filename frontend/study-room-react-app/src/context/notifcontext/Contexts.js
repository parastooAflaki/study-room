import React from "react";
import { notifReducer, notifInitialState } from "./Reducers";

export const NotifContext = React.createContext({
  state: notifInitialState,
  dispatch: () => null,
});

export const NotifProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(notifReducer, notifInitialState);

  return (
    <NotifContext.Provider value={[state, dispatch]}>
      {children}
    </NotifContext.Provider>
  );
};
