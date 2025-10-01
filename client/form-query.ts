import { AUTH_TOKEN, BASE_URL } from "../shared/env";
import type { API } from "../shared/type";

export async function getFormList(next_cursor = "") {
  return fetch(`${BASE_URL}/v1/forms?limit=2&cursor=${next_cursor}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  }).then(
    (response) =>
      response.json() as Promise<{
        data: {
          list: Array<unknown>;
          pagination: { next_cursor: string; has_next_page: boolean };
        };
      }>,
  );
}
export async function infiniteGetFormList() {
  return new Promise(async (res, rej) => {
    const data = [];
    const page1 = await getFormList();
    data.push(...page1.data.list);

    if (page1.data.pagination.has_next_page) {
      const next_cursor = page1.data.pagination.next_cursor;

      const page2 = await getFormList(next_cursor);
      data.push(...page2.data.list);
    }

    res(data);
  });
}

export const formAPIQuery: Array<API<unknown>> = [
  {
    name: "getFormList",
    description: "Get a list of forms",
    fn: getFormList,
  },
  {
    name: "infiniteGetFormList",
    description: "Get a list of forms",
    fn: infiniteGetFormList,
  },
];
