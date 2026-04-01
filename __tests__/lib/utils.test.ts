import {
  formatCurrency,
  calculateProjectProgress,
  calculateMargin,
  truncateText,
  isValidEmail,
  generateInvoiceNumber,
  calculateUtilization,
  getPriorityColor,
  groupBy,
  sortBy,
  chunk,
} from "@/lib/utils";

describe("lib/utils", () => {
  it("formatCurrency formats cents as dollars", () => {
    expect(formatCurrency(1099)).toBe("$10.99");
  });

  it("calculateProjectProgress handles zero total", () => {
    expect(calculateProjectProgress(0, 0)).toBe(0);
    expect(calculateProjectProgress(3, 10)).toBe(30);
  });

  it("calculateMargin handles zero revenue", () => {
    expect(calculateMargin(0, 100)).toBe(0);
    expect(calculateMargin(200, 50)).toBe(75);
  });

  it("truncateText leaves short strings unchanged", () => {
    expect(truncateText("hi", 10)).toBe("hi");
    expect(truncateText("hello world", 5)).toBe("hello...");
  });

  it("isValidEmail validates basic shape", () => {
    expect(isValidEmail("a@b.co")).toBe(true);
    expect(isValidEmail("not-an-email")).toBe(false);
  });

  it("generateInvoiceNumber pads sequence", () => {
    expect(generateInvoiceNumber("INV", 7)).toMatch(/INV-\d{4}-000007/);
  });

  it("calculateUtilization rounds percentage", () => {
    expect(calculateUtilization(0, 0)).toBe(0);
    expect(calculateUtilization(25, 40)).toBe(63);
  });

  it("getPriorityColor returns fallback", () => {
    expect(getPriorityColor("HIGH")).toContain("orange");
    expect(getPriorityColor("UNKNOWN")).toContain("gray");
  });

  it("groupBy clusters by key", () => {
    const rows = [
      { id: 1, role: "a" },
      { id: 2, role: "b" },
      { id: 3, role: "a" },
    ];
    const g = groupBy(rows, "role");
    expect(Object.keys(g).sort()).toEqual(["a", "b"]);
    expect(g.a).toHaveLength(2);
  });

  it("sortBy orders ascending and descending", () => {
    const arr = [{ n: 2 }, { n: 1 }, { n: 3 }];
    expect(sortBy(arr, "n").map((x) => x.n)).toEqual([1, 2, 3]);
    expect(sortBy(arr, "n", false).map((x) => x.n)).toEqual([3, 2, 1]);
  });

  it("chunk splits arrays", () => {
    expect(chunk([1, 2, 3, 4], 2)).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });
});
