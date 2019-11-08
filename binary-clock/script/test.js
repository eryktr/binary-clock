var assert = require("assert");
var script = require("./script")

const getActiveHourDivIds = script._test.getActiveHourDivIds;
const getActiveMinuteDivIds = script._test.getActiveMinuteDivIds;
const getActiveSecondDivIds = script._test.getActiveMinuteDivIds;
const hourDivHtmlId = script._test.hourDivHtmlId;
const minuteDivHtmlId = script._test.minuteDivHtmlId;
const secondDivHtmlId = script._test.secondDivHtmlId;


function arraysAreEqual(arr1, arr2) {
    sz1 = arr1.length;
    sz2 = arr2.length;
    if (sz1 != sz2) {
        return false;
    }
    for (i = 0; i < sz1; ++i) {
        if (arr1[i] != arr2[i]) {
            return false;
        }
    }
    return true;
}

describe("getActiveHourDivIds", () => {
    it("Should return [1, 2] when called with hour = 3", () => {
        expected = [1,2];
        actual = getActiveHourDivIds(3);
        assert(arraysAreEqual(actual, expected));
    });
    it("Should return [1, 4, 8] when called with hour = 13", () => {
        expected = [1,4,8];
        actual = getActiveHourDivIds(13);
        assert(arraysAreEqual(actual, expected));
    }),
    it("Should return [] when called with hour = 0", () => {
        expected = [];
        actual = getActiveHourDivIds(0);
        assert (arraysAreEqual(actual, expected));
    })
})

describe("getActiveMinuteDivIds", () => {
    it("Should return [4, 8, 16, 32] when called with minute = 60", () => {
        expected = [4, 8, 16, 32];
        actual = getActiveMinuteDivIds(60);
        assert(arraysAreEqual(actual, expected));
    }) 
}) 

describe("getActiveSecondDivIds", () => {
    it("Should return [1] when called with second = 1", () => {
        expected = [1];
        actual = getActiveSecondDivIds(1);
        assert(arraysAreEqual(actual, expected));
    }) 
}) 

describe("hourDivHtmlId", () => {
    it("Should return h4 when called with hour = 4", () => {
        assert.equal("h4", hourDivHtmlId(4));
    })
})

describe("getMinuteDivHtmlId", () => {
    it("Should return m32 when called with minute = 32", () => {
        assert.equal("m32", minuteDivHtmlId(32));
    })
})

describe("getSecondDivHtmlId", () => {
    it("Should return s4 when called with second = 4", () => {
        assert.equal("s4", secondDivHtmlId(4));
    })
})
