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

// class SceneNode 
goosefx.scene.SceneNode = jQuery.Class.create({
    
    initialize: function() {
        this._nodes = [];
    },
    
    parentNode: function() {
        if (arguments.length == 1) {
            this._parentNode = arguments[0];
            return this;
        }
        
        return this._parentNode;
    },
    
    id: function() {
        if (arguments.length == 1) {
            this._id = arguments[0];
            // TODO: register node
            return this;
        }
        return this._id;
    },
    
    name: function() {
        if (arguments.length == 1) {
            this._name = arguments[0];
            return this;
        }
        return this._name;
    },
    
    style: function() {
        if (arguments.length == 1) {
            if (arguments[0] == null) {
                this._style = null; 
            } else {
                if (!this._style) this._style = new goosefx.scene.style.Style();
                this._style.set.apply(this._style, arguments);
            }
            return this;
        }
        return this._style ? this._style.get() : null;
    },
    
    transform: function() {
        if (arguments.length == 1) {
            if (arguments[0] == null) {
                this._transform = null; 
            } else {
                if (!this._transform) this._transform = new goosefx.scene.transform.Transform();
                this._transform.set.apply(this._transform, arguments);
            }
            return this;
        }
        return this._transform ? this._transform.get() : null;
    },
    
    addChildNode: function(node) {
        this._nodes.push(node);
        node._parent = this;
        
        if (node.name()) {
            eval('this.__x_' + node.name() + ' = node');
        }
        return this;
    },
    
    childNode: function(name) {
        return eval('this.__x_' + name);
    },
    
    onUpdate: function(elapsed) {
    },
    
    onBeforeRender: function(ctx) {
    },
    
    onStyle: function(ctx) {
        if (this._style) this._style.apply(ctx);
    },
    
    onTransform: function(ctx) {
        if (this._transform) this._transform.apply(ctx);
    },
    
    onRender: function(ctx) {
    },
    
    onAfterRender: function(ctx) {
    },
    
    clear: function() {
        this._nodes = [];
    },
    
    render: function(ctx, elapsed) {
        this.onUpdate(elapsed);
        
        ctx.save();
        
        this.onBeforeRender(ctx);
        this.onStyle(ctx);
        this.onTransform(ctx);
        this.onRender(ctx);
        
        jQuery.each(this._nodes, function(i, node) {
            node.render(ctx, elapsed);
        });
        
        this.onAfterRender(ctx);
        
        ctx.restore();
    },
    
    toString: function() {
        return 'goosefx.scene.SceneNode';
    }},{
    abstract: true,
    properties: ['id', 'name', 'style', 'transform']
});

// function SceneNode.loadFromXml
goosefx.scene.SceneNode.loadFromXml = function(sceneNode, xmlNode) {
    
    jQuery.each(xmlNode.attributes, function(i, xmlAttribute) {
        sceneNode.property(xmlAttribute.localName, xmlAttribute.value);
    });
    
    jQuery.each(xmlNode.childNodes, function(i, xmlChildNode) {
        if (xmlChildNode.nodeType == 1) {
            var type = xmlChildNode.namespaceURI + '.' + this.localName;
            try {
                var sceneChildNode = eval('new ' + type + '()');
                goosefx.scene.SceneNode.loadFromXml(sceneChildNode, xmlChildNode);
                sceneNode.addChildNode(sceneChildNode);
                
            } catch(ex) {
                console.log('class', type, 'not found');
            }           
        }
    });
};
