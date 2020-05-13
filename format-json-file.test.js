"use strict";

const assert = require( "assert" );

const strictAssert = assert.strict;

const formatJSONFile = require( "./format-json-file.js" );

(
	async	function( ){
				strictAssert
				.equal(
					(
						await	formatJSONFile(
									"./package.json"
								)
					),

					(
						true
					),

					(
						"Must return true"
					)
				);

				strictAssert
				.equal(
					(
						await	formatJSONFile(
									"./package-lock.json"
								)
					),

					(
						true
					),

					(
						"Must return true."
					)
				)
			}
)( );
