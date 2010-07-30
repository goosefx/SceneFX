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

// class Rectangle
goosefx.scene.Rectangle = jQuery.Class.create(goosefx.scene.SceneNode, {
    
    initialize: function() {
        this.base(arguments.callee, arguments);
        
        this._x = 0;
        this._y = 0;
        this._width = 0;
        this._height = 0;
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
    
    width: function() {
        if (arguments.length == 1) {
            this._width = parseFloat(arguments[0]);
            return this;
        }
        
        return this._width;
    },
    
    height: function() {
        if (arguments.length == 1) {
            this._height = parseFloat(arguments[0]);
            return this;
        }
        
        return this._height;
    },
    
    onRender: function(ctx) {
        if ((this._width < 1) || (this._height < 1)) {
            return;
        }
        
        ctx.fillRect(this._x, this._y, this._width, this._height);
        ctx.strokeRect(this._x, this._y, this._width, this._height);
    },
    
    toString: function() {
        return 'goosefx.scene.Style';
    }},{
    properties: ['x', 'y', 'width', 'height']
});
