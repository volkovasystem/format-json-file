"use strict";

/*;
	@license;
	@module-license:
		MIT License

		Copyright (c) 2020-present Richeve S. Bebedor <richeve.bebedor@gmail.com>

		@copyright:
			Richeve S. Bebedor
			<
				@year-range:
					2020-present
				@end-year-range
			>
			<
				@contact-detail:
					richeve.bebedor@gmail.com
				@end-contact-detail
			>
		@end-copyright

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@end-module-license
*/

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
	async	function formatJSONFile( filePath, option ){
				/*;
					@procedure-definition:
						Reformat JSON file to use hard tab and double quotes.
					@end-procedure-definition

					@parameter-definition:
						{
							"filePath": "
								[
									@type:
											string
									@end-type

									<@required;>
								]
							",

							"option": "
								[
									@type:
											object with {
												"sortProperty": "[@type:boolean;]",
												"propertyList": "[@type:object as Array;]"
											}
									@end-type

									<@optional;>
								]
							"
						}
					@end-parameter-definition

					@trigger-definition:
						{
							"trigger": "
								[
									@type:
											object as Error
									@end-type

									<@tag:invalid-json-file-path;>
									<@tag:cannot-format-json-file;>
								]
							"
						}
					@end-trigger-definition

					@result-definition:
						{
							"result": "
								[
									@type:
											boolean
									@end-type
								]
							"
						}
					@end-result-definition
				*/

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
													(
														filePath
													)
												)
									)
									.isFile( )
								===	true
							)

						&&	(
									JSON_FILE_EXTENSION_PATTERN
									.test(
										(
											filePath
										)
									)
								===	true
							)
					){
						option = (
								(
									option
								)

							||	(
									{ }
								)
						);

						const JSONFileContent = (
							await	fsAsync
									.readFile(
										(
											filePath
										)
									)
						);

						const JSONData = (
							JSON
							.parse(
								(
									JSONFileContent
								)
							)
						);

						const JSONFormattedData = (
								(
										(
												option
												.sortProperty
											===	true
										)
								)
							?	(
										(
												(
														Array
														.isArray(
															(
																option
																.propertyList
															)
														)
													===	true
												)

											&&	(
														(
															option
															.propertyList
														)
														.length
													>	0
												)
										)
									?	(
											option
											.propertyList
											.reduce(
												function( data, property ){
													if(
															(
																	(
																			property
																		in	JSONData
																	)
																===	true
															)
													){
															data[ property ]
														=	(
																JSONData[ property ]
															);
													}

													return	(
																data
															);
												},

												(
													{ }
												)
											)
										)
									:	(
											Object
											.keys(
												JSONData
											)
											.sort( )
											.reduce(
												function( data, property ){
													if(
															(
																	(
																			property
																		in	JSONData
																	)
																===	true
															)
													){
															data[ property ]
														=	(
																JSONData[ property ]
															);
													}

													return	(
																data
															);
												},

												(
													{ }
												)
											)
										)
								)
							:	(
									JSONData
								)
						);

						(
							await	fsAsync
									.writeFile(
										(
											filePath
										),

										(
											JSON
											.stringify(
												(
													JSONFormattedData
												),

												(
													null
												),

												(
													JSON_SPACE_CHARACTER
												)
											)
										)
									)
						);

						return	(
									true
								);
					}
					else{
						throw	(
									new	Error(
											(
												[
													"#invalid-json-file-path;",

													"cannot format json file;",
													"invalid json file path;",

													"@file-path:",
													`${ filePath };`
												]
											)
										)
								);
					}
				}
				catch( error ){
					throw	(
								new	Error(
										(
											[
												"#cannot-format-json-file;",

												"cannot format json file;",
												"cannot execute format json file;",

												"@error-data:",
												`${ util.inspect( error ) };`
											]
										)
									)
							);
				}
			}
);

module.exports = formatJSONFile;
