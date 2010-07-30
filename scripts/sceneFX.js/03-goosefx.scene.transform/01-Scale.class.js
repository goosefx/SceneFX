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
// class Scale
goosefx.scene.transform.Scale = jQuery.Class.create({
    
    initialize: function() {
        if (arguments.length == 0) {
            this._x = 1.0;
            this._y = 1.0;
        } else {
            this.set.apply(this, arguments);
        }
    },
    
    set: function() {
        if (arguments.length == 1) {
            var type = typeof arguments[0];
            if ( type == 'string') {
                var tmp = arguments[0].trim();
                if (tmp.length == 0) {
                    this._x = 1.0;
                    this._y = 1.0;
                } else {  
                    tmp = tmp.split(' ');
                    
                    if (tmp.length == 2) {
                        this._x = parseFloat(tmp[0]);
                        this._y = parseFloat(tmp[1]);
                    } else {
                        this._x = parseFloat(tmp[0]);
                        this._y = parseFloat(tmp[0]);
                    }
                }
            } else if (type == 'object') {
                if (arguments[0]) {
                    this._x = arguments[0].x;
                    this._y = arguments[0].y;
                } else {
                    this._x = 1.0;
                    this._y = 1.0;
                }
            } else {
                this._x = parseFloat(arguments[0]);
                this._y = parseFloat(arguments[0]);
            }
        } else if (arguments.length > 1) {
            this._x = parseFloat(arguments[0]);
            this._y = parseFloat(arguments[1]);
        }
        
        return this;
    },
    
    get: function() {
        return {x: this._x, y: this._x};
    },
        
    apply: function(ctx) {
        ctx.scale(this._x, this._y);
    },
    
    toString: function() {
        return 'goosefx.scene.transform.Scale({x: ' + this._x + ', y: ' + this._y + '})';
    }
});
