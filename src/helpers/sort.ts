import type { TableData } from "./table";

const sortArrByParam = (
  arr: TableData,
  param: string,
  direction: "asc" | "desc",
) => {
  return arr.sort((a, b) => {
    const valA = a[param];
    const valB = b[param];

    let comparison = 0;

    if (typeof valA === "number" && typeof valB === "number") {
      comparison = valA - valB;
    } else if (typeof valA === "string" && typeof valB === "string") {
      comparison = valA.localeCompare(valB);
    }

    return direction === "asc" ? comparison : -comparison;
  });
};

export default { sortArrByParam };
