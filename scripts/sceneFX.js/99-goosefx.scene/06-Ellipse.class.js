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

// class Ellipse
goosefx.scene.Ellipse = jQuery.Class.create(goosefx.scene.SceneNode, {
    
    initialize: function() {
        this.base(arguments.callee, arguments);
        
        this._x = 0;
        this._y = 0;
        this._radius_x = 0;
        this._radius_y = 0;
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
    
    radiusX: function() {
        if (arguments.length == 1) {
            this._radius_x = parseFloat(arguments[0]);
            return this;
        }
        
        return this._radius_x;
    },
    
    radiusY: function() {
        if (arguments.length == 1) {
            this._radius_y = parseFloat(arguments[0]);
            return this;
        }
        
        return this._radius_y;
    },
    
    radius: function() {
        if (arguments.length == 1) {
            var type = typeof arguments[0];
            if ( type == 'string') {
                var tmp = arguments[0].trim();
                if (tmp.length == 0) {
                    this._radius_x = 1.0;
                    this._radius_y = 1.0;
                } else {  
                    tmp = tmp.split(' ');
                    
                    if (tmp.length == 2) {
                        this._radius_x = parseFloat(tmp[0]);
                        this._radius_y = parseFloat(tmp[1]);
                    } else {
                        this._radius_x = parseFloat(tmp[0]);
                        this._radius_y = parseFloat(tmp[0]);
                    }
                }
            } else if (type == 'object') {
                if (arguments[0]) {
                    this._radius_x = arguments[0].x;
                    this._radius_y = arguments[0].y;
                } else {
                    this._radius_x = 0.0;
                    this.radius_y = 0.0;
                }
            } else {
                this._radius_x = parseFloat(arguments[0]);
                this._radius_y = parseFloat(arguments[0]);
            }
            return this;
        } 
        else if (arguments.length > 1) {
            this._radius_x = parseFloat(arguments[0]);
            this._radius_y = parseFloat(arguments[1]);
            
            return this;
        }
        
        return {x: this._radius_x, y: this._radius_y};
    },
    
    onRender: function(ctx) {
        if (this._radius_x <= 0) return;
        if (this._radius_y <= 0) return;
        
        ctx.beginPath();
        
        if (this._radius_x == this._radius_y) {
            ctx.arc(this._x, this._y, this._radius, 0, Math.PI*2);
        } else {
            var KAPPA = 4 * ((Math.sqrt(2) -1) / 3);
            
            var rx = this._radius_x,
                ry = this._radius_y,
                cx = this._x,
                cy = this._y;
            
            ctx.moveTo(cx, cy - ry);
            ctx.bezierCurveTo(cx + (KAPPA * rx), cy - ry,  cx + rx, cy - (KAPPA * ry), cx + rx, cy);
            ctx.bezierCurveTo(cx + rx, cy + (KAPPA * ry), cx + (KAPPA * rx), cy + ry, cx, cy + ry);
            ctx.bezierCurveTo(cx - (KAPPA * rx), cy + ry, cx - rx, cy + (KAPPA * ry), cx - rx, cy);
            ctx.bezierCurveTo(cx - rx, cy - (KAPPA * ry), cx - (KAPPA * rx), cy - ry, cx, cy - ry);
        }
        
        ctx.closePath();
        
        ctx.fill();
        ctx.stroke(); 
    },
    
    toString: function() {
        return 'goosefx.scene.Circle';
    }},{
    properties: ['x', 'y', 'radius', 'radiusX', 'radiusY']
});
