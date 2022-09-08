/**
 * Initialises the browser instance
 * @function init
 * @param {boolean} [showBrowserIn] - Whether to show the browser window
 */
export function init(showBrowserIn?: boolean): Promise<void>;
/**
 * Gets the text content from a given element or selector
 * @function getText
 * @param {(object|string)} elementIn - The element or selector to find the element
 * @returns {Promise<any>} - The text content of the element
 */
export function getText(elementIn: (object | string)): Promise<any>;
/**
 * Gets an attribute from the given element instance (can find the element first if given a selector)
 * @function getAttribute
 * @param {(object|string)} elementIn - The element or selector to find the element
 * @param {string} attribute - Any ancestor of the element; used as a search base
 * @returns {Promise<any>} - The value of the attribute
 */
export function getAttribute(elementIn: (object | string), attribute: string): Promise<any>;
/**
 * Gets an element instance from the given selector
 * @function getElement
 * @param {string} selector - The selector
 * @param {?(puppeteer.ElementHandle|puppeteer.Page)} [ancestor] - Any ancestor of the element; used as a search base
 * @returns {Promise<puppeteer.ElementHandle>} - The found element
 * @throws Error if no selector is given
 */
export function getElement(selector: string, ancestor?: (puppeteer.ElementHandle | puppeteer.Page) | null): Promise<puppeteer.ElementHandle>;
/**
 * Gets all elements that match the given selector
 * @function getElements
 * @param {string} selector - The selector
 * @param {?(puppeteer.ElementHandle|puppeteer.Page)} [ancestor] - Any ancestor of the element; used as a search base
 * @returns {Promise<puppeteer.ElementHandle[]>} - The element found
 * @throws Error if no selector is given
 */
export function getElements(selector: string, ancestor?: (puppeteer.ElementHandle | puppeteer.Page) | null): Promise<puppeteer.ElementHandle[]>;
/**
 * Fetches the page from the given url
 * @function fetchPage
 * @param {string} url - The element or selector to find the element
 * @param {boolean} [setWith] - Whether to set the page as the page to use with canditeer
 * @returns {Page} - The value of the attribute
 */
export function fetchPage(url: string, setWith?: boolean): Page;
/**
 * Closes the browser window if necessary
 * @function done
 */
export function done(): Promise<void>;
/**
 * Sets the page as the current page to use with canditeer
 * @function withPage
 * @param {puppeteer.Page} page - The page
 */
export function withPage(page: puppeteer.Page): void;
