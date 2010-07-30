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

// class Circle
goosefx.scene.Circle = jQuery.Class.create(goosefx.scene.SceneNode, {
    
    initialize: function() {
        this.base(arguments.callee, arguments);
        
        this._x = 0;
        this._y = 0;
        this._radius = 0;
    },
    
    x: function() {
        if (arguments.length == 1) {
            this._x = parseFloat(arguments[0]);
            return this;
        }
        
        return this._x;
    },
    
    y: function() {
        if (arguments.length == 1) {
            this._y = parseFloat(arguments[0]);
            return this;
        }
        
        return this._y;
    },
    
    radius: function() {
        if (arguments.length == 1) {
            var s = parseFloat(arguments[0]);
            this._radius = s;
            
            return this;
        }
        
        return this._radius;
    },
    
    onRender: function(ctx) {
        if (this._radius <= 0) return;
        
        ctx.beginPath();
        ctx.arc(this._x, this._y, this._radius, 0, Math.PI*2);
        ctx.closePath();
        
        ctx.fill();
        ctx.stroke(); 
    },
    
    toString: function() {
        return 'goosefx.scene.Circle';
    }},{
    properties: ['x', 'y', 'radius']
});
