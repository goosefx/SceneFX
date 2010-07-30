// jQuery Object Oriented Class
//
// Version 1
// 
// Created by Marcus Wilhelm
// Based on the work of Hassan Jodat Shandi
// 28 Jul 2010
//

jQuery.extend({
    // define namespace
    namespace: function() {
        var a=arguments, o=null, i, j, d;
        for (i=0; i<a.length; i=i+1) {
            d=a[i].split(".");
            o=window;
            for (j=0; j<d.length; j=j+1) {
                o[d[j]]=o[d[j]] || {};
                o=o[d[j]];
            }
        }
        return o;
    },
    // define class core object
    Class: function() {
    }
});

// define class elements
jQuery.extend(jQuery.Class, {
    // this method for create class object
    create: function() {
        var parent = null,
            elements = null,
            options = {
                abstract: false,
                properties: [],
                superClass: [] // for holding superclass initialize function
            };
            
        // check for extending
        if (jQuery.isFunction(arguments[0])) {
            parent = arguments[0];
            elements = arguments[1];
            
            if (arguments[2]) {
                jQuery.extend(options, arguments[2] || {});
            }
        }
        else {
            elements = arguments[0];
            if (arguments[1]) {
                jQuery.extend(options, arguments[1] || {});
            }
        }
        
        // create new class core
        function handle() {
            // check if class is abstracted
            if (this.options.abstract) {
                throw new Error("abstract classes cannot be instantiated");
            }
            
            // execute constructor method
            try {
                this.initialize.apply(this, arguments);
            } catch (ex) { }
        }
        
        // extend class base methods in new class core
        jQuery.extend(handle.prototype, jQuery.Class);
        
        // extend parent class methods in new class core
        if (parent) {
            // get parent initialize function
            var superClass = parent.prototype.options.superClass || [];
            var superRender = parent.prototype.options.superRender || [];
            
            // extend parent class methods in new class core
            jQuery.extend(handle.prototype, parent.prototype);
            
            // save parent initialize function
            superClass.push(parent.prototype.initialize);
            options.superClass = superClass;
            
            try {
                superRender.push(parent.prototype.render);
                options.superRender = superRender;
            } catch (ex) { }
        }
        
        // assign properties
        var properties = {
            names: (parent) ? parent.prototype.options.properties.names.concat() : [],
            methods: (parent) ? parent.prototype.options.properties.methods.concat() : []
        };
        ;
        
        if (options.properties.length > 0) {
            
            for(var i = 0; i < options.properties.length; i++) {
                var name = options.properties[i];
                
                if (!elements[name]) {
                    console.log('Property method ' + name + '() is missing!');
                } else {
                    properties.names.push(name);
                    properties.methods.push(elements[name]);
                }
            }
        }
        
        options.properties = properties;
        
        // extend user defined methods in new class core
        jQuery.extend(handle.prototype, elements || {});
        handle.prototype.options = options;

        	

        return handle;
    },
    
    // for add method to class in runtime
    addMethods: function() {
        if (arguments[0]) {
            jQuery.extend(this.constructor.prototype, arguments[0]);
        }
    },
    
    // for add attribute to class in runtime
    addAttributes: function() {
        if (arguments[0]) {
            jQuery.extend(this.constructor.prototype, arguments[0]);
        }
    },
    
    // this method is use to get/set value of a property
    property: function(name) {
        var index = this.options.properties.names.indexOf(name);
        
        if (index < 0) {
            console.log('Property ' + name + ' not found!');
            return this;
        }
        
        var method = this.options.properties.methods[index];
        
        if (arguments.length > 1) {
            var methodArgs = [];
            
            for(var i = 1; i < arguments.length; i++) {
                methodArgs.push(arguments[i]);
            }
            
            method.apply(this, methodArgs); 
            return this;
            
        } else {
            return method.call(this); 
        }
    },
     
    // check if two class is equal
    equal: function() {
        if (arguments[1]) {
            return arguments[0].constructor.prototype == arguments[1].constructor.prototype;
        }
        else {
            return this.constructor.prototype == arguments[0].constructor.prototype;
        }
    },
    
    // create fresh clone object from class object
    clone: function() {
        function handle() {
            try {
                this.initialize.apply(this, arguments);
            } catch (ex) { }
        }
        if (arguments[0] == true) {
            jQuery.extend(handle.prototype, this.constructor.prototype);
            return handle;
        }
        else {
            jQuery.extend(handle.constructor.prototype, this.constructor.prototype);
            return handle;
        }
    },
    
    toString: function() {
        return 'Class';
    },
    
    // this method use for call base initialize method
    base: function() {
        var method = arguments[0],
            args = arguments[1],
            superClass = this.options.superClass,
            index = -1;
        for (var i = 0; i < superClass.length; i++) {
            if (superClass[i] == method)
                index = i;
        }
        if (index == -1 && superClass[superClass.length - 1] != method) {
            superClass[superClass.length - 1].apply(this, args);
        }
        else {
            superClass[index - 1].apply(this, args);
        }
    }
});
