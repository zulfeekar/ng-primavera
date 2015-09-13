/**
 * This file/module contains all configuration for the build process.
 */
module.exports = function(grunt) {

    var appName =  "primavera";

    var config = {
        devDir      : "../"+appName+"/touch/",
        vendorDir:"../"+appName+"/vendor/",
        buildDir    : "../bin/"+appName+"/touch",
        appName:appName
    };


    return config;
};