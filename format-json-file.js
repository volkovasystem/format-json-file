(function webpackUniversalModuleDefinition(root,factory){if(typeof exports==="object"&&typeof module==="object")module.exports=factory();else if(typeof define==="function"&&define.amd)define("formatJSONFile",[],factory);else if(typeof exports==="object")exports["formatJSONFile"]=factory();else root["formatJSONFile"]=factory()})(this,(()=>(()=>{"use strict";var __webpack_modules__={89:(module,__unused_webpack_exports,__webpack_require__)=>{
/*;!
	@license:module:
		MIT License

		Copyright (c) 2023-present Richeve S. Bebedor <richeve.bebedor@gmail.com>

		@license:copyright:
			Richeve S. Bebedor

			<@license:year-range:2023-present;>

			<@license:contact-detail:richeve.bebedor@gmail.com;>
		@license:copyright;

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
	@license:module;
*/
const formatJSONFile=async function formatJSONFile(filePath,option){const fs=__webpack_require__(147);const util=__webpack_require__(837);const fsAsync=fs.promises;const JSON_FILE_EXTENSION_PATTERN=/\.json$/;const JSON_SPACE_CHARACTER="\t";const NEW_LINE_CHARACTER="\n";const END_OF_LINE_TOKEN="\r\n";try{if(typeof filePath=="string"&&filePath.length>5&&(await fsAsync.stat(filePath)).isFile()===true&&JSON_FILE_EXTENSION_PATTERN.test(filePath)===true){option=option||{};const JSONFileContent=await fsAsync.readFile(filePath);const JSONData=JSON.parse(JSONFileContent);const JSONFormattedData=option.sortPropertyStatus===true?Array.isArray(option.propertyList)===true&&option.propertyList.length>0?option.propertyList.reduce((function(data,property){if(property in JSONData===true)data[property]=JSONData[property];return data}),{}):Object.keys(JSONData).sort().reduce((function(data,property){if(property in JSONData===true)data[property]=JSONData[property];return data}),{}):JSONData;await fsAsync.writeFile(filePath,JSON.stringify(JSONFormattedData,null,JSON_SPACE_CHARACTER).trim().split(NEW_LINE_CHARACTER).join(END_OF_LINE_TOKEN)+END_OF_LINE_TOKEN);return true}else throw new Error(["#invalid-json-file-path;","cannot format json file;","invalid json file path;","@file-path:",`${util.inspect(filePath)};`,"@option-data:",`${util.inspect(option)};`])}catch(error){throw new Error(["#cannot-format-json-file;","cannot format json file;","cannot execute format json file procedure;","@file-path:",`${util.inspect(filePath)};`,"@option-data:",`${util.inspect(option)};`,"@error-data:",`${util.inspect(error)};`])}};module.exports=formatJSONFile},147:module=>{module.exports=require("fs")},837:module=>{module.exports=require("util")}};var __webpack_module_cache__={};function __webpack_require__(moduleId){var cachedModule=__webpack_module_cache__[moduleId];if(cachedModule!==void 0)return cachedModule.exports;var module=__webpack_module_cache__[moduleId]={exports:{}};__webpack_modules__[moduleId](module,module.exports,__webpack_require__);return module.exports}var __webpack_exports__=__webpack_require__(89);return __webpack_exports__})()));