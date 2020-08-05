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

const JSON_FILE_EXTENSION_PATTERN = (
	/\.json$/
);

(
	async	function runFormatJSONFile( shellParameterList ){
				"use strict";

				const formatJSONFile = (
					require( "./format-json-file.js" )
				);

				const filePath = (
						(
								(
										shellParameterList
										.includes(
											(
												FILE_PATH_SHELL_PARAMETER
											)
										)
									===	true
								)
						)
					?	(
							shellParameterList[
								(
									(
										shellParameterList
										.indexOf(
											(
												FILE_PATH_SHELL_PARAMETER
											)
										)
									)+1
								)
							]
						)
					:	(
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
				);

				const sortProperty = (
						(
								shellParameterList
								.includes(
									(
										SORT_PROPERTY_SHELL_PARAMETER
									)
								)
							===	true
						)
				);

				const propertyList = (
						(
								(
										shellParameterList
										.includes(
											(
												PROPERTY_LIST_SHELL_PARAMETER
											)
										)
									===	true
								)
						)
					?	(
							(
								shellParameterList[
									(
										(
											shellParameterList
											.indexOf(
												(
													PROPERTY_LIST_SHELL_PARAMETER
												)
											)
										)+1
									)
								]
							)
							.split(
								(
									","
								)
							)
						)
					:	(
							[ ]
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
