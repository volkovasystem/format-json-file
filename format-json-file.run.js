#! /usr/bin/env node

(
	async	function( ){
				const parseShellParameter = (
					require( "parse-shell-parameter" )
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
							undefined
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
							false
						)
				);

				const propertyList = (
					parameter.propertyList
					?.split(
						(
							/\s*\,\s*/g
						)
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
