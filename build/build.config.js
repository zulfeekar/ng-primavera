/**
 * This file/module contains all configuration for the build process.
 */
module.exports = function(grunt) {

    var appName =  "primavera";

    var config = {
        devDir      : '../'+appName+"/",
        vendorDir   : '../'+appName+"/vendor/",
        buildDir    : "../bin/"+appName,
        appName:appName
    };


    return config;
};