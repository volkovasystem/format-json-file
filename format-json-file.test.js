"use strict";

const assert = require( "assert" );

const strictAssert = (
	assert
	.strict
);

const formatJSONFile = (
	require( "./format-json-file.js" )
);

const TEST_PACKAGE_JSON_FILE = (
	async	function TEST_PACKAGE_JSON_FILE( ){
				try{
					const testValue = (
						true
					);

					strictAssert
					.equal(
						(
							await	formatJSONFile(
										(
											"./package.json"
										)
									)
						),

						(
							testValue
						),

						(
							[
								"#test-package-json-file;",

								"test package json file;",
								`must return ${ testValue };`
							]
						)
					);

					return	(
								true
							);
				}
				catch( error ){
					console
					.error(
						(
							error
						)
					);

					return	(
								false
							);
				}
			}
);

const TEST_PACKAGE_LOCK_JSON_FILE = (
	async	function TEST_PACKAGE_LOCK_JSON_FILE( ){
				try{
					const testValue = (
						true
					);

					strictAssert
					.equal(
						(
							await	formatJSONFile(
										(
											"./package-lock.json"
										)
									)
						),

						(
							testValue
						),

						(
							[
								"#test-package-lock-json-file;",

								"test package lock json file;",
								`must return ${ testValue };`
							]
						)
					);

					return	(
								true
							);
				}
				catch( error ){
					console
					.error(
						(
							error
						)
					);

					return	(
								false
							);
				}
			}
);

(
	async	function TEST_SCENE_BASIC( ){
				console
				.table(
					(
						[
							{
								"test": (
									"test package json file"
								),

								"result": (
									await	TEST_PACKAGE_JSON_FILE( )
								)
							},

							{
								"test": (
									"test package lock json file"
								),

								"result": (
									await	TEST_PACKAGE_LOCK_JSON_FILE( )
								)
							}
						]
					)
				);
			}
)( );
