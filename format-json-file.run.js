#! /usr/bin/env node

(
	async	function runFormatJSONFile( shellParameterList ){
				"use strict";

				//; @start:code-space:template-engine;
				//; @start:procedure:check-shell-parameter;
				const checkShellParameter = (
					function checkShellParameter( shellParameter, shortShellParameter ){
						return	(
									[
										(
												shellParameterList
												.includes(
													(
														shortShellParameter
													)
												)
											===	true
										),

										(
												shellParameterList
												.includes(
													(
														shellParameter
													)
												)
											===	true
										),
									]
									.some(
										(
											( status ) => ( status )
										)
									)
								);
					}
				);
				//; @end:procedure:check-shell-parameter;

				//; @start:procedure:get-shell-parameter-value;
				const getShellParameterValue = (
					function getShellParameterValue( shellParameter, shortShellParameter ){
						if(
								(
										checkShellParameter(
											(
												shellParameter
											),

											(
												shortShellParameter
											)
										)
									===	true
								)
						){
							return	(
										shellParameterList[
											(
												[
													(
														shellParameterList
														.indexOf(
															(
																shellParameter
															)
														)
													),

													(
														shellParameterList
														.indexOf(
															(
																shortShellParameter
															)
														)
													),
												]
												.filter(
													(
														( index ) => (
																index
															>=	0
														)
													)
												)
												.pop( )+1
											)
										]
									);
						}
						else{
							return	(
										undefined
									);
						}
					}
				);
				//; @end:procedure:get-shell-parameter-value;

				//; @start:procedure:resolve-shell-parameter-value;
				const resolveShellParameterValue = (
					function resolveShellParameterValue( shellParameter, shortShellParameter, defaultValue ){
						const shellParameterValue = (
								(
										(
												checkShellParameter(
													(
														shellParameter
													),

													(
														shortShellParameter
													)
												)
											===	true
										)
								)
							?	(
									getShellParameterValue(
										(
											shellParameter
										),

										(
											shortShellParameter
										)
									)
								)
							:	(
									defaultValue
								)
						);

						if(
								(
										Array
										.isArray(
											(
												this
											)
										)
									===	true
								)

							&&	(
										this
										.length
									>	0
								)

							&&	(
										this
										.every(
											(
												( formatter ) => (
														typeof
														formatter
													==	"function"
												)
											)
										)
									===	true
								)
						){
							return	(
										this
										.reduce(
											(
												( shellParameterValue, formatter ) => (
													formatter( shellParameterValue )
												)
											),

											(
												shellParameterValue
											)
										)
									);
						}

						return	(
									shellParameterValue
								);
					}
				);
				//; @end:procedure:resolve-shell-parameter-value;

				//; @start:procedure:execute-shell-script;
				const executeShellScript = (
					async	function executeScript( shellScript ){
								shellScript = (
									Array
									.from(
										(
											arguments
										)
									)
									.reduce(
										(
											( shellScriptPhraseList, parameter ) => {
												if(
														(
																Array
																.isArray(
																	(
																		parameter
																	)
																)
															===	true
														)

													&&	(
																parameter
																.length
															>	0
														)

													&&	(
																parameter
																.every(
																	(
																		( shellScriptPhrase ) => (
																				(
																						typeof
																						shellScriptPhrase
																					==	"string"
																				)

																			&&	(
																						shellScriptPhrase
																						.length
																					>	0
																				)
																		)
																	)
																)
															===	true
														)
												){
													parameter
													.forEach(
														(
															( shellScriptPhrase ) => {
																shellScriptPhraseList
																.push(
																	(
																		shellScriptPhrase
																	)
																);
															}
														)
													);
												}
												else if(
														(
																typeof
																parameter
															==	"string"
														)

													&&	(
																parameter
																.length
															>	0
														)
												){
													shellScriptPhraseList
													.push(
														(
															parameter
														)
													);
												}

												return	(
															shellScriptPhraseList
														);
											}
										),

										(
											[ ]
										)
									)
									.filter(
										(
											( shellScriptPhrase ) => (
													(
															typeof
															shellScriptPhrase
														==	"string"
													)

												&&	(
															shellScriptPhrase
															.length
														>	0
													)
											)
										)
									)
									.join(
										(
											" "
										)
									)
								);

								try{
									const executeScriptPromise = (
										function executeScriptPromise( resolve, reject ){
											childProcess
											.spawn(
												(
													shellScript
												),

												(
													{
														"cwd": (
															process
															.cwd( )
														),

														"stdio": (
															[
																(
																	"ignore"
																),

																(
																	process
																	.stdout
																),

																(
																	process
																	.stdout
																)
															]
														),

														"shell": (
															true
														)
													}
												)
											)
											.on(
												(
													"close"
												),

												function( code ){
													if(
															(
																	code
																===	0
															)
													){
														resolve( );
													}
													else{
														reject( );
													}
												}
											);
										}
									);

									(
										await	(
													function( ){
														return	(
																	new	Promise(
																			(
																				executeScriptPromise
																			)
																		)
																);
													}
												)( )
									);

									return	(
												true
											);
								}
								catch( error ){
									return	(
												false
											);
								}
							}
				);
				//; @end:procedure:execute-shell-script;

				//; @start:procedure:help;
				const HELP_SHELL_PARAMETER = (
					"--help"
				);

				const HELP_SHORT_SHELL_PARAMETER = (
					"--h"
				);

				const helpStatus = (
					checkShellParameter(
						(
							HELP_SHELL_PARAMETER
						),

						(
							HELP_SHORT_SHELL_PARAMETER
						)
					)
				);

				if(
						(
								helpStatus
							===	true
						)
				){
					const helpShellParameter = (
						resolveShellParameterValue(
							(
								HELP_SHELL_PARAMETER
							),

							(
								HELP_SHORT_SHELL_PARAMETER
							),

							(
								undefined
							)
						)
					);

					const helpData = (
						require( "./format-json-file.help.json" )
					);

					const helpModuleData = (
						helpData
						.module
					);

					const helpModuleTemplate = (
						(
							[
								"\r"
							]
						)
						.concat(
							(
								[
									"\u001b[38;5;202m",
									"\u001b[1m",
									`\u{25bc} ${ helpModuleData.namespace } | ${ helpModuleData.alias }`,
									"\u001b[0m"
								]
								.join(
									(
										""
									)
								)
							)
						)
						.concat(
							(
								helpModuleData
								.description
								.map(
									(
										( description ) => (
											`\t${ description }`
										)
									)
								)
							)
						)
						.concat(
							(
								[
									"\r"
								]
							)
						)
						.concat(
							[
								"\tFormat:"
							]
						)
						.concat(
							(
								helpModuleData
								.format
								.map(
									(
										( format ) => (
											`\t\t${ format }`
										)
									)
								)
							)
						)
						.concat(
							(
								[
									"\r"
								]
							)
						)
						.concat(
							[
								"\tSample:"
							]
						)
						.concat(
							(
								helpModuleData
								.sample
								.map(
									(
										( sample ) => (
											`\t\t${ sample }`
										)
									)
								)
							)
						)
					);

					if(
							(
									typeof
									helpShellParameter
								!=	"undefined"
							)
					){
						const helpParameterListTemplate = (
							(
								[
									"\r"
								]
							)
							.concat(
								[
									"\tParameter:"
								]
							)
							.concat(
								(
									helpModuleData
									.parameter
									.filter(
										(
											( parameter ) => (
													(
															parameter
															.namespace
														===	helpShellParameter
													)

												||	(
															parameter
															.alias
														===	helpShellParameter
													)
											)
										)
									)
									.map(
										(
											( parameter ) => (
												(
													[
														[
															"\u001b[31;1m",
															"\u001b[1m",
															`\t\t\u{2022} ${ parameter.namespace } | ${ parameter.alias }`,
															"\u001b[0m"
														]
														.join(
															(
																""
															)
														)
													]
												)
												.concat(
													(
														parameter
														.description
														.map(
															(
																( description ) => (
																	`\t\t\t${ description }`
																)
															)
														)
													)
												)
												.concat(
													(
														[
															"\r"
														]
													)
												)
												.concat(
													[
														"\t\t\tFormat:"
													]
												)
												.concat(
													(
														parameter
														.format
														.map(
															(
																( format ) => (
																	`\t\t\t\t${ format }`
																)
															)
														)
													)
												)
												.concat(
													(
														[
															"\r"
														]
													)
												)
												.concat(
													[
														"\t\t\tSample:"
													]
												)
												.concat(
													(
														parameter
														.sample
														.map(
															(
																( sample ) => (
																	`\t\t\t\t${ sample }`
																)
															)
														)
													)
												)
												.concat(
													(
														[
															"\r"
														]
													)
												)
												.join(
													(
														"\n"
													)
												)
											)
										)
									)
								)
							)
						);

						console
						.log(
							(
								helpModuleTemplate
								.concat(
									(
										helpParameterListTemplate
									)
								)
								.join(
									(
										"\n"
									)
								)
							)
						);
					}
					else{
						const helpParameterListTemplate = (
							(
								[
									"\r"
								]
							)
							.concat(
								[
									"\tParameter:"
								]
							)
							.concat(
								(
									helpModuleData
									.parameter
									.map(
										(
											( parameter ) => (
												(
													[
														[
															"\u001b[37;1m",
															"\u001b[1m",
															`\t\t\u{2022} ${ parameter.namespace } | ${ parameter.alias }`,
															"\u001b[0m"
														]
														.join(
															(
																""
															)
														)
													]
												)
												.concat(
													(
														parameter
														.description
														.map(
															(
																( description ) => (
																	`\t\t\t${ description }`
																)
															)
														)
													)
												)
												.concat(
													(
														[
															"\r"
														]
													)
												)
												.concat(
													[
														"\t\t\tFormat:"
													]
												)
												.concat(
													(
														parameter
														.format
														.map(
															(
																( format ) => (
																	`\t\t\t\t${ format }`
																)
															)
														)
													)
												)
												.concat(
													(
														[
															"\r"
														]
													)
												)
												.concat(
													[
														"\t\t\tSample:"
													]
												)
												.concat(
													(
														parameter
														.sample
														.map(
															(
																( sample ) => (
																	`\t\t\t\t${ sample }`
																)
															)
														)
													)
												)
												.concat(
													(
														[
															"\r"
														]
													)
												)
												.join(
													(
														"\n"
													)
												)
											)
										)
									)
								)
							)
						);

						console
						.log(
							(
								helpModuleTemplate
								.concat(
									(
										helpParameterListTemplate
									)
								)
								.join(
									(
										"\n"
									)
								)
							)
						);
					}

					return	(
								true
							);
				}
				//; @end:procedure:help;

				//; @start:procedure:install-module;
				const INSTALL_MODULE_SHELL_PARAMETER = (
					"--installModule"
				);

				const INSTALL_MODULE_SHORT_SHELL_PARAMETER = (
					"--im"
				);

				const installModuleStatus = (
					checkShellParameter(
						(
							INSTALL_MODULE_SHELL_PARAMETER
						),

						(
							INSTALL_MODULE_SHORT_SHELL_PARAMETER
						)
					)
				);

				if(
						(
								installModuleStatus
							===	true
						)
				){
					const packageData = (
						require( "package.json" )
					);

					return	(
									(
											(
												await	executeShellScript(
															(
																[
																	"npm uninstall",

																	[
																		`${ packageData.alias }`,
																		`npm:${ packageData.name }`
																	]
																	.join(
																		(
																			"@"
																		)
																	),

																	"--global"
																]
															)
														)
											)
										===	true
									)

								&&	(
											(
												await	executeShellScript(
															(
																[
																	"npm install",

																	[
																		`${ packageData.alias }`,
																		`npm:${ packageData.name }`,
																		`${ packageData.version }`
																	]
																	.join(
																		(
																			"@"
																		)
																	),

																	"--global"
																]
															)
														)
											)
										===	true
									)
							);
				}
				//; @end:procedure:install-module;

				//; @start:procedure:uninstall-module;
				const UNINSTALL_MODULE_SHELL_PARAMETER = (
					"--uninstallModule"
				);

				const UNINSTALL_MODULE_SHORT_SHELL_PARAMETER = (
					"--um"
				);

				const uninstallModuleStatus = (
					checkShellParameter(
						(
							UNINSTALL_MODULE_SHELL_PARAMETER
						),

						(
							UNINSTALL_MODULE_SHORT_SHELL_PARAMETER
						)
					)
				);

				if(
						(
								uninstallModuleStatus
							===	true
						)
				){
					const packageData = (
						require( "package.json" )
					);

					return	(
									(
											(
												await	executeShellScript(
															(
																[
																	"npm uninstall",

																	[
																		`${ packageData.alias }`,
																		`npm:${ packageData.name }`
																	]
																	.join(
																		(
																			"@"
																		)
																	),

																	"--global"
																]
															)
														)
											)
										===	true
									)
							);
				}
				//; @end:procedure:uninstall-module;
				//;	@end:code-space:template-engine;

				const FILE_PATH_SHELL_PARAMETER = (
					"--filePath"
				);

				const FILE_PATH_SHORT_SHELL_PARAMETER = (
					"--fp"
				);

				const SORT_PROPERTY_SHELL_PARAMETER = (
					"--sortProperty"
				);

				const SORT_PROPERTY_SHORT_SHELL_PARAMETER = (
					"--sp"
				);

				const PROPERTY_LIST_SHELL_PARAMETER = (
					"--propertyList"
				);

				const PROPERTY_LIST_SHORT_SHELL_PARAMETER = (
					"--pl"
				);

				const JSON_FILE_EXTENSION_PATTERN = (
					/\.json$/
				);

				const PROPERTY_LIST_SEPARATOR_PATTERN = (
					/[\,][\s\t\n\r]+/gm
				);

				const formatJSONFile = (
					require( "./format-json-file.js" )
				);

				const filePath = (
					resolveShellParameterValue(
						(
							FILE_PATH_SHELL_PARAMETER
						),

						(
							FILE_PATH_SHORT_SHELL_PARAMETER
						),

						(
							(
								shellParameterList
								.find(
									(
										( shellParameter ) => (
											JSON_FILE_EXTENSION_PATTERN
											.test(
												(
													shellParameter
												)
											)
										)
									)
								)
							)
						)
					)
				);

				const sortProperty = (
					checkShellParameter(
						(
							SORT_PROPERTY_SHELL_PARAMETER
						),

						(
							SORT_PROPERTY_SHORT_SHELL_PARAMETER
						)
					)
				);

				const propertyList = (
					resolveShellParameterValue
					.bind(
						(
							[
								(
									( shellParameterValue ) => (
											(
													(
															typeof
															shellParameterValue
														==	"string"
													)

												&&	(
															shellParameterValue
															.length
														>	0
													)
											)
										?	(
												shellParameterValue
												.split(
													(
														PROPERTY_LIST_SEPARATOR_PATTERN
													)
												)
											)
										:	(
												undefined
											)
									)
								)
							]
						)
					)(
						(
							PROPERTY_LIST_SHELL_PARAMETER
						),

						(
							PROPERTY_LIST_SHORT_SHELL_PARAMETER
						),

						(
							undefined
						)
					)
				);

				return	(
							await	formatJSONFile(
										(
											filePath
										),

										(
											{
												"sortProperty": (
													sortProperty
												),

												"propertyList": (
													propertyList
												)
											}
										)
									)
						);
			}
)(
	(
		process
		.argv
	)
);
