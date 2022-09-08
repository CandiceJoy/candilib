import fs from "fs";

/**
 * @class CSV
 * @description Generates CSV files; accepts arrays and objects for rows, columns may be scalar or arrays
 */
export class CSV
{
	currentLine;
	headers;
	entries = [];
	qualifier = "\"";
	delimeter = ",";

	/**
	 * @constructor
	 * @param {?(object|any[])} headersIn - Array of headers or an object whose keys will become the in-order headers
	 * @param {object} options - Options object; delimiter and qualifier
	 */
	constructor(headersIn, options = null)
	{
		if( typeof headersIn === "object" && !Array.isArray(headersIn))
		{
			this.headers = Object.keys(headersIn);
		}
		else
		{
			this.headers = headersIn;
		}

		if(options)
		{
			for(const option of Object.keys(options))
			{
				const value = options[option];

				switch(option.toLowerCase())
				{
					case "qualifier":
						this.qualifier = value;
						break;
					case "delimiter":
						this.delimeter = value;
						break;
					default:
						throw "Unrecognised option: " + option;
				}
			}
		}
	}

	/**
	 * Adds an array as a line
	 * @function addLine
	 * @param {any[]} line - Array of data (represents a row)
	 */
	addLine(line)
	{
		const row = new CSVEntry(this.headers, line);
		this.entries.push(line);
		this.currentLine = line;
	}

	/**
	 * Adds an object to the CSV file; the headers are used to match the object's keys
	 * @function addObject
	 * @param {object} obj
	 */
	addObject(obj)
	{
		const row = new CSVEntry(this.headers);

		if(typeof obj !== "object")
		{
			throw "Expected object";
		}

		if(Object.keys(obj).length !== this.headers.length)
		{
			throw "Object has " + Object.keys(obj).length + " keys but expected " + headers.length;
		}

		for(const key of Object.keys(obj))
		{
			const value = obj[key];

			if(!this.headers.includes(key))
			{
				throw "Could not find header " + key;
			}

			row.add(key, value);
		}

		this.entries.push(row);
	}

	/**
	 * Writes the csv file
	 * @function writeFile
	 * @param {string} filename - The filename to write the csv to
	 */
	writeFile(filename)
	{
		let lines = [this.headers];
		let text = "";

		for( const entry of this.entries )
		{
			const line = entry.getOutputRows();
			lines = lines.concat(line);
		}

		for( let row = 0; row < lines.length; row++ )
		{
			for( let col = 0; col < lines[row].length; col++ )
			{
				const data = lines[row][col];

				if( this.qualifier )
				{
					text += this.qualifier;
				}

				if( (data === null || !data) && data !== 0 )
				{
					text += "";
				}
				else
				{
					text += data;
				}

				if( this.qualifier )
				{
					text += this.qualifier;
				}

				if( col < lines[row].length - 1 )
				{
					text += this.delimeter;
				}
			}

			if( row < lines.length -1 )
			{
				text += "\n";
			}
		}

		fs.writeFileSync(filename,text);
	}
}

/**
 * @class CSVEntry
 * @description Represents a CSV line, but may contain an array in one or more columns which will generate additional rows.
 */
class CSVEntry
{
	headers;
	data = [];

	constructor(headersIn, dataIn = null)
	{
		this.headers = headersIn;

		if(!dataIn)
		{
			return;
		}

		if(!Array.isArray(dataIn))
		{
			throw "Expected array";
		}

		if(dataIn.length !== this.headers.length)
		{
			throw "Input length " + dataIn.length + "; expected " + this.headers.length;
		}

		this.data = dataIn;
	}

	/**
	 * Get the data in the given key
	 * @function get
	 * @param {string} header - The key
	 * @returns {*} - The data
	 */
	get(header)
	{
		const index = this.indexOf(header);
		return this.data[index];
	}

	/**
	 * Finds the index of the given header
	 * @function indexOf
	 * @param header - The header
	 * @returns {number} - The index
	 */
	indexOf(header)
	{
		const index = this.headers.indexOf(header);

		if(!index && index !== 0)
		{
			throw "Could not find header " + header;
		}

		return index;
	}

	/**
	 * Adds a value under the given header; supports adding multiple values which will become an array and, thus, multiple CSV lines
	 * @function add
	 * @param {string} header - The header
	 * @param value - The value to add
	 */
	add(header, value)
	{
		if(typeof value === "object" && !Array.isArray(value))
		{
			throw "Cannot add object to cell";
		}

		const index = this.indexOf(header);
		const old = this.data[index];

		if(old)
		{
			if( Array.isArray(old) )
			{
				this.data[index].push(value);
			}
			else
			{
				this.data[index] = [old, value];
			}
		}
		else
		{
			this.data[index] = value;
		}
	}

	/**
	 * Assembles the data into proper output-able CSV rows (minus qualifiers and delimeters)
	 * @function getOutputRows
	 * @returns {*[][]}
	 */
	getOutputRows()
	{
		let longest = 1;

		for( const row of this.data )
		{
			if( Array.isArray( row ) )
			{
				const length = row.length;

				if( length > longest )
				{
					longest = length;
				}
			}
		}

		const output = [];

		for( let x = 0; x < longest; x++ )
		{
			const arr = [];

			for( const header of this.headers )
			{
				arr.push("");
			}

			output.push( arr );
		}

		for( let col = 0; col < this.data.length; col++ )
		{
			const colData = this.data[col];

			if( !Array.isArray(colData))
			{
				output[0][col] = colData;
				continue;
			}

			for( let x = 0; x< colData.length; x++ )
			{
				let index = 0;

				while( output[index][col] )
				{
					index++;
				}

				output[index][col] = colData[x];
			}

		}

		return output;
	}
}
