// apis for home

import axios from "axios";
import dayjs, { Dayjs } from "dayjs";

// form type
export type TFilterFormType = {
  keywords: string;
  startDate: Dayjs;
  endDate: Dayjs;
  launchStatus: "all" | "launched" | "unlaunched";
  date_local: string;
};

export const defaultFilter: TFilterFormType = {
  keywords: "",
  launchStatus: "all",
  date_local: "desc",
  startDate: dayjs().subtract(7, "days"),
  endDate: dayjs(),
};
// fetch records
const recordsUrl = "https://api.spacexdata.com/v5/launches/query";
export const fetchRecords = async (
  page: number,
  filter?: TFilterFormType
): Promise<[[], boolean]> => {
  const options = {
    limit: 12,
    page,
    sort: {
      date_local: filter?.date_local || "desc",
    },
  };
  let query = {};
  if (filter) {
    const { keywords, startDate, endDate, launchStatus } = filter;
    let success: boolean | undefined;
    if (launchStatus === "unlaunched") {
      success = false;
    }
    if (launchStatus === "launched") {
      success = true;
    }
    query = {
      $text: {
        $search: keywords,
      },
      date_local: {
        $lt: dayjs(endDate).toISOString(),
        $gt: dayjs(startDate).toISOString(),
      },
      success,
    };
  }

  try {
    const res = await axios.post(recordsUrl, {
      options,
      query,
    });
    const { data } = res;
    return [data.docs, data.hasNextPage];
  } catch (e) {
    console.log(e);
    return [[], false];
  }
};
