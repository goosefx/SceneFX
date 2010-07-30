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

// class Style
goosefx.scene.Style = jQuery.Class.create(goosefx.scene.SceneNode, {
    
    initialize: function() {
        this.base(arguments.callee, arguments);
        
        this._style = new goosefx.scene.style.Style();
    },
    
    lineWidth: function() {
        return this._style.lineWidth.apply(this._style, arguments);
    },
    
    lineCap: function() {
        return this._style.lineCap.apply(this._style, arguments);
    },
    
    lineJoin: function() {
        return this._style.lineJoin.apply(this._style, arguments);
    },
    
    miterLimit: function() {
        return this._style.miterLimit.apply(this._style, arguments);
    },
    
    strokeStyle: function() {
        return this._style.strokeStyle.apply(this._style, arguments);
    },
    
    fillStyle: function() {
        return this._style.fillStyle.apply(this._style, arguments);
    },
    
    globalAlpha: function() {
        return this._style.globalAlpha.apply(this._style, arguments);
    },
    
    onTransform: function(ctx) {
    },
    
    toString: function() {
        return 'goosefx.scene.Style';
    }},{
    properties: ['lineWidth', 'lineCap', 'lineJoin', 'miterLimit', 'strokeStyle', 'fillStyle', 'globalAlpha']
});
