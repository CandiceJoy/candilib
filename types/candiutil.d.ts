/**
 * Prints debug information for a variable
 * @param {string} name - The title of the variable
 * @param {obj} obj - The variable
 * @param {boolean} verbose - Verbosity flag
 * @param {number} depth - Depth with which to recurse
 * @param {boolean} hidden - Display hidden variables flag
 */
export function debug(name: string, obj: any, verbose?: boolean, depth?: number, hidden?: boolean): void;
/**
 * Returns a colorised string with the given parameters
 * @param {string} str - The string to colorise
 * @param {...string} tags - Extra tags (italic, bold, underline, background stuff, etc)
 * @returns {string}
 */
export function color(str: string, ...tags: string[]): string;
/**
 * Fetch a url as a file, using cache if possible
 * @param {string} url - The url
 * @param {string} file - The filename to save the file as
 * @returns {Promise<void>}
 */
export function fetchAsFile(url: string, file: string): Promise<void>;
/**
 * Get a file as a string
 * @param {string} file - The filename
 * @returns {string}
 */
export function getFile(file: string): string;
/**
 * Gets a file as a string then makes an object out of it
 * @param {string} file - The filename
 * @returns {...object}
 */
export function getObjFromFile(file: string): object[];
/**
 * Writes a string to a file
 * @param {string} file - The filename
 * @param {string} str - The string to write
 */
export function writeFile(file: string, str: string): void;
/**
 * Creates a directory
 * @param {string} dir - The directory to create
 */
export function mkDir(dir: string): void;
/**
 * Determines whether a given file exists
 * @param {string} file - The filename
 * @returns {boolean}
 */
export function exists(file: string): boolean;
/**
 * Fetches a url as raw text
 * @param {string} url - The url
 * @param {boolean=true} doCache - Whether to use caching
 * @returns {Promise<string>}
 */
export function fetchAsText(url: string, doCache?: boolean): Promise<string>;
/**
 * Sanitises a string
 * @param {string} str - The string to sanitise
 * @returns {string}
 */
export function sanitise(str: string): string;
/**
 * Converts an HTML Row Element to an array of data for processing
 * @param {HTMLTableRowElement} row - The row tag
 * @param {?function} unknownDataProcessor - A function to use for processing unknown or unrecognised data
 * @returns {any[]}
 */
export function rowToArray(row: HTMLTableRowElement, unknownDataProcessor?: Function | null): any[];
/**
 * Converts an HTML Row Element to an object using the given headers
 * @param {HTMLTableRowElement} row - The row element
 * @param {string[]} headers - The header array
 * @param {?function} unknownDataProcessor - A funtion to use for processing unknown or unrecognised data
 * @returns {object}
 */
export function rowToObj(row: HTMLTableRowElement, headers: string[], unknownDataProcessor?: Function | null): object;
/**
 * Converts a set of HTML Row Elements into a set of objects using the given headers
 * @param {HTMLTableRowElement[]} rows - The row element
 * @param {string[]} headers - The header array
 * @param {?function} unknownDataProcessor - A funtion to use for processing unknown or unrecognised data
 * @returns {object[]}
 */
export function rowsToArrayOfObj(rows: HTMLTableRowElement[], headers: string[], unknownDataProcessor?: Function | null): object[];
/**
 * Converts an HTML Table Element to an array of objects
 * @param {HTMLTableElement} table - The table to pull data from
 * @param {string[]} rawHeaders - The headers to use for the data
 * @param {?function} unknownDataProcessor - A funtion to use for processing unknown or unrecognised data
 * @param {string} rowSelector - A CSS selector to select the rows of the table
 * @returns {object[]}
 */
export function tableToArrayOfObj(table: HTMLTableElement, rawHeaders: string[], unknownDataProcessor?: Function | null, rowSelector?: string): object[];
/**
 * Generates a csv file from an object array
 * @param {object[]} objArr - The object array
 * @param {?function} objProcessor - A function to use to process non-scalar data
 * @param {?string} qualifier - A string to use to qualify fields
 * @returns {string}
 */
