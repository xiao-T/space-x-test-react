// home page reducer
import { createContext, Dispatch } from "react";

// record item type
export type TRecordItem = {
  id: string;
  name: string;
  date_local: string;
  links: {
    patch: {
      large: string;
      small: string;
    };
    youtube_id: string;
  };
  details: string;
};
// home state type
type THomePageState = {
  records: TRecordItem[];
  hasNextPage: boolean;
  page: number;
};
export const homeInitState: THomePageState = {
  records: [],
  hasNextPage: true,
  page: 1,
};

type TAction = {
  type: "update" | "reset";
  payload?: THomePageState;
};
// home reducer
function homeReducer(state = homeInitState, action: TAction) {
  const { payload = homeInitState, type } = action;
  switch (type) {
    case "update": {
      const { records = [], page = 1 } = payload;
      // since React 18, useEffect will be called twice in development with `StrictMode`
      // refer to: https://react.dev/blog/2022/03/08/react-18-upgrade-guide#updates-to-strict-mode
      if (page === 1) {
        return {
          ...payload,
          records: [...records],
        };
      }
      return {
        ...payload,
        records: [...state.records, ...records],
      };
    }
    case "reset": {
      return {
        ...homeInitState,
      };
    }
  }
}
// home context
export const HomeContext = createContext<
  THomePageState & {
    dispatch: Dispatch<TAction>;
  }
>({ ...homeInitState, dispatch: () => {} });

export default homeReducer;
