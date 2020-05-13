"use strict";

const fs = require( "fs" );
const util = require( "util" );

const fsAsync = fs.promises;

const JSON_FILE_EXTENSION_PATTERN = (
	/\.json$/
);

const JSON_SPACE_CHARACTER = (
	"\t"
);

const formatJSONFile = (
	async	function formatJSONFile( filePath ){
				try{
					if(
							(
									typeof
									filePath
								==	"string"
							)

						&&	(
									filePath
									.length
								>	5
							)

						&&	(
									(
										await	fsAsync
												.stat(
													filePath
												)
									)
									.isFile( )
								===	true
							)

						&&	(
									JSON_FILE_EXTENSION_PATTERN
									.test(
										filePath
									)
								===	true
							)
					){
						const JSONFileContent = (
							await	fsAsync
									.readFile(
										filePath
									)
						);

						await	fsAsync
								.writeFile(
									(
										filePath
									),

									(
										JSON
										.stringify(
											(
												JSON
												.parse(
													JSONFileContent
												)
											),

											(
												null
											),

											(
												JSON_SPACE_CHARACTER
											)
										)
									)
								);

						return	true;
					}
					else{
						throw	(
									new	Error(
											[
												"#invalid-json-file;",

												"cannot format json file",
												"json file invalid"
											]
										)
								);
					}
				}
				catch( error ){
					throw	(
								new	Error(
										[
											"#cannot-format-json-file;",

											"cannot execute format json file",

											`@error-data: ${ util.inspect( error ) }`
										]
									)
							);
				}
			}
);

module.exports = formatJSONFile;
