#! /usr/bin/env node

const FILE_PATH_SHELL_PARAMETER = (
	"--filePath"
);

const SORT_PROPERTY_SHELL_PARAMETER = (
	"--sortProperty"
);

const PROPERTY_LIST_SHELL_PARAMETER = (
	"--propertyList"
);

(
	async	function runFormatJSONFile( shellParameterList ){
				"use strict";

				const formatJSONFile = require( "./format-json-file.js" );

				return	(
							await	formatJSONFile(
										(
											shellParameterList[
												(
														shellParameterList
														.indexOf(
															FILE_PATH_SHELL_PARAMETER
														)
													+	1
												)
											]
										),

										(
											{
												"sortProperty": (
														shellParameterList
														.includes(
															SORT_PROPERTY_SHELL_PARAMETER
														)
													===	true
												),

												"propertyList": (
													(
															shellParameterList[
																	shellParameterList
																	.indexOf(
																		PROPERTY_LIST_SHELL_PARAMETER
																	)
																+	1
															]
														||	[ ]
													)
													.split( "," )
												)
											}
										)
									)
						);
			}
)( process.argv );
