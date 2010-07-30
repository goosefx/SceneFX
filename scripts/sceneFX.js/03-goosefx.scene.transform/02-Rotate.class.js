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
// class transform.Rotate
goosefx.scene.transform.Rotate = jQuery.Class.create({
    
    initialize: function() {
        if (arguments.length == 0) {
            this._r = 0.0;
        } else {
            this.set.apply(this, arguments);
        }
    },
    
    set: function() {
        if (arguments.length == 1) {
            
            var type = typeof arguments[0];
            
            if ( type == 'string') {
                var tmp = jQuery.trim(arguments[0]);
                if (tmp.length == 0) {
                    this._r = 0.0;
                } else if (tmp.charAt(tmp.length-1) == '°') {  
                    this._r = parseFloat(tmp.substring(0, tmp.length-1)) * Math.PI / 180;
                } else {  
                    this._r = parseFloat(tmp);
                }
            } else {
                this._r = parseFloat(arguments[0]);
            }
        }
        
        return this;
    },
    
    get: function() {
        return this._r;
    },
        
    apply: function(ctx) {
        ctx.rotate(this._r);
    },
    
    toString: function() {
        return 'goosefx.scene.transform.Rotate(' + this._r + ')';
    }
});
