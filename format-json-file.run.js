#! /usr/bin/env node

(
	async	function( ){
				const fs = require( "fs" );
				const path = require( "path" );

				const parseShellParameter = (
					require( "parse-shell-parameter" )
				);

				const fsAsync = (
					fs
					.promises
				);

				const MODULE_ROOT_DIRECTORY_PATH = (
						(
							process
							.env
							.MODULE_ROOT_DIRECTORY_PATH
						)
					||
						(
							__dirname
						)
				);

				const MODULE_NAMESPACE_VALUE = (
						(
							process
							.env
							.MODULE_NAMESPACE_VALUE
						)
					||
						(
							JSON
							.parse(
								(
									await	fsAsync
											.readFile(
												(
													path
													.resolve(
														(
															MODULE_ROOT_DIRECTORY_PATH
														),

														(
															"package.json"
														)
													)
												)
											)
								)
							)
							?.alias
						)
				);

				const parameter = (
					parseShellParameter( )
				);

				const filePath = (
						(
							parameter
							.filePath
						)
					||
						(
							undefined
						)
				);

				const sortPropertyStatus = (
						(
								(
										(
											/^true$/i
										)
										.test(
											(
												`${ parameter.sortPropertyStatus }`
											)
										)
									===	true
								)
						)
					?	(
							true
						)
					:	(
								(
										(
											/^false/i
										)
										.test(
											(
												`${ parameter.sortPropertyStatus }`
											)
										)
									===	true
								)
						)
					?	(
							false
						)
					:	(
							undefined
						)
				);

				const propertyList = (
						(
							parameter
							.propertyList
							?.split(
								(
									/\s*\,\s*/g
								)
							)
						)
					||
						(
							undefined
						)
				);

				const option = (
					{
						"sortPropertyStatus": (
							sortPropertyStatus
						),

						"propertyList": (
							propertyList
						),
					}
				);

				try{
					(
						await	require( `${ MODULE_ROOT_DIRECTORY_PATH }/${ MODULE_NAMESPACE_VALUE }.js` )(
									(
										filePath
									),

									(
										option
									)
								)
					);
				}
				catch( error ){
					console.error(
						(
							[
								"#cannot-run-module;",

								"cannot run module;",

								"@parameter-data:",
								parameter,

								"@error-data:",
								error,
							]
						)
					);
				}
			}
)( );
