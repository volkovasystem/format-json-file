"use strict";

/*;!
	@license:module:
		MIT License

		Copyright (c) 2023-present Richeve S. Bebedor <richeve.bebedor@gmail.com>

		@license:copyright:
			Richeve S. Bebedor

			<@license:year-range:2023-present;>

			<@license:contact-detail:richeve.bebedor@gmail.com;>
		@license:copyright;

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
	@license:module;
*/

const formatJSONFile = (
	async	function formatJSONFile( filePath, option ){
				/*;
					@definition:
						@procedure: #formatJSONFile
							@description:
								Reformat JSON file to use hard tab and double quote.
							@description;
						@procedure;

						@parameter: #filePath
							@type:
									string
							@type;

							@description:
							@description;

							@required;
						@parameter;

						@parameter: #option
							@type:
									object:with:[
										sortPropertyStatus,
										propertyList
									]
							@type;

							@description:
							@description;

							@optional;
						@parameter;

						@parameter: #option.sortPropertyStatus
							@type:
									boolean
							@type;

							@description:
							@description;

							@optional;
						@parameter;

						@parameter: #option.propertyList
							@type:
									object:as:Array:of:string
							@type;

							@description:
							@description;

							@optional;
						@parameter;

						@result: #result
							@type:
									boolean
							@type;

							@description:
							@description;
						@result;

						@trigger: #trigger
							@type:
									object:as:Error
							@type;

							@tag: #invalid-json-file-path;

							@description:
							@description;

							@tag: #cannot-format-json-file;
						@trigger;

						@trigger: #trigger
							@type:
									object:as:Error
							@type;

							@tag: #cannot-format-json-file;

							@description:
							@description;
						@trigger;
					@definition;
				*/

				const fs = require( "fs" );
				const util = require( "util" );

				const fsAsync = (
					fs
					.promises
				);

				const JSON_FILE_EXTENSION_PATTERN = (
					/\.json$/
				);

				const JSON_SPACE_CHARACTER = (
					"\t"
				);

				const NEW_LINE_CHARACTER = (
					"\n"
				);

				const END_OF_LINE_TOKEN = (
					"\r\n"
				)

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
						(
								option
							=	(
										(
											option
										)

									||	(
											{ }
										)
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
												.sortPropertyStatus
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
														(
																data[ property ]
															=	(
																	JSONData[ property ]
																)
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
												(
													JSONData
												)
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
														(
																data[ property ]
															=	(
																	JSONData[ property ]
																)
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
													.trim( )
													.split(
														(
															NEW_LINE_CHARACTER
														)
													)
													.join(
														(
															END_OF_LINE_TOKEN
														)
													)
												)
											+
												(
													END_OF_LINE_TOKEN
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
													`${ util.inspect( filePath ) };`,

													"@option-data:",
													`${ util.inspect( option ) };`,
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
												"cannot execute format json file procedure;",

												"@file-path:",
												`${ util.inspect( filePath ) };`,

												"@option-data:",
												`${ util.inspect( option ) };`,

												"@error-data:",
												`${ util.inspect( error ) };`,
											]
										)
									)
							);
				}
			}
);

(
		module
		.exports
	=	(
			formatJSONFile
		)
);
