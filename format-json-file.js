!function(global,factory){if("function"==typeof define&&define.amd)define([],factory);else if("undefined"!=typeof exports)factory();else{factory(),global.formatJsonFile={}}}("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:this,(function(){"use strict";
/*;
  	@module-license:
  		MIT License
  
  		Copyright (c) 2020-present Richeve S. Bebedor <richeve.bebedor@gmail.com>
  
  		@copyright:
  			Richeve S. Bebedor
  			<
  				@year-range:
  					2020-present
  				@end-year-range
  			>
  			<
  				@contact-detail:
  					richeve.bebedor@gmail.com
  				@end-contact-detail
  			>
  		@end-copyright
  
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
  	@end-module-license
  */const fs=require("fs"),util=require("util"),fsAsync=fs.promises,JSON_FILE_EXTENSION_PATTERN=/\.json$/;module.exports=async function(filePath,option){
/*;
    					@procedure-definition:
    						Reformat JSON file to use hard tab and double quotes.
    					@end-procedure-definition
    
    					@parameter-definition:
    						{
    							"filePath": "
    								[
    									@type:
    											string
    									@end-type
    
    									<@required;>
    								]
    							",
    							"option": "
    								[
    									@type:
    											object with {
    												"sortProperty": "[@type: boolean;]",
    												"propertyList": "[@type: object as Array;]"
    											}
    									@end-type
    
    									<@optional;>
    								]
    							"
    						}
    					@end-parameter-definition
    
    					@trigger-definition:
    						{
    							"trigger": "
    								[
    									@type:
    											object as Error
    									@end-type
    
    									<@tag: invalid-json-file;>
    									<@tag: cannot-format-json-file;>
    								]
    							"
    						}
    					@end-trigger-definition
    
    					@result-definition:
    						{
    							"result": "
    								[
    									@type:
    											boolean
    									@end-type
    								]
    							"
    						}
    					@end-result-definition
    				*/
try{if("string"==typeof filePath&&filePath.length>5&&!0===(await fsAsync.stat(filePath)).isFile()&&!0===JSON_FILE_EXTENSION_PATTERN.test(filePath)){option=option||{};const JSONFileContent=await fsAsync.readFile(filePath),JSONData=JSON.parse(JSONFileContent),JSONFormattedData=!0===option.sortProperty?!0===Array.isArray(option.propertyList)&&option.propertyList.length>0?option.propertyList.reduce((function(data,property){return property in JSONData==1&&(data[property]=JSONData[property]),data}),{}):Object.keys(JSONData).sort().reduce((function(data,property){return property in JSONData==1&&(data[property]=JSONData[property]),data}),{}):JSONData;return await fsAsync.writeFile(filePath,JSON.stringify(JSONFormattedData,null,"\t")),!0}throw new Error(["#invalid-json-file;","cannot format json file","json file invalid"])}catch(error){throw new Error(["#cannot-format-json-file;","cannot execute format json file","@error-data: "+util.inspect(error)])}}}));