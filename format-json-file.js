parcelRequire=function(modules,cache,entry,globalName){var error,previousRequire="function"==typeof parcelRequire&&parcelRequire,nodeRequire="function"==typeof require&&require;function newRequire(name,jumped){if(!cache[name]){if(!modules[name]){var currentRequire="function"==typeof parcelRequire&&parcelRequire;if(!jumped&&currentRequire)return currentRequire(name,!0);if(previousRequire)return previousRequire(name,!0);if(nodeRequire&&"string"==typeof name)return nodeRequire(name);var err=new Error("Cannot find module '"+name+"'");throw err.code="MODULE_NOT_FOUND",err}localRequire.resolve=function(x){return modules[name][1][x]||x},localRequire.cache={};var module=cache[name]=new newRequire.Module(name);modules[name][0].call(module.exports,localRequire,module,module.exports,this)}return cache[name].exports;function localRequire(x){return newRequire(localRequire.resolve(x))}}newRequire.isParcelRequire=!0,newRequire.Module=function(moduleName){this.id=moduleName,this.bundle=newRequire,this.exports={}},newRequire.modules=modules,newRequire.cache=cache,newRequire.parent=previousRequire,newRequire.register=function(id,exports){modules[id]=[function(require,module){module.exports=exports},{}]};for(var i=0;i<entry.length;i++)try{newRequire(entry[i])}catch(e){error||(error=e)}if(entry.length){var mainExports=newRequire(entry[entry.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=mainExports:"function"==typeof define&&define.amd?define((function(){return mainExports})):this.formatJSONFile=mainExports}if(parcelRequire=newRequire,error)throw error;return newRequire}({Uq2g:[function(require,module,exports){"use strict";
/*;
	@license;
	@module-license:
		MIT License

		Copyright (c) 2020-present Richeve S. Bebedor <richeve.bebedor@gmail.com>

		@copyright:
			Richeve S. Bebedor

			<
				@license-year-range:
					2020-present
				@end-license-year-range
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
*/const fs=require("fs"),util=require("util"),fsAsync=fs.promises,JSON_FILE_EXTENSION_PATTERN=/\.json$/;module.exports=async function(filePath,option){try{if("string"==typeof filePath&&filePath.length>5&&!0===(await fsAsync.stat(filePath)).isFile()&&!0===JSON_FILE_EXTENSION_PATTERN.test(filePath)){option=option||{};const JSONFileContent=await fsAsync.readFile(filePath),JSONData=JSON.parse(JSONFileContent),JSONFormattedData=!0===option.sortProperty?!0===Array.isArray(option.propertyList)&&option.propertyList.length>0?option.propertyList.reduce((function(data,property){return property in JSONData==!0&&(data[property]=JSONData[property]),data}),{}):Object.keys(JSONData).sort().reduce((function(data,property){return property in JSONData==!0&&(data[property]=JSONData[property]),data}),{}):JSONData;return await fsAsync.writeFile(filePath,JSON.stringify(JSONFormattedData,null,"\t").trim()+"\n"),!0}throw new Error(["#invalid-json-file-path;","cannot format json file;","invalid json file path;","@file-path:",filePath+";"])}catch(error){throw new Error(["#cannot-format-json-file;","cannot format json file;","cannot execute format json file;","@error-data:",util.inspect(error)+";"])}}},{}]},{},["Uq2g"]);