export function generateCsv(objArr: object[], objProcessor?: Function | null, qualifier?: string | null): string;
/**
 * Rearranges and/or removes the keys of a given object array
 * @param {object[]} objs - The object array to rearrange
 * @param {string[]} arrangement - A string array with the keys of the object in the desited order
 * @returns {object[]}
 */
export function rearrangeObjs(objs: object[], arrangement: string[]): object[];
/**
 * Rearranges and/or removes the keys of a given object
 * @param {object} objs - The object to rearrange
 * @param {string[]} arrangement - A string array with the keys of the object in the desited order
 * @returns {object}
 */
export function rearrangeObj(obj: any, arrangement: string[]): object;
/**
 * Determines whether a string is empty or not
 * @param {any} str - The candidate string
 * @returns {boolean} - True if string is empty, False otherwise
 */
export function isEmptyString(str: any): boolean;
/**
 * Converts an array of strings to a single string (also known as flattening) using the provided delimeter
 * @param {string[]} arr - The array of data
 * @param {?string} separator - The separator desired
 * @returns {string}
 */
export function arrayToString(arr: string[], separator?: string | null): string;
/**
 * Add a given field with a given value to each object in an array
 * @param {object[]} arr - The array of objects
 * @param {string} name - The object key to set
 * @param {any} value - The value to set
 */
export function addFieldToObjects(arr: object[], name: string, value: any): void;
/**
 * Removes all nonword characters from a given string
 * @param {string} str - The string
 * @returns {string}
 */
export function removeNonwordCharacters(str: string): string;
/**
 * Sleep for a given number of milliseconds
 * @param {number} amt - Number of milliseconds to sleep
 * @returns {Promise<unknown>}
 */
export function sleep(amt: number): Promise<unknown>;
/**
 * Start logging of a function
 * @param {...any} args - The arguments of the original function
 */
export function logStart(...args: any[]): void;
/**
 * End logging of a function
 * @param {?any} returnValue - The value returned by the original function
 */
export function logEnd(returnValue?: any | null): void;
/**
 * Write a JSON object to a file
 * @param {string} file - The filename
 * @param {object} obj - The object to write
 * @param {boolean=true} pretty - Whether to write the file in a pretty format
 */
export function writeJson(file: string, obj: object, pretty?: boolean): void;
/**
 * Prettifies an array
 * @param {any[]} arr - The array to prettify
 * @param {string=" "} separator - The separator for elements of the array
 * @param {string} elementColor - The color of each element
 * @param {string} separatorColor - The color of the separator
 * @returns {string}
 */
export function getPrettyArray(arr: any[], separator: string, elementColor: string, separatorColor: string): string;
/**
 * Analyzes a given chained selector, displaying how many results there are at each level
 * @param {object} $ - JQuery / Cheerio instance
 * @param {string} selector - The selector
 * @param {string} separator - The chain separator
 */
export function analyzeSelector($: object, selector: string, separator?: string): void;
/**
 * Fetches a Document from a given url
 * @param {string} url - The url
 * @returns {Promise<Document>}
 */
export function fetchDocument(url: string): Promise<Document>;
/**
 * Get data from the given HTML Table Element
 * @param {HTMLTableElement} table - The table
 * @param {?function} processor - A function to process the data
 * @returns {*[]}
 */
export function getDataFromTable(table: HTMLTableElement, processor?: Function | null): any[];
/**
 * Get the headers of an HTML Table Element
 * @param {HTMLTableElement} table - The table
 * @returns {string[]}
 */
export function getTableHeaders(table: HTMLTableElement): string[];
/**
 * Converts an array to an object array?
 * @param arr
 * @param headers
 * @returns {*[]}
 */
export function arrayToObjArr(arr: any, headers?: any): any[];
export const log: any;
