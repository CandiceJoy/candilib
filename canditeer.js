import puppeteer from "puppeteer";

let browser;
let showBrowser = false;
let currentPage;

/**
 * Initialises the browser instance
 * @function init
 * @param {boolean} [showBrowserIn] - Whether to show the browser window
 */
export async function init(showBrowserIn = false)
{
	showBrowser = showBrowserIn;
	browser = await puppeteer.launch({headless: !showBrowser});
}

/**
 * Gets the text content from a given element or selector
 * @function getText
 * @param {(object|string)} elementIn - The element or selector to find the element
 * @returns {Promise<any>} - The text content of the element
 */
export async function getText(elementIn)
{
	const element = await findElement(elementIn);
	return getAttribute(element, "textContent");
}

/**
 * Gets an attribute from the given element instance (can find the element first if given a selector)
 * @function getAttribute
 * @param {(object|string)} elementIn - The element or selector to find the element
 * @param {string} attribute - Any ancestor of the element; used as a search base
 * @returns {Promise<any>} - The value of the attribute
 */
export async function getAttribute(elementIn, attribute)
{
	const element = await findElement(elementIn);
	const property = await element.getProperty(attribute);

	if(!property)
	{
		return null;
	}

	return property.jsonValue();
}

/**
 * Gets an element (or returns the parameter if given an Element)
 * @function findElement
 * @param {(object|string)} elementIn - The element or selector to find the element
 * @returns {puppeteer.ElementHandle} - The element
 * @throws Error if the element cannot be found and isn't given
 */
async function findElement(elementIn)
{
	let element;

	if(!elementIn)
	{
		throw "No element given";
	}

	if(typeof elementIn === "string")
	{
		element = await getElement(elementIn);
	}
	else
	{
		element = elementIn;
	}

	if(!element)
	{
		throw "Could not find element: " + elementIn;
	}

	return element;
}

/**
 * Gets the ancestor to use for the current context
 * @function getAncestorFrom
 * @param {?(puppeteer.ElementHandle|puppeteer.Page)} ancestor - The ancestor input
 * @returns {(puppeteer.ElementHandle|puppeteer.Page)} - The ancestor
 * @throws Error if no ancestor is given and no current page is set
 */
function getAncestorFrom(ancestor)
{
	if(ancestor)
	{
		return ancestor;
	}
	else if(currentPage)
	{
		return currentPage;
	}
	else
	{
		throw "No ancestor given and no current page set";
	}
}

/**
 * Gets an element instance from the given selector
 * @function getElement
 * @param {string} selector - The selector
 * @param {?(puppeteer.ElementHandle|puppeteer.Page)} [ancestor] - Any ancestor of the element; used as a search base
 * @returns {Promise<puppeteer.ElementHandle>} - The found element
 * @throws Error if no selector is given
 */
export function getElement(selector, ancestor = null)
{
	if(!selector)
	{
		throw "No selector given";
	}

	let from = getAncestorFrom(ancestor);
	return from.$(selector);
}

/**
 * Gets all elements that match the given selector
 * @function getElements
 * @param {string} selector - The selector
 * @param {?(puppeteer.ElementHandle|puppeteer.Page)} [ancestor] - Any ancestor of the element; used as a search base
 * @returns {Promise<puppeteer.ElementHandle[]>} - The element found
 * @throws Error if no selector is given
 */
export function getElements(selector, ancestor = null)
{
	if(!selector)
	{
		throw "No selector given";
	}

	const from = getAncestorFrom(ancestor);
	return from.$$(selector);
}

/**
 * Fetches the page from the given url
 * @function fetchPage
 * @param {string} url - The element or selector to find the element
 * @param {boolean} [setWith] - Whether to set the page as the page to use with canditeer
 * @returns {Page} - The value of the attribute
 */
export async function fetchPage(url, setWith = true)
{
	const page = await browser.newPage();
	await page.goto(url);

	if(setWith)
	{
		currentPage = page;
	}

	return page;
}

/**
 * Closes the browser window if necessary
 * @function done
 */
export async function done()
{
	if(!showBrowser)
	{
		await browser.close();
	}
}

/**
 * Sets the page as the current page to use with canditeer
 * @function withPage
 * @param {puppeteer.Page} page - The page
 */
export function withPage(page)
{
	currentPage = page;
}
