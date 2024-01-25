import { SearchParams } from "../search-params";

describe("SearchParams Unit Tests", () => {

    test.each([
        { page: null, expected: 1 },
        { page: undefined, expected: 1 },
        { page: "", expected: 1 },
        { page: "fake", expected: 1 },
        { page: 0, expected: 1 },
        { page: -1, expected: 1 },
        { page: 5.5, expected: 1 },
        { page: true, expected: 1 },
        { page: false, expected: 1 },
        { page: {}, expected: 1 },

        { page: 1, expected: 1 },
        { page: 2, expected: 2 },

    ])("page prop", (i) => {
        expect(new SearchParams({ page: i.page as any }).page).toBe(i.expected);
    });

    test.each([
        { per_page: null, expected: 15 },
        { per_page: undefined, expected: 15 },
        { per_page: "", expected: 15 },
        { per_page: "fake", expected: 15 },
        { per_page: 0, expected: 15 },
        { per_page: -1, expected: 15 },
        { per_page: 5.5, expected: 15 },
        { per_page: true, expected: 15 },
        { per_page: false, expected: 15 },
        { per_page: {}, expected: 15 },

        { per_page: 1, expected: 1 },
        { per_page: 2, expected: 2 },
        { per_page: 10, expected: 10 },

    ])("per_page prop", (i) => {
        expect(new SearchParams({ per_page: i.per_page as any }).per_page).toBe(
            i.expected
        );
    });

    test.each([
        { sort: null, expected: null },
        { sort: undefined, expected: null },
        { sort: "", expected: null },
        { sort: 0, expected: "0" },
        { sort: -1, expected: "-1" },
        { sort: 5.5, expected: "5.5" },
        { sort: true, expected: "true" },
        { sort: false, expected: "false" },
        { sort: {}, expected: "[object Object]" },
        { sort: "field", expected: "field" },
    ])("sort prop", (i) => {
        expect(new SearchParams({ sort: i.sort as any }).sort).toBe(i.expected);
    });


    test.each([
        { filter: null, expected: null },
        { filter: undefined, expected: null },
        { filter: "", expected: null },

        { filter: 0, expected: "0" },
        { filter: -1, expected: "-1" },
        { filter: 5.5, expected: "5.5" },
        { filter: true, expected: "true" },
        { filter: false, expected: "false" },
        { filter: {}, expected: "[object Object]" },
        { filter: "field", expected: "field" },

    ])("filter prop", (i) => {
        expect(new SearchParams({ filter: i.filter as any }).filter).toBe(
            i.expected
        );
    });
});