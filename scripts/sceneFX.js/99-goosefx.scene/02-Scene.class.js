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
    
// class Scene
goosefx.scene.Scene = jQuery.Class.create(goosefx.scene.SceneNode, {
    initialize: function(id) {
        this.base(arguments.callee, []);
        
        this._loaded    = false;
        this._visible   = false;
        this._width     = 960;
        this._height    = 640;
        this._id        = id;
        this._container = jQuery(id);
    },
    
    width: function() {
        if (arguments.length == 1) {
            this._width = parseInt(arguments[0]);
            return this;
        }
        return this._width;
    },
    
    height: function() {
        if (arguments.length == 1) {
            this._height = parseInt(arguments[0]);
            return this;
        }
        return this._height;
    },
    
    load: function(url) {
        var me = this;
        
        this._container.queue(function() {
            if (me._loaded) {
                me._canvas.detach();
                me._canvas = null;
                me._context = null;
                
                me.clear();
                
                me._loaded = false;
                me._visible = false;
                
                console.log(me._container);
            }
            
            console.log('Scene: try loading...');
            jQuery.ajax({
                type: "GET",
                url: url,
                dataType: "xml",
                success: function(data){
                    console.log('Scene: loaded');
                    goosefx.scene.Scene.no++;
                    
                    me._canvas = jQuery('<canvas id="' + me._id + '-' + goosefx.scene.Scene.no + '-canvas" style="position: absolute; top: 0; left: 0;" width="' + me._width + '" height="' + me._height + '"></canvas>');
                    me._canvas.hide();
                    me._container.append(me._canvas);
                    
                    goosefx.scene.SceneNode.loadFromXml(me, data.documentElement);
                    
                    me._loaded = true;
                    me._container.dequeue();
                },
                error: function(request, status, error) {
                    console.log('Scene: load failed');
                    me._loaded = true;
                    me._container.html('Failed to load scene "' + me._id + '" from url "' + me._src + '"!');
                    me._container.dequeue();
                }
            }); 
        });
        return this;
    },
    
    show: function() {
        var me = this;
            
        this._container.queue(function() {
            if (!me._visible) {
                console.log('Scene: visible');
                
                me._context = me._canvas.get(0).getContext('2d');
                me.render(me._context, 0); 
                
                me._canvas.show();
                me._visible = true;
                
                console.log('scene:', me);
            }
            
            me._container.dequeue();
        });

        return this;
    },
    
    hide: function() {
        if (this._visible) {
            this._canvas.hide();
            this._visible = false;
        }
        
        return this;
    },
    
    toString: function() {
        return 'goosefx.scene.Scene';
    }},{
    properties: ['width', 'height']
});

goosefx.scene.Scene.no = 0;
