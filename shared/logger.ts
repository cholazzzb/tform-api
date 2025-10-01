export function print(...args: Array<any>) {
  console.log(JSON.stringify({ ...args }, null, 2));
}
