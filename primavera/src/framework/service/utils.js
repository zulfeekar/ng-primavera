/**
 * ******************************************************************************************************
 *
 *   Utils
 *   // Angular Service Style
 *
 * ******************************************************************************************************
 */
(function ( define ) {

    "use strict";

    define([
        ],
        function ()
        {

            var Utils = function ()
            {
                //
                // Pattern for ignoring special characters in String
                //
                function ignoreSpecialCharacters(str){
                    // Alpha numeric + white space
                    return (str+'').replace(/[^a-zA-Z\d\s:]/gi, '').replace(/[_]/g, '');
                };


                //
                function removeCharacterFromString(str,char){
                    // Alpha numeric + white space
                    return (str+'').replace(char,'');
                };


                // The clone method will deep clone nodes, object literals,
                // arrays, dates, regular expressions, and generic objects:

                function clone(src) {

                    function mixin(dest, source, copyFunc) {
                        var name, s, i, empty = {};
                        for(name in source){
                            // the (!(name in empty) || empty[name] !== s) condition avoids copying properties in "source"
                            // inherited from Object.prototype.	 For example, if dest has a custom toString() method,
                            // don't overwrite it with the toString() method that source inherited from Object.prototype
                            s = source[name];
                            if(!(name in dest) || (dest[name] !== s && (!(name in empty) || empty[name] !== s))){
                                dest[name] = copyFunc ? copyFunc(s) : s;
                            }
                        }
                        return dest;
                    }

                    if(!src || typeof src != "object" || Object.prototype.toString.call(src) === "[object Function]"){
                        // null, undefined, any non-object, or function
                        return src;	// anything
                    }
                    if(src.nodeType && "cloneNode" in src){
                        // DOM Node
                        return src.cloneNode(true); // Node
                    }
                    if(src instanceof Date){
                        // Date
                        return new Date(src.getTime());	// Date
                    }
                    if(src instanceof RegExp){
                        // RegExp
                        return new RegExp(src);   // RegExp
                    }
                    var r, i, l;
                    if(src instanceof Array){
                        // array
                        r = [];
                        for(i = 0, l = src.length; i < l; ++i){
                            if(i in src){
                                r.push(clone(src[i]));
                            }
                        }
                        // we don't clone functions for performance reasons
                        //		}else if(d.isFunction(src)){
                        //			// function
                        //			r = function(){ return src.apply(this, arguments); };
                    }else{
                        // generic objects
                        r = src.constructor ? new src.constructor() : {};
                    }
                    return mixin(r, src, clone);

                };

                function objectsize(obj){

                    var size = 0, key;

                    for (key in obj) {
                        if (obj.hasOwnProperty(key)) size++;
                    }
                    return size;
                };

                return {
                    ignoreSpecialCharacters:ignoreSpecialCharacters,
                    removeCharacterFromString:removeCharacterFromString,
                    clone:clone,
                    objectsize:objectsize
                }
            };

            return [ Utils ];
        });

}( define ));
