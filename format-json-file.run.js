#! /usr/bin/env node

const FILE_PATH_SHELL_PARAMETER = (
	"--filePath"
);

(
	async	function runFormatJSONFile( shellParameterList ){
				"use strict";

				const formatJSONFile = require( "./format-json-file.js" );

				return	(
							await	formatJSONFile(
										shellParameterList[
											(
													shellParameterList
													.indexOf(
														FILE_PATH_SHELL_PARAMETER
													)
												+	1
											)
										]
									)
						);
			}
)( process.argv );
