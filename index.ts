import { formAPIQuery } from "./client/form-query";
import { print } from "./shared/logger";

async function main() {
  for (const apiObj of formAPIQuery) {
    const res = await apiObj.fn();
    print(`name: ${apiObj.name}, description: ${apiObj.description}`, {
      res,
    });
  }
}

main();
