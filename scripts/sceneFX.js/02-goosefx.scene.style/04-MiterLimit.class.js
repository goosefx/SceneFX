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

// class MiterLimit
goosefx.scene.style.MiterLimit = jQuery.Class.create({
    initialize: function() {
        if (arguments.length == 0) {
            this._v = 10.0;
        } else {
            this.set.apply(this, arguments);
        }
    },
    
    set: function() {
        var type = typeof arguments[0];
        if ( type == 'string') {
            var tmp = jQuery.trim(arguments[0]);
            if (tmp.length == 0) {
                this._v = 10.0;
            } else {  
                this._v = parseFloat(tmp);
            }
        } else {
            this._v = parseFloat(arguments[0]);
        }
        return this;
    },
    
    get: function() {
        return this._v;
    },
        
    apply: function(ctx) {
        ctx.lineJoin = this._v;
    },
    
    toString: function() {
        return 'goosefx.scene.style.MiterLimit';
    }
});
