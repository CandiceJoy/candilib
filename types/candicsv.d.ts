/**
 * @class CSV
 * @description Generates CSV files; accepts arrays and objects for rows, columns may be scalar or arrays
 */
export class CSV {
    /**
     * @constructor
     * @param {?(object|any[])} headersIn - Array of headers or an object whose keys will become the in-order headers
     * @param {object} options - Options object; delimiter and qualifier
     */
    constructor(headersIn: (object | any[]) | null, options?: object);
    currentLine: any;
    headers: any;
    entries: any[];
    qualifier: string;
    delimeter: string;
    /**
     * Adds an array as a line
     * @function addLine
     * @param {any[]} line - Array of data (represents a row)
     */
    addLine(line: any[]): void;
    /**
     * Adds an object to the CSV file; the headers are used to match the object's keys
     * @function addObject
     * @param {object} obj
     */
    addObject(obj: object): void;
    /**
     * Writes the csv file
     * @function writeFile
     * @param {string} filename - The filename to write the csv to
     */
    writeFile(filename: string): void;
}
