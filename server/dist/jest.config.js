"use strict";
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    "roots": [
        "<rootDir>"
    ],
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "(/__test__/.*|(\\.|/)(test|spec))\\.tsx?$",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
};
