#! /usr/bin/env node

(
	async	function runFormatJSONFile( shellParameterList ){
				"use strict";

				const formatJSONFile = require( "./format-json-file.js" );

				return	(
							await	formatJSONFile(
										shellParameterList[ 2 ]
									)
						);
			}
)( process.argv );
