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
jQuery.namespace('goosefx.scene.style');

// class Style
goosefx.scene.style.Style = jQuery.Class.create({
    initialize: function() {
        this._items = [];
    },
    
    get: function() {
        var args = {};
        
        for(var styleName in this._items) {
            var name = styleName.substr(0, 1).toLowerCase() +
                       styleName.substr(1);
            args[name] = this._items[styleName].get();
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
    
    lineWidth: function() {
        return this.__call('LineWidth', arguments);
    },
    
    lineCap: function() {
        return this.__call('LineCap', arguments);
    },
    
    lineJoin: function() {
        return this.__call('LineJoin', arguments);
    },
    
    miterLimit: function() {
        return this.__call('MiterLimit', arguments);
    },
    
    strokeStyle: function() {
        return this.__call('StrokeStyle', arguments);
    },
    
    fillStyle: function() {
        return this.__call('FillStyle', arguments);
    },
    
    globalAlpha: function() {
        return this.__call('GlobalAlpha', arguments);
    },
    
    __call: function(styleName, args) {
        if (args.length > 0) {
            if ((args[0] == null) || (args[0] == 'inherit')) {
                if (this._items[styleName]) {
                    this._items[styleName] = null;
                }
            } else {
                if (!this._items[styleName]) {
                    this._items[styleName] = eval('new goosefx.scene.style.' + styleName + '()');
                }
                this._items[styleName].set.apply(this._items[styleName], args);
                return this;
            }
        } else if (this._items[styleName]) {
            return this._items[styleName].get();
        }
        return null;
    },
    
    apply: function(ctx) {
        for(var styleName in this._items) {
            this._items[styleName].apply(ctx);
        }
    },
    
    toString: function() {
        return 'goosefx.scene.style.Style';
    }},{
    properties: ['lineWidth', 'lineCap', 'lineJoin', 'miterLimit', 'strokeStyle', 'fillStyle', 'globalAlpha']
});
