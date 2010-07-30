/*********************************************************************
 * sceneFX - Canvas Scene Graph                                      *
 *                                                                   *
 * Copyright (C) 2010 Marcus Wilhelm                                 *
 *                                                                   *
 * Permission is hereby granted, free of charge, to any person       *
 * obtaining a copy of this software and associated documentation    *
 * files (the "Software"), to deal in the Software without           *
 * restriction, including without limitation the rights to use,      *
 * copy, modify, merge, publish, distribute, sublicense, and/or sell *
 * copies of the Software, and to permit persons to whom the         *
 * Software is furnished to do so, subject to the following          *
 * conditions:                                                       *
 *                                                                   *
 * The above copyright notice and this permission notice shall be    *
 * included in all copies or substantial portions of the Software.   *
 *                                                                   *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,   * 
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES   *
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND          *
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT       *
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,      *
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING      *
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR     *
 * OTHER DEALINGS IN THE SOFTWARE.                                   *
 *********************************************************************/

// class Transform
goosefx.scene.transform.Transform = jQuery.Class.create({
    
    initialize: function() {
        this._items = {};
        
        if (arguments.length > 0) {
            this.set.apply(this, arguments);    
        }
    },
    
    get: function() {
        var args = {};
        
        for(var transformName in this._items) {
            var name = transformName.substr(0, 1).toLowerCase() +
                       transformName.substr(1);
            args[name] = this._items[transformName].get();
        }
        return args;
    },
    
    set: function() {
        if (arguments.length > 0) {
            this._items = {};
            
            var type = typeof arguments[0];
            
            if ( type == 'string') {
                var tmp = jQuery.trim(arguments[0]);
                if (tmp.length > 0) {
                    var args = arguments[0].split(';');
                    for(var i = 0; i < args.length; i++) {
                        var tmp = args[i].split(':');
                        if (tmp.length == 2) {
                            var name = jQuery.trim(tmp[0]);
                            var value = jQuery.trim(tmp[1]);
                            if (this[name]) this[name].call(this, value);
                        }
                    }
                }
            } else {
                var args = arguments[0];
                for(var name in args) {
                    this[name].call(this, args[name]);
                }
            }
        }
        return this;
    },
    
    translate: function() {
        return this.__call('Translate', arguments);
    },
    
    rotate: function() {
        return this.__call('Rotate', arguments);
    },
    
    scale: function() {
        return this.__call('Scale', arguments);
    },
    
    __call: function(transformName, args) {
        if (args.length > 0) {
            if ((args[0] == null) || (args[0] == 'inherit')) {
                if (this._items[transformName]) {
                    this._items[transformName] = null;
                }
            } else {
                if (!this._items[transformName]) {
                    this._items[transformName] = eval('new goosefx.scene.transform.' + transformName + '()');
                }
                this._items[transformName].set.apply(this._items[transformName], args);
                return this;
            }
        } else if (this._items[transformName]) {
            return this._items[transformName].get();
        }
        return null;
    },
    
    apply: function(ctx) {
        for(var transformName in this._items) {
            this._items[transformName].apply(ctx);
        }
    },
    
    toString: function() {
        return 'goosefx.scene.Transform';
    }},{
    properties: ['translate', 'rotate', 'scale']
});

