import { SetState, create } from "zustand";
import { devtools } from "zustand/middleware";

interface StateAction {
  idleModal: boolean;
  setIdleModal: (boolean: boolean) => void;
}

const initialState: StateAction = {
  idleModal: false,
  setIdleModal: () => {},
};

const appStore = create(
  devtools((set: SetState<StateAction>) => ({
    ...initialState,
    setIdleModal: async (boolean: boolean) => {
      set({ idleModal: boolean });
    },
  }))
);

export default appStore;
