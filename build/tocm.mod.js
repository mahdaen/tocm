/**
TOCM - TOCL CSS MAGIC
v.1.1
© 2013 Siriussoft Corporation.
Developed bay Nanang - mahdaen@hotmail.com

Tocl CSS Magic is a CSS class generator. With Tocl CSS Magic you can create and manage CSS class easily.
Tocl CSS Magic allow you to create new class, add property, remove property or change property value without
writing or editing the css file. All css script is created on the fly. You doesn't need to have css file anymore.
-----------------------------------------------------------------------------------------------------------------
**/

/*jshint -W065 */
/*jshint strict:true*/
/*jshint boss:true*/
/*jshint undef:false*/
/* Zepto v1.0-1-ga3cab6c - polyfill zepto detect event ajax form fx - zeptojs.com/license */


;(function(undefined){
  if (String.prototype.trim === undefined) // fix for iOS 3.2
    String.prototype.trim = function(){ return this.replace(/^\s+|\s+$/g, '') }

  // For iOS 3.x
  // from https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/reduce
  if (Array.prototype.reduce === undefined)
    Array.prototype.reduce = function(fun){
      if(this === void 0 || this === null) throw new TypeError()
      var t = Object(this), len = t.length >>> 0, k = 0, accumulator
      if(typeof fun != 'function') throw new TypeError()
      if(len == 0 && arguments.length == 1) throw new TypeError()

      if(arguments.length >= 2)
       accumulator = arguments[1]
      else
        do{
          if(k in t){
            accumulator = t[k++]
            break
          }
          if(++k >= len) throw new TypeError()
        } while (true)

      while (k < len){
        if(k in t) accumulator = fun.call(undefined, accumulator, t[k], k, t)
        k++
      }
      return accumulator
    }

})()

var Zepto = (function() {
  var undefined, key, $, classList, emptyArray = [], slice = emptyArray.slice, filter = emptyArray.filter,
    document = window.document,
    elementDisplay = {}, classCache = {},
    getComputedStyle = document.defaultView.getComputedStyle,
    cssNumber = { 'column-count': 1, 'columns': 1, 'font-weight': 1, 'line-height': 1,'opacity': 1, 'z-index': 1, 'zoom': 1 },
    fragmentRE = /^\s*<(\w+|!)[^>]*>/,
    tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
    rootNodeRE = /^(?:body|html)$/i,

    // special attributes that should be get/set via method calls
    methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],

    adjacencyOperators = [ 'after', 'prepend', 'before', 'append' ],
    table = document.createElement('table'),
    tableRow = document.createElement('tr'),
    containers = {
      'tr': document.createElement('tbody'),
      'tbody': table, 'thead': table, 'tfoot': table,
      'td': tableRow, 'th': tableRow,
      '*': document.createElement('div')
    },
    readyRE = /complete|loaded|interactive/,
    classSelectorRE = /^\.([\w-]+)$/,
    idSelectorRE = /^#([\w-]*)$/,
    tagSelectorRE = /^[\w-]+$/,
    class2type = {},
    toString = class2type.toString,
    zepto = {},
    camelize, uniq,
    tempParent = document.createElement('div')

  zepto.matches = function(element, selector) {
    if (!element || element.nodeType !== 1) return false
    var matchesSelector = element.webkitMatchesSelector || element.mozMatchesSelector ||
                          element.oMatchesSelector || element.matchesSelector
    if (matchesSelector) return matchesSelector.call(element, selector)
    // fall back to performing a selector:
    var match, parent = element.parentNode, temp = !parent
    if (temp) (parent = tempParent).appendChild(element)
    match = ~zepto.qsa(parent, selector).indexOf(element)
    temp && tempParent.removeChild(element)
    return match
  }

  function type(obj) {
    return obj == null ? String(obj) :
      class2type[toString.call(obj)] || "object"
  }

  function isFunction(value) { return type(value) == "function" }
  function isWindow(obj)     { return obj != null && obj == obj.window }
  function isDocument(obj)   { return obj != null && obj.nodeType == obj.DOCUMENT_NODE }
  function isObject(obj)     { return type(obj) == "object" }
  function isPlainObject(obj) {
    return isObject(obj) && !isWindow(obj) && obj.__proto__ == Object.prototype
  }
  function isArray(value) { return value instanceof Array }
  function likeArray(obj) { return typeof obj.length == 'number' }

  function compact(array) { return filter.call(array, function(item){ return item != null }) }
  function flatten(array) { return array.length > 0 ? $.fn.concat.apply([], array) : array }
  camelize = function(str){ return str.replace(/-+(.)?/g, function(match, chr){ return chr ? chr.toUpperCase() : '' }) }
  function dasherize(str) {
    return str.replace(/::/g, '/')
           .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
           .replace(/([a-z\d])([A-Z])/g, '$1_$2')
           .replace(/_/g, '-')
           .toLowerCase()
  }
  uniq = function(array){ return filter.call(array, function(item, idx){ return array.indexOf(item) == idx }) }

  function classRE(name) {
    return name in classCache ?
      classCache[name] : (classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)'))
  }

  function maybeAddPx(name, value) {
    return (typeof value == "number" && !cssNumber[dasherize(name)]) ? value + "px" : value
  }

  function defaultDisplay(nodeName) {
    var element, display
    if (!elementDisplay[nodeName]) {
      element = document.createElement(nodeName)
      document.body.appendChild(element)
      display = getComputedStyle(element, '').getPropertyValue("display")
      element.parentNode.removeChild(element)
      display == "none" && (display = "block")
      elementDisplay[nodeName] = display
    }
    return elementDisplay[nodeName]
  }

  function children(element) {
    return 'children' in element ?
      slice.call(element.children) :
      $.map(element.childNodes, function(node){ if (node.nodeType == 1) return node })
  }

  // `$.zepto.fragment` takes a html string and an optional tag name
  // to generate DOM nodes nodes from the given html string.
  // The generated DOM nodes are returned as an array.
  // This function can be overriden in plugins for example to make
  // it compatible with browsers that don't support the DOM fully.
  zepto.fragment = function(html, name, properties) {
    if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>")
    if (name === undefined) name = fragmentRE.test(html) && RegExp.$1
    if (!(name in containers)) name = '*'

    var nodes, dom, container = containers[name]
    container.innerHTML = '' + html
    dom = $.each(slice.call(container.childNodes), function(){
      container.removeChild(this)
    })
    if (isPlainObject(properties)) {
      nodes = $(dom)
      $.each(properties, function(key, value) {
        if (methodAttributes.indexOf(key) > -1) nodes[key](value)
        else nodes.attr(key, value)
      })
    }
    return dom
  }

  // `$.zepto.Z` swaps out the prototype of the given `dom` array
  // of nodes with `$.fn` and thus supplying all the Zepto functions
  // to the array. Note that `__proto__` is not supported on Internet
  // Explorer. This method can be overriden in plugins.
  zepto.Z = function(dom, selector) {
    dom = dom || []
    dom.__proto__ = $.fn
    dom.selector = selector || ''
    return dom
  }

  // `$.zepto.isZ` should return `true` if the given object is a Zepto
  // collection. This method can be overriden in plugins.
  zepto.isZ = function(object) {
    return object instanceof zepto.Z
  }

  // `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and
  // takes a CSS selector and an optional context (and handles various
  // special cases).
  // This method can be overriden in plugins.
  zepto.init = function(selector, context) {
    // If nothing given, return an empty Zepto collection
    if (!selector) return zepto.Z()
    // If a function is given, call it when the DOM is ready
    else if (isFunction(selector)) return $(document).ready(selector)
    // If a Zepto collection is given, juts return it
    else if (zepto.isZ(selector)) return selector
    else {
      var dom
      // normalize array if an array of nodes is given
      if (isArray(selector)) dom = compact(selector)
      // Wrap DOM nodes. If a plain object is given, duplicate it.
      else if (isObject(selector))
        dom = [isPlainObject(selector) ? $.extend({}, selector) : selector], selector = null
      // If it's a html fragment, create nodes from it
      else if (fragmentRE.test(selector))
        dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null
      // If there's a context, create a collection on that context first, and select
      // nodes from there
      else if (context !== undefined) return $(context).find(selector)
      // And last but no least, if it's a CSS selector, use it to select nodes.
      else dom = zepto.qsa(document, selector)
      // create a new Zepto collection from the nodes found
      return zepto.Z(dom, selector)
    }
  }

  // `$` will be the base `Zepto` object. When calling this
  // function just call `$.zepto.init, which makes the implementation
  // details of selecting nodes and creating Zepto collections
  // patchable in plugins.
  $ = function(selector, context){
    return zepto.init(selector, context)
  }

  function extend(target, source, deep) {
    for (key in source)
      if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
        if (isPlainObject(source[key]) && !isPlainObject(target[key]))
          target[key] = {}
        if (isArray(source[key]) && !isArray(target[key]))
          target[key] = []
        extend(target[key], source[key], deep)
      }
      else if (source[key] !== undefined) target[key] = source[key]
  }

  // Copy all but undefined properties from one or more
  // objects to the `target` object.
  $.extend = function(target){
    var deep, args = slice.call(arguments, 1)
    if (typeof target == 'boolean') {
      deep = target
      target = args.shift()
    }
    args.forEach(function(arg){ extend(target, arg, deep) })
    return target
  }

  // `$.zepto.qsa` is Zepto's CSS selector implementation which
  // uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.
  // This method can be overriden in plugins.
  zepto.qsa = function(element, selector){
    var found
    return (isDocument(element) && idSelectorRE.test(selector)) ?
      ( (found = element.getElementById(RegExp.$1)) ? [found] : [] ) :
      (element.nodeType !== 1 && element.nodeType !== 9) ? [] :
      slice.call(
        classSelectorRE.test(selector) ? element.getElementsByClassName(RegExp.$1) :
        tagSelectorRE.test(selector) ? element.getElementsByTagName(selector) :
        element.querySelectorAll(selector)
      )
  }

  function filtered(nodes, selector) {
    return selector === undefined ? $(nodes) : $(nodes).filter(selector)
  }

  $.contains = function(parent, node) {
    return parent !== node && parent.contains(node)
  }

  function funcArg(context, arg, idx, payload) {
    return isFunction(arg) ? arg.call(context, idx, payload) : arg
  }

  function setAttribute(node, name, value) {
    value == null ? node.removeAttribute(name) : node.setAttribute(name, value)
  }

  // access className property while respecting SVGAnimatedString
  function className(node, value){
    var klass = node.className,
        svg   = klass && klass.baseVal !== undefined

    if (value === undefined) return svg ? klass.baseVal : klass
    svg ? (klass.baseVal = value) : (node.className = value)
  }

  // "true"  => true
  // "false" => false
  // "null"  => null
  // "42"    => 42
  // "42.5"  => 42.5
  // JSON    => parse if valid
  // String  => self
  function deserializeValue(value) {
    var num
    try {
      return value ?
        value == "true" ||
        ( value == "false" ? false :
          value == "null" ? null :
          !isNaN(num = Number(value)) ? num :
          /^[\[\{]/.test(value) ? $.parseJSON(value) :
          value )
        : value
    } catch(e) {
      return value
    }
  }

  $.type = type
  $.isFunction = isFunction
  $.isWindow = isWindow
  $.isArray = isArray
  $.isPlainObject = isPlainObject

  $.isEmptyObject = function(obj) {
    var name
    for (name in obj) return false
    return true
  }

  $.inArray = function(elem, array, i){
    return emptyArray.indexOf.call(array, elem, i)
  }

  $.camelCase = camelize
  $.trim = function(str) { return str.trim() }

  // plugin compatibility
  $.uuid = 0
  $.support = { }
  $.expr = { }

  $.map = function(elements, callback){
    var value, values = [], i, key
    if (likeArray(elements))
      for (i = 0; i < elements.length; i++) {
        value = callback(elements[i], i)
        if (value != null) values.push(value)
      }
    else
      for (key in elements) {
        value = callback(elements[key], key)
        if (value != null) values.push(value)
      }
    return flatten(values)
  }

  $.each = function(elements, callback){
    var i, key
    if (likeArray(elements)) {
      for (i = 0; i < elements.length; i++)
        if (callback.call(elements[i], i, elements[i]) === false) return elements
    } else {
      for (key in elements)
        if (callback.call(elements[key], key, elements[key]) === false) return elements
    }

    return elements
  }

  $.grep = function(elements, callback){
    return filter.call(elements, callback)
  }

  if (window.JSON) $.parseJSON = JSON.parse

  // Populate the class2type map
  $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
    class2type[ "[object " + name + "]" ] = name.toLowerCase()
  })

  // Define methods that will be available on all
  // Zepto collections
  $.fn = {
    // Because a collection acts like an array
    // copy over these useful array functions.
    forEach: emptyArray.forEach,
    reduce: emptyArray.reduce,
    push: emptyArray.push,
    sort: emptyArray.sort,
    indexOf: emptyArray.indexOf,
    concat: emptyArray.concat,

    // `map` and `slice` in the jQuery API work differently
    // from their array counterparts
    map: function(fn){
      return $($.map(this, function(el, i){ return fn.call(el, i, el) }))
    },
    slice: function(){
      return $(slice.apply(this, arguments))
    },

    ready: function(callback){
      if (readyRE.test(document.readyState)) callback($)
      else document.addEventListener('DOMContentLoaded', function(){ callback($) }, false)
      return this
    },
    get: function(idx){
      return idx === undefined ? slice.call(this) : this[idx >= 0 ? idx : idx + this.length]
    },
    toArray: function(){ return this.get() },
    size: function(){
      return this.length
    },
    remove: function(){
      return this.each(function(){
        if (this.parentNode != null)
          this.parentNode.removeChild(this)
      })
    },
    each: function(callback){
      emptyArray.every.call(this, function(el, idx){
        return callback.call(el, idx, el) !== false
      })
      return this
    },
    filter: function(selector){
      if (isFunction(selector)) return this.not(this.not(selector))
      return $(filter.call(this, function(element){
        return zepto.matches(element, selector)
      }))
    },
    add: function(selector,context){
      return $(uniq(this.concat($(selector,context))))
    },
    is: function(selector){
      return this.length > 0 && zepto.matches(this[0], selector)
    },
    not: function(selector){
      var nodes=[]
      if (isFunction(selector) && selector.call !== undefined)
        this.each(function(idx){
          if (!selector.call(this,idx)) nodes.push(this)
        })
      else {
        var excludes = typeof selector == 'string' ? this.filter(selector) :
          (likeArray(selector) && isFunction(selector.item)) ? slice.call(selector) : $(selector)
        this.forEach(function(el){
          if (excludes.indexOf(el) < 0) nodes.push(el)
        })
      }
      return $(nodes)
    },
    has: function(selector){
      return this.filter(function(){
        return isObject(selector) ?
          $.contains(this, selector) :
          $(this).find(selector).size()
      })
    },
    eq: function(idx){
      return idx === -1 ? this.slice(idx) : this.slice(idx, + idx + 1)
    },
    first: function(){
      var el = this[0]
      return el && !isObject(el) ? el : $(el)
    },
    last: function(){
      var el = this[this.length - 1]
      return el && !isObject(el) ? el : $(el)
    },
    find: function(selector){
      var result, $this = this
      if (typeof selector == 'object')
        result = $(selector).filter(function(){
          var node = this
          return emptyArray.some.call($this, function(parent){
            return $.contains(parent, node)
          })
        })
      else if (this.length == 1) result = $(zepto.qsa(this[0], selector))
      else result = this.map(function(){ return zepto.qsa(this, selector) })
      return result
    },
    closest: function(selector, context){
      var node = this[0], collection = false
      if (typeof selector == 'object') collection = $(selector)
      while (node && !(collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector)))
        node = node !== context && !isDocument(node) && node.parentNode
      return $(node)
    },
    parents: function(selector){
      var ancestors = [], nodes = this
      while (nodes.length > 0)
        nodes = $.map(nodes, function(node){
          if ((node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0) {
            ancestors.push(node)
            return node
          }
        })
      return filtered(ancestors, selector)
    },
    parent: function(selector){
      return filtered(uniq(this.pluck('parentNode')), selector)
    },
    children: function(selector){
      return filtered(this.map(function(){ return children(this) }), selector)
    },
    contents: function() {
      return this.map(function() { return slice.call(this.childNodes) })
    },
    siblings: function(selector){
      return filtered(this.map(function(i, el){
        return filter.call(children(el.parentNode), function(child){ return child!==el })
      }), selector)
    },
    empty: function(){
      return this.each(function(){ this.innerHTML = '' })
    },
    // `pluck` is borrowed from Prototype.js
    pluck: function(property){
      return $.map(this, function(el){ return el[property] })
    },
    show: function(){
      return this.each(function(){
        this.style.display == "none" && (this.style.display = null)
        if (getComputedStyle(this, '').getPropertyValue("display") == "none")
          this.style.display = defaultDisplay(this.nodeName)
      })
    },
    replaceWith: function(newContent){
      return this.before(newContent).remove()
    },
    wrap: function(structure){
      var func = isFunction(structure)
      if (this[0] && !func)
        var dom   = $(structure).get(0),
            clone = dom.parentNode || this.length > 1

      return this.each(function(index){
        $(this).wrapAll(
          func ? structure.call(this, index) :
            clone ? dom.cloneNode(true) : dom
        )
      })
    },
    wrapAll: function(structure){
      if (this[0]) {
        $(this[0]).before(structure = $(structure))
        var children
        // drill down to the inmost element
        while ((children = structure.children()).length) structure = children.first()
        $(structure).append(this)
      }
      return this
    },
    wrapInner: function(structure){
      var func = isFunction(structure)
      return this.each(function(index){
        var self = $(this), contents = self.contents(),
            dom  = func ? structure.call(this, index) : structure
        contents.length ? contents.wrapAll(dom) : self.append(dom)
      })
    },
    unwrap: function(){
      this.parent().each(function(){
        $(this).replaceWith($(this).children())
      })
      return this
    },
    clone: function(){
      return this.map(function(){ return this.cloneNode(true) })
    },
    hide: function(){
      return this.css("display", "none")
    },
    toggle: function(setting){
      return this.each(function(){
        var el = $(this)
        ;(setting === undefined ? el.css("display") == "none" : setting) ? el.show() : el.hide()
      })
    },
    prev: function(selector){ return $(this.pluck('previousElementSibling')).filter(selector || '*') },
    next: function(selector){ return $(this.pluck('nextElementSibling')).filter(selector || '*') },
    html: function(html){
      return html === undefined ?
        (this.length > 0 ? this[0].innerHTML : null) :
        this.each(function(idx){
          var originHtml = this.innerHTML
          $(this).empty().append( funcArg(this, html, idx, originHtml) )
        })
    },
    text: function(text){
      return text === undefined ?
        (this.length > 0 ? this[0].textContent : null) :
        this.each(function(){ this.textContent = text })
    },
    attr: function(name, value){
      var result
      return (typeof name == 'string' && value === undefined) ?
        (this.length == 0 || this[0].nodeType !== 1 ? undefined :
          (name == 'value' && this[0].nodeName == 'INPUT') ? this.val() :
          (!(result = this[0].getAttribute(name)) && name in this[0]) ? this[0][name] : result
        ) :
        this.each(function(idx){
          if (this.nodeType !== 1) return
          if (isObject(name)) for (key in name) setAttribute(this, key, name[key])
          else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)))
        })
    },
    removeAttr: function(name){
      return this.each(function(){ this.nodeType === 1 && setAttribute(this, name) })
    },
    prop: function(name, value){
      return (value === undefined) ?
        (this[0] && this[0][name]) :
        this.each(function(idx){
          this[name] = funcArg(this, value, idx, this[name])
        })
    },
    data: function(name, value){
      var data = this.attr('data-' + dasherize(name), value)
      return data !== null ? deserializeValue(data) : undefined
    },
    val: function(value){
      return (value === undefined) ?
        (this[0] && (this[0].multiple ?
           $(this[0]).find('option').filter(function(o){ return this.selected }).pluck('value') :
           this[0].value)
        ) :
        this.each(function(idx){
          this.value = funcArg(this, value, idx, this.value)
        })
    },
    offset: function(coordinates){
      if (coordinates) return this.each(function(index){
        var $this = $(this),
            coords = funcArg(this, coordinates, index, $this.offset()),
            parentOffset = $this.offsetParent().offset(),
            props = {
              top:  coords.top  - parentOffset.top,
              left: coords.left - parentOffset.left
            }

        if ($this.css('position') == 'static') props['position'] = 'relative'
        $this.css(props)
      })
      if (this.length==0) return null
      var obj = this[0].getBoundingClientRect()
      return {
        left: obj.left + window.pageXOffset,
        top: obj.top + window.pageYOffset,
        width: Math.round(obj.width),
        height: Math.round(obj.height)
      }
    },
    css: function(property, value){
      if (arguments.length < 2 && typeof property == 'string')
        return this[0] && (this[0].style[camelize(property)] || getComputedStyle(this[0], '').getPropertyValue(property))

      var css = ''
      if (type(property) == 'string') {
        if (!value && value !== 0)
          this.each(function(){ this.style.removeProperty(dasherize(property)) })
        else
          css = dasherize(property) + ":" + maybeAddPx(property, value)
      } else {
        for (key in property)
          if (!property[key] && property[key] !== 0)
            this.each(function(){ this.style.removeProperty(dasherize(key)) })
          else
            css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';'
      }

      return this.each(function(){ this.style.cssText += ';' + css })
    },
    index: function(element){
      return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0])
    },
    hasClass: function(name){
      return emptyArray.some.call(this, function(el){
        return this.test(className(el))
      }, classRE(name))
    },
    addClass: function(name){
      return this.each(function(idx){
        classList = []
        var cls = className(this), newName = funcArg(this, name, idx, cls)
        newName.split(/\s+/g).forEach(function(klass){
          if (!$(this).hasClass(klass)) classList.push(klass)
        }, this)
        classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "))
      })
    },
    removeClass: function(name){
      return this.each(function(idx){
        if (name === undefined) return className(this, '')
        classList = className(this)
        funcArg(this, name, idx, classList).split(/\s+/g).forEach(function(klass){
          classList = classList.replace(classRE(klass), " ")
        })
        className(this, classList.trim())
      })
    },
    toggleClass: function(name, when){
      return this.each(function(idx){
        var $this = $(this), names = funcArg(this, name, idx, className(this))
        names.split(/\s+/g).forEach(function(klass){
          (when === undefined ? !$this.hasClass(klass) : when) ?
            $this.addClass(klass) : $this.removeClass(klass)
        })
      })
    },
    scrollTop: function(){
      if (!this.length) return
      return ('scrollTop' in this[0]) ? this[0].scrollTop : this[0].scrollY
    },
    position: function() {
      if (!this.length) return

      var elem = this[0],
        // Get *real* offsetParent
        offsetParent = this.offsetParent(),
        // Get correct offsets
        offset       = this.offset(),
        parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset()

      // Subtract element margins
      // note: when an element has margin: auto the offsetLeft and marginLeft
      // are the same in Safari causing offset.left to incorrectly be 0
      offset.top  -= parseFloat( $(elem).css('margin-top') ) || 0
      offset.left -= parseFloat( $(elem).css('margin-left') ) || 0

      // Add offsetParent borders
      parentOffset.top  += parseFloat( $(offsetParent[0]).css('border-top-width') ) || 0
      parentOffset.left += parseFloat( $(offsetParent[0]).css('border-left-width') ) || 0

      // Subtract the two offsets
      return {
        top:  offset.top  - parentOffset.top,
        left: offset.left - parentOffset.left
      }
    },
    offsetParent: function() {
      return this.map(function(){
        var parent = this.offsetParent || document.body
        while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css("position") == "static")
          parent = parent.offsetParent
        return parent
      })
    }
  }

  // for now
  $.fn.detach = $.fn.remove

  // Generate the `width` and `height` functions
  ;['width', 'height'].forEach(function(dimension){
    $.fn[dimension] = function(value){
      var offset, el = this[0],
        Dimension = dimension.replace(/./, function(m){ return m[0].toUpperCase() })
      if (value === undefined) return isWindow(el) ? el['inner' + Dimension] :
        isDocument(el) ? el.documentElement['offset' + Dimension] :
        (offset = this.offset()) && offset[dimension]
      else return this.each(function(idx){
        el = $(this)
        el.css(dimension, funcArg(this, value, idx, el[dimension]()))
      })
    }
  })

  function traverseNode(node, fun) {
    fun(node)
    for (var key in node.childNodes) traverseNode(node.childNodes[key], fun)
  }

  // Generate the `after`, `prepend`, `before`, `append`,
  // `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.
  adjacencyOperators.forEach(function(operator, operatorIndex) {
    var inside = operatorIndex % 2 //=> prepend, append

    $.fn[operator] = function(){
      // arguments can be nodes, arrays of nodes, Zepto objects and HTML strings
      var argType, nodes = $.map(arguments, function(arg) {
            argType = type(arg)
            return argType == "object" || argType == "array" || arg == null ?
              arg : zepto.fragment(arg)
          }),
          parent, copyByClone = this.length > 1
      if (nodes.length < 1) return this

      return this.each(function(_, target){
        parent = inside ? target : target.parentNode

        // convert all methods to a "before" operation
        target = operatorIndex == 0 ? target.nextSibling :
                 operatorIndex == 1 ? target.firstChild :
                 operatorIndex == 2 ? target :
                 null

        nodes.forEach(function(node){
          if (copyByClone) node = node.cloneNode(true)
          else if (!parent) return $(node).remove()

          traverseNode(parent.insertBefore(node, target), function(el){
            if (el.nodeName != null && el.nodeName.toUpperCase() === 'SCRIPT' &&
               (!el.type || el.type === 'text/javascript') && !el.src)
              window['eval'].call(window, el.innerHTML)
          })
        })
      })
    }

    // after    => insertAfter
    // prepend  => prependTo
    // before   => insertBefore
    // append   => appendTo
    $.fn[inside ? operator+'To' : 'insert'+(operatorIndex ? 'Before' : 'After')] = function(html){
      $(html)[operator](this)
      return this
    }
  })

  zepto.Z.prototype = $.fn

  // Export internal API functions in the `$.zepto` namespace
  zepto.uniq = uniq
  zepto.deserializeValue = deserializeValue
  $.zepto = zepto

  return $
})()

window.Zepto = Zepto
'$' in window || (window.$ = Zepto)

;(function($){
  function detect(ua){
    var os = this.os = {}, browser = this.browser = {},
      webkit = ua.match(/WebKit\/([\d.]+)/),
      android = ua.match(/(Android)\s+([\d.]+)/),
      ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
      iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
      webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
      touchpad = webos && ua.match(/TouchPad/),
      kindle = ua.match(/Kindle\/([\d.]+)/),
      silk = ua.match(/Silk\/([\d._]+)/),
      blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/),
      bb10 = ua.match(/(BB10).*Version\/([\d.]+)/),
      rimtabletos = ua.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
      playbook = ua.match(/PlayBook/),
      chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/),
      firefox = ua.match(/Firefox\/([\d.]+)/)

    // Todo: clean this up with a better OS/browser seperation:
    // - discern (more) between multiple browsers on android
    // - decide if kindle fire in silk mode is android or not
    // - Firefox on Android doesn't specify the Android version
    // - possibly devide in os, device and browser hashes

    if (browser.webkit = !!webkit) browser.version = webkit[1]

    if (android) os.android = true, os.version = android[2]
    if (iphone) os.ios = os.iphone = true, os.version = iphone[2].replace(/_/g, '.')
    if (ipad) os.ios = os.ipad = true, os.version = ipad[2].replace(/_/g, '.')
    if (webos) os.webos = true, os.version = webos[2]
    if (touchpad) os.touchpad = true
    if (blackberry) os.blackberry = true, os.version = blackberry[2]
    if (bb10) os.bb10 = true, os.version = bb10[2]
    if (rimtabletos) os.rimtabletos = true, os.version = rimtabletos[2]
    if (playbook) browser.playbook = true
    if (kindle) os.kindle = true, os.version = kindle[1]
    if (silk) browser.silk = true, browser.version = silk[1]
    if (!silk && os.android && ua.match(/Kindle Fire/)) browser.silk = true
    if (chrome) browser.chrome = true, browser.version = chrome[1]
    if (firefox) browser.firefox = true, browser.version = firefox[1]

    os.tablet = !!(ipad || playbook || (android && !ua.match(/Mobile/)) || (firefox && ua.match(/Tablet/)))
    os.phone  = !!(!os.tablet && (android || iphone || webos || blackberry || bb10 ||
      (chrome && ua.match(/Android/)) || (chrome && ua.match(/CriOS\/([\d.]+)/)) || (firefox && ua.match(/Mobile/))))
  }

  detect.call($, navigator.userAgent)
  // make available to unit tests
  $.__detect = detect

})(Zepto)

;(function($){
  var $$ = $.zepto.qsa, handlers = {}, _zid = 1, specialEvents={},
      hover = { mouseenter: 'mouseover', mouseleave: 'mouseout' }

  specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents'

  function zid(element) {
    return element._zid || (element._zid = _zid++)
  }
  function findHandlers(element, event, fn, selector) {
    event = parse(event)
    if (event.ns) var matcher = matcherFor(event.ns)
    return (handlers[zid(element)] || []).filter(function(handler) {
      return handler
        && (!event.e  || handler.e == event.e)
        && (!event.ns || matcher.test(handler.ns))
        && (!fn       || zid(handler.fn) === zid(fn))
        && (!selector || handler.sel == selector)
    })
  }
  function parse(event) {
    var parts = ('' + event).split('.')
    return {e: parts[0], ns: parts.slice(1).sort().join(' ')}
  }
  function matcherFor(ns) {
    return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)')
  }

  function eachEvent(events, fn, iterator){
    if ($.type(events) != "string") $.each(events, iterator)
    else events.split(/\s/).forEach(function(type){ iterator(type, fn) })
  }

  function eventCapture(handler, captureSetting) {
    return handler.del &&
      (handler.e == 'focus' || handler.e == 'blur') ||
      !!captureSetting
  }

  function realEvent(type) {
    return hover[type] || type
  }

  function add(element, events, fn, selector, getDelegate, capture){
    var id = zid(element), set = (handlers[id] || (handlers[id] = []))
    eachEvent(events, fn, function(event, fn){
      var handler   = parse(event)
      handler.fn    = fn
      handler.sel   = selector
      // emulate mouseenter, mouseleave
      if (handler.e in hover) fn = function(e){
        var related = e.relatedTarget
        if (!related || (related !== this && !$.contains(this, related)))
          return handler.fn.apply(this, arguments)
      }
      handler.del   = getDelegate && getDelegate(fn, event)
      var callback  = handler.del || fn
      handler.proxy = function (e) {
        var result = callback.apply(element, [e].concat(e.data))
        if (result === false) e.preventDefault(), e.stopPropagation()
        return result
      }
      handler.i = set.length
      set.push(handler)
      element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
    })
  }
  function remove(element, events, fn, selector, capture){
    var id = zid(element)
    eachEvent(events || '', fn, function(event, fn){
      findHandlers(element, event, fn, selector).forEach(function(handler){
        delete handlers[id][handler.i]
        element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
      })
    })
  }

  $.event = { add: add, remove: remove }

  $.proxy = function(fn, context) {
    if ($.isFunction(fn)) {
      var proxyFn = function(){ return fn.apply(context, arguments) }
      proxyFn._zid = zid(fn)
      return proxyFn
    } else if (typeof context == 'string') {
      return $.proxy(fn[context], fn)
    } else {
      throw new TypeError("expected function")
    }
  }

  $.fn.bind = function(event, callback){
    return this.each(function(){
      add(this, event, callback)
    })
  }
  $.fn.unbind = function(event, callback){
    return this.each(function(){
      remove(this, event, callback)
    })
  }
  $.fn.one = function(event, callback){
    return this.each(function(i, element){
      add(this, event, callback, null, function(fn, type){
        return function(){
          var result = fn.apply(element, arguments)
          remove(element, type, fn)
          return result
        }
      })
    })
  }

  var returnTrue = function(){return true},
      returnFalse = function(){return false},
      ignoreProperties = /^([A-Z]|layer[XY]$)/,
      eventMethods = {
        preventDefault: 'isDefaultPrevented',
        stopImmediatePropagation: 'isImmediatePropagationStopped',
        stopPropagation: 'isPropagationStopped'
      }
  function createProxy(event) {
    var key, proxy = { originalEvent: event }
    for (key in event)
      if (!ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key]

    $.each(eventMethods, function(name, predicate) {
      proxy[name] = function(){
        this[predicate] = returnTrue
        return event[name].apply(event, arguments)
      }
      proxy[predicate] = returnFalse
    })
    return proxy
  }

  // emulates the 'defaultPrevented' property for browsers that have none
  function fix(event) {
    if (!('defaultPrevented' in event)) {
      event.defaultPrevented = false
      var prevent = event.preventDefault
      event.preventDefault = function() {
        this.defaultPrevented = true
        prevent.call(this)
      }
    }
  }

  $.fn.delegate = function(selector, event, callback){
    return this.each(function(i, element){
      add(element, event, callback, selector, function(fn){
        return function(e){
          var evt, match = $(e.target).closest(selector, element).get(0)
          if (match) {
            evt = $.extend(createProxy(e), {currentTarget: match, liveFired: element})
            return fn.apply(match, [evt].concat([].slice.call(arguments, 1)))
          }
        }
      })
    })
  }
  $.fn.undelegate = function(selector, event, callback){
    return this.each(function(){
      remove(this, event, callback, selector)
    })
  }

  $.fn.live = function(event, callback){
    $(document.body).delegate(this.selector, event, callback)
    return this
  }
  $.fn.die = function(event, callback){
    $(document.body).undelegate(this.selector, event, callback)
    return this
  }

  $.fn.on = function(event, selector, callback){
    return !selector || $.isFunction(selector) ?
      this.bind(event, selector || callback) : this.delegate(selector, event, callback)
  }
  $.fn.off = function(event, selector, callback){
    return !selector || $.isFunction(selector) ?
      this.unbind(event, selector || callback) : this.undelegate(selector, event, callback)
  }

  $.fn.trigger = function(event, data){
    if (typeof event == 'string' || $.isPlainObject(event)) event = $.Event(event)
    fix(event)
    event.data = data
    return this.each(function(){
      // items in the collection might not be DOM elements
      // (todo: possibly support events on plain old objects)
      if('dispatchEvent' in this) this.dispatchEvent(event)
    })
  }

  // triggers event handlers on current element just as if an event occurred,
  // doesn't trigger an actual event, doesn't bubble
  $.fn.triggerHandler = function(event, data){
    var e, result
    this.each(function(i, element){
      e = createProxy(typeof event == 'string' ? $.Event(event) : event)
      e.data = data
      e.target = element
      $.each(findHandlers(element, event.type || event), function(i, handler){
        result = handler.proxy(e)
        if (e.isImmediatePropagationStopped()) return false
      })
    })
    return result
  }

  // shortcut methods for `.bind(event, fn)` for each event type
  ;('focusin focusout load resize scroll unload click dblclick '+
  'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave '+
  'change select keydown keypress keyup error').split(' ').forEach(function(event) {
    $.fn[event] = function(callback) {
      return callback ?
        this.bind(event, callback) :
        this.trigger(event)
    }
  })

  ;['focus', 'blur'].forEach(function(name) {
    $.fn[name] = function(callback) {
      if (callback) this.bind(name, callback)
      else this.each(function(){
        try { this[name]() }
        catch(e) {}
      })
      return this
    }
  })

  $.Event = function(type, props) {
    if (typeof type != 'string') props = type, type = props.type
    var event = document.createEvent(specialEvents[type] || 'Events'), bubbles = true
    if (props) for (var name in props) (name == 'bubbles') ? (bubbles = !!props[name]) : (event[name] = props[name])
    event.initEvent(type, bubbles, true, null, null, null, null, null, null, null, null, null, null, null, null)
    event.isDefaultPrevented = function(){ return this.defaultPrevented }
    return event
  }

})(Zepto)

;(function($){
  var jsonpID = 0,
      document = window.document,
      key,
      name,
      rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      scriptTypeRE = /^(?:text|application)\/javascript/i,
      xmlTypeRE = /^(?:text|application)\/xml/i,
      jsonType = 'application/json',
      htmlType = 'text/html',
      blankRE = /^\s*$/

  // trigger a custom event and return false if it was cancelled
  function triggerAndReturn(context, eventName, data) {
    var event = $.Event(eventName)
    $(context).trigger(event, data)
    return !event.defaultPrevented
  }

  // trigger an Ajax "global" event
  function triggerGlobal(settings, context, eventName, data) {
    if (settings.global) return triggerAndReturn(context || document, eventName, data)
  }

  // Number of active Ajax requests
  $.active = 0

  function ajaxStart(settings) {
    if (settings.global && $.active++ === 0) triggerGlobal(settings, null, 'ajaxStart')
  }
  function ajaxStop(settings) {
    if (settings.global && !(--$.active)) triggerGlobal(settings, null, 'ajaxStop')
  }

  // triggers an extra global event "ajaxBeforeSend" that's like "ajaxSend" but cancelable
  function ajaxBeforeSend(xhr, settings) {
    var context = settings.context
    if (settings.beforeSend.call(context, xhr, settings) === false ||
        triggerGlobal(settings, context, 'ajaxBeforeSend', [xhr, settings]) === false)
      return false

    triggerGlobal(settings, context, 'ajaxSend', [xhr, settings])
  }
  function ajaxSuccess(data, xhr, settings) {
    var context = settings.context, status = 'success'
    settings.success.call(context, data, status, xhr)
    triggerGlobal(settings, context, 'ajaxSuccess', [xhr, settings, data])
    ajaxComplete(status, xhr, settings)
  }
  // type: "timeout", "error", "abort", "parsererror"
  function ajaxError(error, type, xhr, settings) {
    var context = settings.context
    settings.error.call(context, xhr, type, error)
    triggerGlobal(settings, context, 'ajaxError', [xhr, settings, error])
    ajaxComplete(type, xhr, settings)
  }
  // status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
  function ajaxComplete(status, xhr, settings) {
    var context = settings.context
    settings.complete.call(context, xhr, status)
    triggerGlobal(settings, context, 'ajaxComplete', [xhr, settings])
    ajaxStop(settings)
  }

  // Empty function, used as default callback
  function empty() {}

  $.ajaxJSONP = function(options){
    if (!('type' in options)) return $.ajax(options)

    var callbackName = 'jsonp' + (++jsonpID),
      script = document.createElement('script'),
      cleanup = function() {
        clearTimeout(abortTimeout)
        $(script).remove()
        delete window[callbackName]
      },
      abort = function(type){
        cleanup()
        // In case of manual abort or timeout, keep an empty function as callback
        // so that the SCRIPT tag that eventually loads won't result in an error.
        if (!type || type == 'timeout') window[callbackName] = empty
        ajaxError(null, type || 'abort', xhr, options)
      },
      xhr = { abort: abort }, abortTimeout

    if (ajaxBeforeSend(xhr, options) === false) {
      abort('abort')
      return false
    }

    window[callbackName] = function(data){
      cleanup()
      ajaxSuccess(data, xhr, options)
    }

    script.onerror = function() { abort('error') }

    script.src = options.url.replace(/=\?/, '=' + callbackName)
    $('head').append(script)

    if (options.timeout > 0) abortTimeout = setTimeout(function(){
      abort('timeout')
    }, options.timeout)

    return xhr
  }

  $.ajaxSettings = {
    // Default type of request
    type: 'GET',
    // Callback that is executed before request
    beforeSend: empty,
    // Callback that is executed if the request succeeds
    success: empty,
    // Callback that is executed the the server drops error
    error: empty,
    // Callback that is executed on request complete (both: error and success)
    complete: empty,
    // The context for the callbacks
    context: null,
    // Whether to trigger "global" Ajax events
    global: true,
    // Transport
    xhr: function () {
      return new window.XMLHttpRequest()
    },
    // MIME types mapping
    accepts: {
      script: 'text/javascript, application/javascript',
      json:   jsonType,
      xml:    'application/xml, text/xml',
      html:   htmlType,
      text:   'text/plain'
    },
    // Whether the request is to another domain
    crossDomain: false,
    // Default timeout
    timeout: 0,
    // Whether data should be serialized to string
    processData: true,
    // Whether the browser should be allowed to cache GET responses
    cache: true,
  }

  function mimeToDataType(mime) {
    if (mime) mime = mime.split(';', 2)[0]
    return mime && ( mime == htmlType ? 'html' :
      mime == jsonType ? 'json' :
      scriptTypeRE.test(mime) ? 'script' :
      xmlTypeRE.test(mime) && 'xml' ) || 'text'
  }

  function appendQuery(url, query) {
    return (url + '&' + query).replace(/[&?]{1,2}/, '?')
  }

  // serialize payload and append it to the URL for GET requests
  function serializeData(options) {
    if (options.processData && options.data && $.type(options.data) != "string")
      options.data = $.param(options.data, options.traditional)
    if (options.data && (!options.type || options.type.toUpperCase() == 'GET'))
      options.url = appendQuery(options.url, options.data)
  }

  $.ajax = function(options){
    var settings = $.extend({}, options || {})
    for (key in $.ajaxSettings) if (settings[key] === undefined) settings[key] = $.ajaxSettings[key]

    ajaxStart(settings)

    if (!settings.crossDomain) settings.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(settings.url) &&
      RegExp.$2 != window.location.host

    if (!settings.url) settings.url = window.location.toString()
    serializeData(settings)
    if (settings.cache === false) settings.url = appendQuery(settings.url, '_=' + Date.now())

    var dataType = settings.dataType, hasPlaceholder = /=\?/.test(settings.url)
    if (dataType == 'jsonp' || hasPlaceholder) {
      if (!hasPlaceholder) settings.url = appendQuery(settings.url, 'callback=?')
      return $.ajaxJSONP(settings)
    }

    var mime = settings.accepts[dataType],
        baseHeaders = { },
        protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
        xhr = settings.xhr(), abortTimeout

    if (!settings.crossDomain) baseHeaders['X-Requested-With'] = 'XMLHttpRequest'
    if (mime) {
      baseHeaders['Accept'] = mime
      if (mime.indexOf(',') > -1) mime = mime.split(',', 2)[0]
      xhr.overrideMimeType && xhr.overrideMimeType(mime)
    }
    if (settings.contentType || (settings.contentType !== false && settings.data && settings.type.toUpperCase() != 'GET'))
      baseHeaders['Content-Type'] = (settings.contentType || 'application/x-www-form-urlencoded')
    settings.headers = $.extend(baseHeaders, settings.headers || {})

    xhr.onreadystatechange = function(){
      if (xhr.readyState == 4) {
        xhr.onreadystatechange = empty;
        clearTimeout(abortTimeout)
        var result, error = false
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || (xhr.status == 0 && protocol == 'file:')) {
          dataType = dataType || mimeToDataType(xhr.getResponseHeader('content-type'))
          result = xhr.responseText

          try {
            // http://perfectionkills.com/global-eval-what-are-the-options/
            if (dataType == 'script')    (1,eval)(result)
            else if (dataType == 'xml')  result = xhr.responseXML
            else if (dataType == 'json') result = blankRE.test(result) ? null : $.parseJSON(result)
          } catch (e) { error = e }

          if (error) ajaxError(error, 'parsererror', xhr, settings)
          else ajaxSuccess(result, xhr, settings)
        } else {
          ajaxError(null, xhr.status ? 'error' : 'abort', xhr, settings)
        }
      }
    }

    var async = 'async' in settings ? settings.async : true
    xhr.open(settings.type, settings.url, async)

    for (name in settings.headers) xhr.setRequestHeader(name, settings.headers[name])

    if (ajaxBeforeSend(xhr, settings) === false) {
      xhr.abort()
      return false
    }

    if (settings.timeout > 0) abortTimeout = setTimeout(function(){
        xhr.onreadystatechange = empty
        xhr.abort()
        ajaxError(null, 'timeout', xhr, settings)
      }, settings.timeout)

    // avoid sending empty string (#319)
    xhr.send(settings.data ? settings.data : null)
    return xhr
  }

  // handle optional data/success arguments
  function parseArguments(url, data, success, dataType) {
    var hasData = !$.isFunction(data)
    return {
      url:      url,
      data:     hasData  ? data : undefined,
      success:  !hasData ? data : $.isFunction(success) ? success : undefined,
      dataType: hasData  ? dataType || success : success
    }
  }

  $.get = function(url, data, success, dataType){
    return $.ajax(parseArguments.apply(null, arguments))
  }

  $.post = function(url, data, success, dataType){
    var options = parseArguments.apply(null, arguments)
    options.type = 'POST'
    return $.ajax(options)
  }

  $.getJSON = function(url, data, success){
    var options = parseArguments.apply(null, arguments)
    options.dataType = 'json'
    return $.ajax(options)
  }

  $.fn.load = function(url, data, success){
    if (!this.length) return this
    var self = this, parts = url.split(/\s/), selector,
        options = parseArguments(url, data, success),
        callback = options.success
    if (parts.length > 1) options.url = parts[0], selector = parts[1]
    options.success = function(response){
      self.html(selector ?
        $('<div>').html(response.replace(rscript, "")).find(selector)
        : response)
      callback && callback.apply(self, arguments)
    }
    $.ajax(options)
    return this
  }

  var escape = encodeURIComponent

  function serialize(params, obj, traditional, scope){
    var type, array = $.isArray(obj)
    $.each(obj, function(key, value) {
      type = $.type(value)
      if (scope) key = traditional ? scope : scope + '[' + (array ? '' : key) + ']'
      // handle data in serializeArray() format
      if (!scope && array) params.add(value.name, value.value)
      // recurse into nested objects
      else if (type == "array" || (!traditional && type == "object"))
        serialize(params, value, traditional, key)
      else params.add(key, value)
    })
  }

  $.param = function(obj, traditional){
    var params = []
    params.add = function(k, v){ this.push(escape(k) + '=' + escape(v)) }
    serialize(params, obj, traditional)
    return params.join('&').replace(/%20/g, '+')
  }
})(Zepto)

;(function ($) {
  $.fn.serializeArray = function () {
    var result = [], el
    $( Array.prototype.slice.call(this.get(0).elements) ).each(function () {
      el = $(this)
      var type = el.attr('type')
      if (this.nodeName.toLowerCase() != 'fieldset' &&
        !this.disabled && type != 'submit' && type != 'reset' && type != 'button' &&
        ((type != 'radio' && type != 'checkbox') || this.checked))
        result.push({
          name: el.attr('name'),
          value: el.val()
        })
    })
    return result
  }

  $.fn.serialize = function () {
    var result = []
    this.serializeArray().forEach(function (elm) {
      result.push( encodeURIComponent(elm.name) + '=' + encodeURIComponent(elm.value) )
    })
    return result.join('&')
  }

  $.fn.submit = function (callback) {
    if (callback) this.bind('submit', callback)
    else if (this.length) {
      var event = $.Event('submit')
      this.eq(0).trigger(event)
      if (!event.defaultPrevented) this.get(0).submit()
    }
    return this
  }

})(Zepto)

;(function($, undefined){
  var prefix = '', eventPrefix, endEventName, endAnimationName,
    vendors = { Webkit: 'webkit', Moz: '', O: 'o', ms: 'MS' },
    document = window.document, testEl = document.createElement('div'),
    supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
    transform,
    transitionProperty, transitionDuration, transitionTiming,
    animationName, animationDuration, animationTiming,
    cssReset = {}

  function dasherize(str) { return downcase(str.replace(/([a-z])([A-Z])/, '$1-$2')) }
  function downcase(str) { return str.toLowerCase() }
  function normalizeEvent(name) { return eventPrefix ? eventPrefix + name : downcase(name) }

  $.each(vendors, function(vendor, event){
    if (testEl.style[vendor + 'TransitionProperty'] !== undefined) {
      prefix = '-' + downcase(vendor) + '-'
      eventPrefix = event
      return false
    }
  })

  transform = prefix + 'transform'
  cssReset[transitionProperty = prefix + 'transition-property'] =
  cssReset[transitionDuration = prefix + 'transition-duration'] =
  cssReset[transitionTiming   = prefix + 'transition-timing-function'] =
  cssReset[animationName      = prefix + 'animation-name'] =
  cssReset[animationDuration  = prefix + 'animation-duration'] =
  cssReset[animationTiming    = prefix + 'animation-timing-function'] = ''

  $.fx = {
    off: (eventPrefix === undefined && testEl.style.transitionProperty === undefined),
    speeds: { _default: 400, fast: 200, slow: 600 },
    cssPrefix: prefix,
    transitionEnd: normalizeEvent('TransitionEnd'),
    animationEnd: normalizeEvent('AnimationEnd')
  }

  $.fn.animate = function(properties, duration, ease, callback){
    if ($.isPlainObject(duration))
      ease = duration.easing, callback = duration.complete, duration = duration.duration
    if (duration) duration = (typeof duration == 'number' ? duration :
                    ($.fx.speeds[duration] || $.fx.speeds._default)) / 1000
    return this.anim(properties, duration, ease, callback)
  }

  $.fn.anim = function(properties, duration, ease, callback){
    var key, cssValues = {}, cssProperties, transforms = '',
        that = this, wrappedCallback, endEvent = $.fx.transitionEnd

    if (duration === undefined) duration = 0.4
    if ($.fx.off) duration = 0

    if (typeof properties == 'string') {
      // keyframe animation
      cssValues[animationName] = properties
      cssValues[animationDuration] = duration + 's'
      cssValues[animationTiming] = (ease || 'linear')
      endEvent = $.fx.animationEnd
    } else {
      cssProperties = []
      // CSS transitions
      for (key in properties)
        if (supportedTransforms.test(key)) transforms += key + '(' + properties[key] + ') '
        else cssValues[key] = properties[key], cssProperties.push(dasherize(key))

      if (transforms) cssValues[transform] = transforms, cssProperties.push(transform)
      if (duration > 0 && typeof properties === 'object') {
        cssValues[transitionProperty] = cssProperties.join(', ')
        cssValues[transitionDuration] = duration + 's'
        cssValues[transitionTiming] = (ease || 'linear')
      }
    }

    wrappedCallback = function(event){
      if (typeof event !== 'undefined') {
        if (event.target !== event.currentTarget) return // makes sure the event didn't bubble from "below"
        $(event.target).unbind(endEvent, wrappedCallback)
      }
      $(this).css(cssReset)
      callback && callback.call(this)
    }
    if (duration > 0) this.bind(endEvent, wrappedCallback)

    // trigger page reflow so new elements can animate
    this.size() && this.get(0).clientLeft

    this.css(cssValues)

    if (duration <= 0) setTimeout(function() {
      that.each(function(){ wrappedCallback.call(this) })
    }, 0)

    return this
  }

  testEl = null
})(Zepto)



// A COLLECTIONS OF NATIVE OBJECT PROTOTYPE EXTENDER.
// --------------------------------------------------------------------------
// NEW NATIVE FUNCTIONS.
(function (window) {
    'use strict';
    // Object Type.
    var ObjectType = function (obj) {
        if (typeof obj === 'undefined') {
            return 'undefined';
        }
        if (typeof obj === null) {
            return null;
        }
        return Object.prototype.toString.call(obj).match(/^\[object\s(.*)\]$/)[1].toLowerCase();
    };
    window.typeOf = ObjectType;
    
    // Last Node.
    var ObjectLastNode = function (from, what) {
        var ncoll = from;
        var acoll = {};
        for (var i = 0; i < ncoll.length; ++i) {
            acoll[ncoll[i].nodeName.toLowerCase()] = i;
        }
        var last = acoll[what];
        if (!last) {
            return -1;
        } else {
            return last;
        }
    };
    window.lastNode = ObjectLastNode;
    
    // Define Constant.
    window.define = function (name, value) {
        window[name] = value;
        Object.defineProperty(window, name, {
            enumerable: false,
            configurable: false,
            writable: false
        });
        return window[name];
    };

})(window);

// Extend Date.
(function (Date) {
    'use strict';
    // CONVERT DATE TO JULIAN.
    if (!Date.prototype.toJulian) {
        Date.prototype.toJulian = function () {
            var MM = this.getUTCMonth() + 1;
            var DD = this.getUTCDate();
            var YY = this.getUTCFullYear();
            var HR = this.getUTCHours();
            var MN = this.getUTCMinutes();
            var SC = this.getUTCSeconds();

            HR = HR + (MN / 60) + (SC/3600);
            var GGG = 1;
            if (YY <= 1585) {
                GGG = 0;
            }
            
            var jDate = -1 * Math.floor(7 * (Math.floor((MM + 9) / 12) + YY) / 4);
            
            var S = 1;
            if ((MM - 9)<0) {
                S = -1;
            }
            var A = Math.abs(MM - 9);
            
            var J1 = Math.floor(YY + S * Math.floor(A / 7));
            J1 = -1 * Math.floor((Math.floor(J1 / 100) + 1) * 3 / 4);
            jDate = jDate + Math.floor(275 * MM / 9) + DD + (GGG * J1);
            jDate = jDate + 1721027 + 2 * GGG + 367 * YY - 0.5;
            jDate = jDate + (HR / 24);
            
            return jDate;
        };
    }
    if (!Date.prototype.dateOfMonth) {
        Date.prototype.dateOfMonth = function () {
            var jdate = new Date(this.getFullYear(), this.getMonth, 1).toJulian();
            var month = this.getMonth();
            
            var daycount = 0;
            
            for (var i = 1; i <= 31; ++i) {
                if ((new Date(this.getFullYear(), this.getMonth(), i).getMonth()) === month) {
                    daycount++;
                }
                jdate = jdate + 1;
            }
            return daycount;
        };
    }
    // GET WEEK OF YEAR.
    if (!Date.prototype.weekOfYear) {
        Date.prototype.weekOfYear = function(){
            var date = new Date(+this);
            date.setHours(0,0,0);
            date.setDate(date.getDate()+4-(date.getDay()||7));
            return Math.ceil((((date-new Date(date.getFullYear(),0,1))/8.64e7)+1)/7);
        };
    }
    // GET WEEK OF MONTH.
    if (!Date.prototype.getWeek) {
        Date.prototype.getWeek = function () {
            var year = this.getFullYear();
            var mont = this.getMonth();
            var date = this.getDate();
            
            var lmonth  = mont - 1;
            if (mont === 0) lmonth = 11;
            var ndat = new Date(year, lmonth);
            
            var week = 0;
            for (var i = (ndat.dateOfMonth() - 7); i <= ndat.dateOfMonth(); ++i) {
                var cdate = new Date(year, lmonth, i);
                if (cdate.getDay() === 0) week++;
            }
            if (new Date(year, mont, 1).getDay() === 0) week = 0;
            for (var j = 1; j <= date; ++j) {
                var xdate = new Date(year, mont, j);
                if (xdate.getDay() === 0) week++;
            }
            return week;
        };
    }
    // GET DATE ON WEEK WITH/WITHOUT SPESIFIC DAY.
    if (!Date.prototype.dateOfWeek) {
        Date.prototype.dateOfWeek = function (week, day) {
            if (typeOf(week) === 'number') {
                var i, j, w;
                var gjd = new Date(this.getFullYear(), this.getMonth(), 1).toJulian();
                
                var dow = [];
                var don = [];
                for (i = 1; i <= 31; ++i) {
                    if (Number(gjd.toDate('w')) === Number(week) && Number(gjd.toDate('M')-1) == this.getMonth()) {
                        dow.push(i);
                        don.push(gjd.toDate('dn'));
                    }
                    gjd = gjd + 1;
                }
                if (typeOf(day) === 'string') {
                    return new Date(this.getFullYear(), this.getMonth(), dow[don.indexOf(day)]);
                }
                return dow;
            }
        };
    }
    // DATE FORMATTING.
    if (!Date.prototype.format) {
        Date.prototype.format = function (format) {
            var jdate = this.toJulian();
            var drepl = ['Y', 'M', 'D', 'd', 'h', 'm', 's', 't', 'W', 'dn', 'mn', 'w', 'wn'];
            for (var i = 0; i < drepl.length; ++i) {
                var reg = new RegExp('%' + drepl[i], 'g');
                if (drepl[i].length > 1) {
                    reg = new RegExp(drepl[i], 'g');
                }
                format = format.replace(reg, jdate.toDate(drepl[i]));
            }
            return format;
        };
    }
    // CONVERT JULIAN NUMBER TO DATE.
    if (!Number.prototype.toDate) {
        Number.prototype.toDate = function (as) {
            var X = parseFloat(this)+0.5;
            var Z = Math.floor(X); //Get day without time
            var F = X - Z; //Get time
            var Y = Math.floor((Z-1867216.25)/36524.25);
            var A = Z+1+Y-Math.floor(Y/4);
            var B = A+1524;
            var C = Math.floor((B-122.1)/365.25);
            var D = Math.floor(365.25*C);
            var G = Math.floor((B-D)/30.6001);
            //must get number less than or equal to 12)
            var month = (G<13.5) ? (G-1) : (G-13);
            //if Month is January or February, or the rest of year
            var year = (month<2.5) ? (C-4715) : (C-4716);
            month -= 1; //Handle JavaScript month format
            var UT = B-D-Math.floor(30.6001*G)+F;
            var day = Math.floor(UT);
            //Determine time
            UT -= Math.floor(UT);
            UT *= 24;
            var hour = Math.floor(UT);
            UT -= Math.floor(UT);
            UT *= 60;
            var minute = Math.floor(UT);
            UT -= Math.floor(UT);
            UT *= 60;
            var second = Math.round(UT);
            
            var newdate = new Date(Date.UTC(year, month, day, hour, minute, second));
            
            var zyear = newdate.getFullYear();
            var zmonth = newdate.getMonth() + 1;
            if (zmonth < 10) zmonth = '0' + zmonth;
            
            var zdate = newdate.getDate();
            if (zdate < 10) zdate = '0' + zdate;

            var zhour = newdate.getHours();
            if (zhour < 10) zhour = '0' + zhour;
            
            var zminute = newdate.getMinutes();
            if (zminute < 10) zminute = '0' + zminute;
            
            var zsecond = newdate.getSeconds();
            if (zsecond < 10) zsecond = '0' + zsecond;
            
            var ztime = newdate.getTime();
            var zday = newdate.getDay() + 1;
            var zweek = newdate.weekOfYear();
            var wmont = newdate.getWeek();

            var stday = ['', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            //if (TocmConfig.date.dayname) stday = TocmConfig.date.dayname;
            var smont = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            //if (TocmConfig.date.monname) smont = TocmConfig.date.monname;
            var sweek = ['', 'First', 'Second', 'Third', 'Fourth', 'Fifth'];
            //if (TocmConfig.date.wekname) sweek = TocmConfig.date.wekname;
            
            if (typeOf(as) === 'string') {
                if (as === 'month' || as === 'M') {
                    return zmonth;
                } else if (as === 'date' || as === 'D') {
                    return zdate;
                } else if (as === 'year' || as === 'Y') {
                    return zyear;
                } else if (as === 'hour' || as === 'h') {
                    return zhour;
                } else if (as === 'minute' || as === 'm') {
                    return zminute;
                } else if (as === 'second' || as === 's') {
                    return zsecond;
                } else if (as === 'time' || as === 't') {
                    return ztime;
                } else if (as === 'week' || as === 'W') {
                    return zweek;
                } else if (as === 'day' || as === 'd') {
                    return zday;
                } else if (as === 'dayname' || as === 'dn') {
                    return stday[zday];
                } else if (as === 'monthname' || as === 'mn') {
                    return smont[Number(zmonth)];
                } else if (as === 'weekmonth' || as === 'w') {
                    return wmont;
                } else if (as === 'weekname' || as === 'wn') {
                    return sweek[wmont];
                } else if (as === 'object') {
                    return {
                        year: zyear,
                        month: zmonth,
                        date: zdate,
                        
                        hour: zhour,
                        minute: zminute,
                        second: zsecond,
                        
                        time: ztime,
                        day: zday,
                        week: zweek
                    };
                }
            }
            
            return newdate;
        };
    }
})(Date);

// Extend Array.
(function (Array) {
    'use strict';
    // Shuffle array.
    if (!Array.prototype.shuffle) {
        Array.prototype.shuffle = function () {
            for(var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
        };
        Object.defineProperty(Array.prototype, 'shuffle', {
            enumerable: false
        });
    }
    
    // Cycle array. Move first item to end, then return the moved item.
    if (!Array.prototype.cycle) {
        Array.prototype.cycle = function(){
            var first = this.shift();
            this.push(first);
            return first;
        };
        Object.defineProperty(Array.prototype, 'cycle', {
            enumerable: false
        });
    }
    
    // Delete array.
    if (!Array.prototype.delete) {
        Array.prototype.delete = function (index) {
            if (typeOf(index) === 'number') {
                var narr = [];
                for (var i = 0; i < this.length; ++i) {
                    if (i !== index) {
                        narr.push(this[i]);
                    }
                }
                return narr;
            }
            return this;
        };
    }
})(Array);

// Extend Object.
(function (Object) {
    'use strict';
    // Sorting object.
    if (!Object.prototype.sort) {
        Object.prototype.sort = function (direction) {
            var array = Object.keys(this), newobject = {};
            if (direction !== 'desc') {
                // SORT ASCENDING -->
                array = array.sort(function (a, b) {
                    var X = a.toLowerCase();
                    var Y = b.toLowerCase();
                    if (X < Y) {
                        return -1;
                    } else if (X > Y) {
                        return 1;
                    }
                    return 0;
                });
            } else {
                // SORT DESCENDING -->
                array = array.sort(function (a, b) {
                    var X = a.toLowerCase();
                    var Y = b.toLowerCase();
                    if (X < Y) {
                        return 1;
                    } else if (X > Y) {
                        return 0;
                    }
                    return -1;
                });
            }
            for (var i = 0; i < array.length; ++i) {
                newobject[array[i]] = this[array[i]];
            }
            return newobject;
        };
        Object.defineProperty(Object.prototype, 'sort', {
            enumerable: false
        });
    }
})(Object);

// Extend String.
(function (String) {
    'use strict';
    // PREG REPLACE FUNCTION.
    if (!String.prototype.preg_replace) {
        String.prototype.preg_replace = function (pattern, replace, recursive) {
            var match = this.match(pattern), newstring, replaced, candidate;
            if (match) {
                replaced = replace;
                for (var i = 0; i < match.length; ++i) {
                    candidate = new RegExp('(\\$' + i + ')', 'g');
                    replaced = replaced.replace(candidate, match[i]);
                }
                newstring = this.replace(match[0], replaced);
                if (recursive !== false) {
                    if (newstring.match(pattern)) {
                        newstring = newstring.preg_replace(pattern, replace);
                    }
                }
                return newstring;
            }
            return this;
        };
    }
    // SPLIT PATH FUNCTION.
    if (!String.prototype.split_path) {
        String.prototype.split_path = function (type) {
            var splited, filename, filepath, i;
            // Slash or Backslash.
            if (this.match('/')) {
                splited = this.split('/');
                filename = splited[splited.length - 1];
                filepath = this.replace('/' + filename, '');
            } else if (this.match(/\\/)) {
                splited = this.split(/\\/);
                filename = splited[splited.length - 1];
                filepath = this.replace('\\' + filename, '');
            } else {
                return this;
            }
            
            // Returning result.
            if (type === 'filename') {
                return filename;
            } else if (type === 'path') {
                return filepath;
            } else {
                return {filename: filename, path: filepath};
            }
        };
    }
})(String);

// CREATING TOCM REGISTRY.
(function(window) {
    'use strict';
    // CREATING TOCM CONFIGURATIONS.
    window.TocmConfig = {
        autowrite: true,
        sortclass: false,
        showdebug: false,
        date: {
            dayname: ['', 'Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum\'at', 'Sabtu'],
            monname: ['', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
            wekname: ['', 'Pertama', 'Kedua', 'Ketiga', 'Keempat', 'Kelima']
        }
    };
    // CREATING COLLECTIONS OF UNIVERSAL CLASS.
    window.TocmDefClass = {};
    // CREATING COLLECTIONS OF MEDIA SPESIFIC CLASS.
    window.TocmMedClass = {};
    // CREATING MEDIA COLLECTIONS.
    window.TocmMedias = {};
    // CREATING KEYFRAMES COLLECTIONS.
    window.TocmKeyframes = {};
    // CREATING FONTS COLLECTIONS.
    window.TocmFonts = {};
})(window);

// CREATING REFERENCE OBJECTS.
(function (window) {
    'use strict';
    window.TocmRef = {
        css3: [
            'animation', 'animation_name', 'animation_duration', 'animation_fill_mode', 'animation_timing_function', 'animation_delay',
            'animation_iteration_count', 'animation_direction', 'animation_play_state', 'background_clip', 'background_origin',
            'background_size', 'border_radius', 'border_top_left_radius', 'border_top_right_radius', 'border_bottom_left_radius',
            'border_bottom_right_radius', 'border_image', 'border_image_outset', 'border_image_repeat', 'border_image_slice',
            'border_image_source', 'border_image_width', 'box_align', 'box_direction', 'box_decoration_break', 'box_flex',
            'box_flex_group', 'box_lines', 'box_ordinal_group', 'box_orient', 'box_pack', 'box_sizing', 'box_shadow', 'break_after',
            'break_before', 'break_inside', 'columns', 'column_count', 'column_fill', 'column_gap', 'column_rule', 'column_rule_color',
            'column_rule_style', 'column_rule_width', 'column_span', 'column_width', 'marquee_direction', 'marquee_play_count',
            'marquee_speed', 'marquee_style', 'nav_index', 'nav_left', 'nav_right', 'nav_up', 'opacity', 'perspective', 'perspective_origin',
            'rotation', 'rotation_point', 'text_shadow', 'text_wrap', 'transform', 'transform_origin', 'transform_style', 'transition',
            'transition_property', 'transition_duration', 'transition_timing_function', 'transition_delay',
            // POSSIBLE DROPPED //
            'appearance', 'backface_visibility', 'grid_columns', 'grid_rows', 'hanging_punctuation', 'icon', 'punctuation_trim', 'resize',
            'target', 'target_name', 'target_new', 'target_position', 'word_break', 'word_wrap', 'filter', 'user_select'
        ],
        // PSEUDO LISTS //
        pseudo: [
            'link', 'visited', 'active', 'hover', 'focus', 'first_letter', 'first_line', 'first_child', 'before', 'after', 'lang', 'target'
        ],
        // VENDOR LISTS //
        vendor: [
            '-webkit-', '-moz-', '-o-', '-ms-'
        ],
        // RESTRICTED PROPERTIES FROM NUMBER AUTOMATIONS.
        noint: [
            'opacity', 'z-index', 'font-weight', 'column-count', 'line-height'
        ]
    };
})(window);

// CREATING CSS STRING BUILDER.
(function (window) {
    'use strict';
    var TocmBuilder = {};
    // FUNCTION TO CREATE CSS STRING.
    TocmBuilder.generateCSS = function (object, tab) {
        var ccss = TocmRef.ccss, xcss = TocmRef.xcss, css3 = TocmRef.css3, cssString = '', property;

        if (typeOf(object) === 'object') {
            // Sorting Properties.
            object.sort();
            // CREATE CUSTOM TAB.
            if (typeOf(tab) !== 'string') {
                tab = '';
            }
            // Processing CSS Object.
            for (var index in object) {
                if (object.hasOwnProperty(index) && object[index] !== '') {
                    // Formatting to CSS property format.
                    property = index.replace(/_/g, '-').replace(/\$/g, '*');
                    if (typeOf(object[index]) === 'number' && TocmRef.noint.indexOf(property) < 0) {
                        // Formatting number.
                        object[index] += 'px';
                    }
                    if (object[index] !== null) {
                        if (css3.indexOf(index) > -1) {
                            // CSS3 Properties.
                            cssString += tab + property + ': ' + object[index] + '; ';
                            cssString += '-webkit-' + property + ': ' + object[index] + '; ';
                            cssString += '-moz-' + property + ': ' + object[index] + '; ';
                            cssString += '-o-' + property + ': ' + object[index] + '; ';
                            cssString += '-ms-' + property + ': ' + object[index] + ';\n';
                        } else {
                            cssString += tab + property + ': ' + object[index] + ';\n';
                        }
                    }
                }
            }
            return cssString;
        } else {
            return '';
        }
    };
    // FUNCTION TO WRITE CSS STRING TO HANDLER.
    TocmBuilder.writeDOM = function (name, media, value) {
        var node, head, chld, last;
        var find = function (path) {
            var xpeval = document.evaluate(path, document, null, XPathResult.ANY_TYPE, null);
            while (node = xpeval.iterateNext()) {
                return node;
            }
            return null;
        };
        if (typeOf(name) === 'string' && typeOf(media) === 'string' && typeOf(value) === 'string') {
            head = document.getElementsByTagName('head')[0];
            chld = head.children;
            last = lastNode(chld, 'style');
            node = find('//style[@id="' + name + '"][@data="' + media + '"]');
            if (node) {
                node.innerHTML = value;
            } else {
                node = document.createElement('style');
                node.setAttribute('id', name);
                node.setAttribute('data', media);
                node.setAttribute('type', 'text/css');
                node.innerHTML = value;

                if (last > -1) {
                    head.insertBefore(node, chld[last + 1]);
                } else {
                    head.appendChild(node);
                }
            }
        }
        return node;
    };
    // FUNCTION TO WRITE CSS STRING INTO COMMON FORMATED STRING.
    TocmBuilder.writeCSS = function (object, isget) {
        if (typeOf(object) === 'object' && object.hasOwnProperty('name')) {
            var mediaInfo, cssString = '', property, pseudo;
            var area = object.config.write_area, auto = object.config.write_auto, family = object.family, domid;
        
            if (object.media !== 'none') {
                // GENERATING CLASS FROM MEDIA COLLECTIONS.
                mediaInfo = new TocmMedia(object.media);
                if (typeOf(mediaInfo) === 'object') {
                    // OPENING CSS SELECTOR.
                    cssString += '\t\t' + object.name + ' {\n';
                    // CREATING CSS STRING.
                    cssString += TocmBuilder.generateCSS(object.properties, '\t\t\t');
                    // CLOSING CSS SELECTOR.
                    cssString += '\t\t}\n';
                    // CREATING PSEUDO IF EXISTS.
                    pseudo = object.pseudo;
                    for (property in pseudo) {
                        if (pseudo.hasOwnProperty(property)) {
                            if (typeOf(pseudo[property]) === 'object' && Object.keys(pseudo[property]).length > 0) {
                                cssString += '\t\t' + object.name + ':' + property + ' {\n';
                                cssString += TocmBuilder.generateCSS(pseudo[property], '\t\t\t');
                                cssString += '\t\t}\n';
                            }
                        }
                    }
                    // RETURNING THE GENERATED CSS STRING.
                    return cssString;
                }
            } else {
                // GENERATING CLASS FROM GLOBAL COLLECTIONS.
                cssString += '\n\t' + object.name + ' {\n';
                cssString += TocmBuilder.generateCSS(object.properties, '\t\t');
                cssString += '\t}\n';

                // CREATING PSEUDO IF EXISTS.
                pseudo = object.pseudo;
                for (property in pseudo) {
                    if (pseudo.hasOwnProperty(property)) {
                        if (typeOf(pseudo[property]) === 'object' && Object.keys(pseudo[property]).length > 0) {
                            cssString += '\t' + object.name + ':' + property + ' {\n';
                            cssString += TocmBuilder.generateCSS(pseudo[property], '\t\t');
                            cssString += '\t}\n';
                        }
                    }
                }
                // RETURNING THE GENERATED CSS STRING.
                return cssString;
            }
        }
    };
    // FUNCTION TO WRITE READY STRIG TO HANDLER.
    TocmBuilder.writeSCS = function () {
        var defaultClass = TocmDefClass, mediaClass = TocmMedClass, name, fml, className, dstr = '', mstr = '';
        var area, family, auto, pdstr = {}, pmdstr = {}, minfo, fmcstr, gcstr;
        // ENUMERATING DEFAULT CLASSES.
        if (TocmConfig.sortclass === true) {
            defaultClass = TocmDefClass.sort();
        }
        for (name in defaultClass) {
            if (defaultClass.hasOwnProperty(name)) {
                area = defaultClass[name].config.write_area; family = defaultClass[name].family;
                if (area === 'family') {
                    if (typeOf(pdstr[family]) !== 'string') {
                        pdstr[family] = '';
                    }
                    pdstr[family] += TocmBuilder.writeCSS(defaultClass[name], true);
                } else {
                    dstr += TocmBuilder.writeCSS(defaultClass[name], true);
                }
            }
        }

        // WRITING GLOBAL CLASSES.
        if (dstr !== '') {
            TocmBuilder.writeDOM('Global Class', 'universal', dstr);
        }
        // WRITING PRIVATE CLASSES.
        for (fml in pdstr) {
            if (pdstr.hasOwnProperty(fml)) {
                TocmBuilder.writeDOM(fml, 'universal', pdstr[fml]);
            }
        }

        // ENUMERATING MEDIA CLASSES.
        if (TocmConfig.sortclass === true) {
            mediaClass = TocmMedClass.sort();
        }
        for (name in mediaClass) {
            if (mediaClass.hasOwnProperty(name)) {
                if (TocmConfig.sortclass === true) {
                    mediaClass[name] = mediaClass[name].sort();
                }
                for (className in mediaClass[name]) {
                    if (mediaClass[name].hasOwnProperty(className)) {
                        area = mediaClass[name][className].config.write_area; family = mediaClass[name][className].family;
                        if (area === 'family') {
                            if (typeOf(pmdstr[family]) !== 'string') {
                                pmdstr[family] = '';
                            }
                            pmdstr[family] += TocmBuilder.writeCSS(mediaClass[name][className], true);
                        } else {
                            mstr += TocmBuilder.writeCSS(mediaClass[name][className], true);
                        }
                    }
                }
                // WRITING GLOBAL CLASSES.
                if (mstr !== '') {
                    // GETTING MEDIA INFO.
                    minfo = new TocmMedia(name); gcstr = '';
                    // OPENING MEDIA QUERIES.
                    gcstr += '\n\t@media ' + minfo.value + ' {\n';
                    // ADDING CSS STRING.
                    gcstr += mstr;
                    // CLOSING MEDIA QUERIES.
                    gcstr += '\t}\n';
                    TocmBuilder.writeDOM('Global Class', name, gcstr);
                    mstr = '';
                }
                // WRITING PRIVATE CLASSES.
                for (fml in pmdstr) {
                    if (pmdstr.hasOwnProperty(fml)) {
                        minfo = new TocmMedia(name); fmcstr = '';
                        // OPENING MEDIA QUERIES.
                        fmcstr += '\n\t@media ' + minfo.value + ' {\n';
                        // ADDING CSS STRING.
                        fmcstr += pmdstr[fml];
                        // CLOSING MEDIA QUERIES.
                        fmcstr += '\t}\n';
                        TocmBuilder.writeDOM(fml, name, fmcstr);
                    }
                }
                pmdstr = {};
            }
        }
    };

    // ATTACHING CSS STRING BUILDER TO WINDOW OBJECT.
    window.TocmBuilder = TocmBuilder;
})(window);

// CREATING A TOCM CLASS SUPPORT.
// CREATING DEBUGGER.
(function (window) {
    'use strict';
    if (!window.TocmConfig) {
        window.TocmConfig = {};
    }
    
    window.$log = window.TocmLogger = function (context, message, color, force) {
        if (TocmConfig.showdebug === true && typeOf(context) === 'string' && typeOf(message) === 'string' || force === true) {
            var date = new Date().format('%D-%M-%Y %h:%m:%s');
            
            if (typeOf(color) === 'string') {
                console.log('%c[' + date + '][' + context + '] >> ' + message, 'color:' + color + ';');
            } else {
                console.log('%c[' + date + '][' + context + '] >> ' + message, 'color:blue;');
            }
        }
    };
})(window);

// KEYFRAME COLLECTIONS.
(function (window) {
    'use strict';
    // CREATING KEYFRAMES DEFINITIONS.
    var TocmKeyframe = function (name, position, properties) {
        var frame, pos;
        // DO ACTIONS ONLY IF ARGUMENTS IS VALID.
        if (typeOf(name) === 'string') {
            // CREATE KEYFRAMES IF ARGUMENT POSITION AND PROPERTIES ARE DEFINED, OR SELECT IF ONLY NAME THAT DEFINED.
            if (typeOf(position) === 'string' && typeOf(properties) === 'object') {
                new TocmLogger('TocmKeyframe', 'Creating new keyframe "' + this.name + '".');
                
                this.name = name;
                frame = TocmKeyframes[name];
                if (typeOf(frame) !== 'object') {
                    TocmKeyframes[name] = {};
                    TocmKeyframes[name][position] = properties;
                }

                TocmKeyframes[name][position] = properties;
                this[position] = properties;

                // Writing the Keyframe CSS.
                new TocmLogger('TocmKeyframe', 'Writing keyframe "' + this.name + '" to style node.', 'purple');
                this.write();
            } else {
                frame = TocmKeyframes[name];
                if (typeOf(frame) === 'object') {
                    this.name = name;
                    for (pos in frame) {
                        if (frame.hasOwnProperty(pos)) {
                            this[pos] = frame[pos];
                        }
                    }
                }
            }
        }
        return this;
    };
    // CREATING PROTOTYPE.
    TocmKeyframe.prototype = {
        // FUNCTION TO WRITE KEYFRAME.
        write: function () {
            var cstr = '', style, vendor;
            vendor = ['', '-webkit-'];
            if (this.hasOwnProperty('name') && typeOf(this.name) === 'string') {
                // Opening CSS Keyframes.
                for (var i = 0; i < vendor.length; ++i) {
                    cstr += '\n\t@' + vendor[i] + 'keyframes ' + this.name + ' {\n';
                    for (var pos in this) {
                        if (this.hasOwnProperty(pos) && pos !== 'name') {
                            // Opening Position.
                            cstr += '\t\t' + pos + ' {\n';
                            // Creating Properties.
                            if (typeOf(this[pos]) === 'object') {
                                cstr += TocmBuilder.generateCSS(this[pos], '\t\t\t');
                            }
                            // Closing Position.
                            cstr += '\t\t}\n';
                        }
                    }
                    // Closing CSS Keyframes.
                    cstr += '\t}\n';
                }
                TocmBuilder.writeDOM(this.name, 'keyframe', cstr);
            }
            return this;
        },
        // FUNCTION TO ADD TIMELINE POSITION.
        at: function (position, properties) {
            var key, current;
            if (this.hasOwnProperty('name') && typeOf(position) === 'string' && typeOf(properties) === 'object') {
                new TocmLogger('TocmKeyframe', 'Adding timeline "' + position + '" to keyframe "' + this.name + '".', 'green');
                if (typeOf(this[position]) !== 'object') {
                    this[position] = {};
                }

                for (key in properties) {
                    if (properties.hasOwnProperty(key)) {
                        this[position][key] = properties[key];
                    }
                }
                TocmKeyframes[this.name][position] = this[position];
                this.write();
            }
            return this;
        }
    };
    // Hiding Prototype.
    Object.defineProperty(TocmKeyframe.prototype, 'write', {
        enumerable: false
    });
    Object.defineProperty(TocmKeyframe.prototype, 'at', {
        enumerable: false
    });
    // TocmKeyframe Wrapper.
    window.$keyframes = window.TocmKeyframe = function (name, position, propertis) {
        return new TocmKeyframe(name, position, propertis);
    };
})(window);

// FONTS COLLECTIONS.
(function (window) {
    'use strict';
    // CREATING FUNCTION TO CREATE OR GET FONT-FACE COLLECTIONS.
    var TocmFont = function (name, src, opt) {
        var fonts, key;
        if (typeOf(name) === 'string') {
            fonts = TocmFonts[name];
            if (typeOf(src) === 'string' || typeOf(src) === 'array') {
                TocmFonts[name] = {};

                new TocmLogger('TocmFont', 'Creating new font "' + name + '".');

                this.name = name;
                TocmFonts[name].src = src;
                this.src = src;
                if (typeOf(opt) === 'object') {
                    for (key in opt) {
                        if (opt.hasOwnProperty(key)) {
                            TocmFonts[name][key] = opt[key];
                            this[key] = opt[key];
                        }
                    }
                }
                new TocmLogger('TocmFont', 'Writing font "' + name + '" to style node.', 'orange');
                this.write();
            } else {
                if (typeOf(fonts) === 'object') {
                    this.name = name;
                    for (key in fonts) {
                        if (fonts.hasOwnProperty(key)) {
                            this[key] = fonts[key];
                        }
                    }
                }
            }
        }
        return this;
    };
    // CREATING PROTOTYPES.
    TocmFont.prototype = {
        // WRITING FONTS.
        write: function () {
            var cstr = '', key, j;
            if (this.hasOwnProperty('name')) {
                cstr += '\n\t@font-face {\n';
                for (key in this) {
                    if (this.hasOwnProperty(key)) {
                        if (key === 'name') {
                            cstr += '\t\tfont-family: "' + this.name + '";\n';
                            cstr += '\t\tsrc: local("' + this.name + '");\n';
                        } else if (key === 'src') {
                            if (typeOf(this.src) === 'array') {
                                for (j = 0; j < (this.src.length) ; ++j) {
                                    if (this.src[j].search('.eot') > -1) {
                                        cstr += '\t\tsrc: url("' + this.src[j] + '");\n';
                                        cstr += '\t\tsrc: url("' + this.src[j] + '?#iefix") format("embedded-opentype");\n';
                                    } else if (this.src[j].search('.ttf') > -1) {
                                        cstr += '\t\tsrc: url("' + this.src[j] + '") format("truetype");\n';
                                    } else if (this.src[j].search('.svg') > -1) {
                                        cstr += '\t\tsrc: url("' + this.src[j] + '") format("svg");\n';
                                    } else if (this.src[j].search('.otf') > -1) {
                                        cstr += '\t\tsrc: url("' + this.src[j] + '") format("opentype");\n';
                                    } else if (this.src[j].search('.woff') > -1) {
                                        cstr += '\t\tsrc: url("' + this.src[j] + '") format("woff");\n';
                                    } else {
                                        cstr += '\t\tsrc: url("' + this.src[j] + '");\n';
                                    }
                                }
                            } else if (typeOf(this.src) === 'string') {
                                cstr += '\t\tsrc: url("' + this.src + '");';
                            }
                        } else {
                            cstr += '\t\t' + key.replace('_', '-') + ': ' + this[key] + ';\n';
                        }
                    }
                }
                cstr += '\t}\n';
                TocmBuilder.writeDOM(this.name, 'font', cstr);
            }
            return this;
        },
        // CONFIGURING FONTS.
        set: function (objkey, value) {
            var name, key;
            if (this.hasOwnProperty('name')) {
                name = this.name;
                if (typeOf(objkey) === 'object') {
                    for (key in objkey) {
                        if (objkey.hasOwnProperty(key)) {
                            this[key] = objkey[key];
                            TocmFonts[name][key] = objkey[key];
                        }
                    }
                } else if (typeOf(objkey) === 'string' && typeOf(value) === 'string') {
                    this[objkey] = value;
                    TocmFonts[name][objkey] = value;
                }
                this.write();
            }
            return this;
        }
    };
    // Hiding Prototype.
    Object.defineProperty(TocmFont.prototype, 'write', {
        enumerable: false
    });
    Object.defineProperty(TocmFont.prototype, 'set', {
        enumerable: false
    });
    // TocmFont Wrapper.
    window.$fonts = window.TocmFont = function (name, src, opt) {
        return new TocmFont(name, src, opt);
    };
})(window);

// MEDIA COLLECTIONS.
(function (window) {
    'use strict';
    // CREATING FUNCTION TO CREATE MEDIA QUERIES COLLECTIONS.
    var TocmMedia = function (name, value) {
        var media;
        if (typeOf(name) === 'string') {
            if (typeOf(value) === 'string') {
                window.TocmMedias[name] = {
                    name: name,
                    value: value
                };
                this.name = name;
                this.value = value;
                return this;
            } else {
                media = window.TocmMedias[name];
                if (typeOf(media) === 'object') {
                    this.name = media.name;
                    this.value = media.value;
                    return this;
                } else {
                    return -1;
                }
            }
        }
    };

    // TocmMedia Wrapper.
    window.$media = window.TocmMedia = function (name, value) {
        return new TocmMedia(name, value);
    };
})(window);

// CREATING TOCM CONSTRUCTOR.
(function (window) {
    'use strict';
    // CREATING CLASS SELECTOR.
    var TocmSelector = function (name, media) {
        var obj;
        // Ensure the given name is in valid format.
        if (typeOf(name) === 'string') {
            // Specifying where the class object will be selected.
            if (typeOf(media) === 'string' && media !== 'none' && new TocmMedia(media).hasOwnProperty('name')) {
                // Ensure the given media is exist on TocmMedia Registry.
                if (typeOf(TocmMedClass[media]) === 'object') {
                    obj = TocmMedClass[media][name];
                    // Cancel select if the obj is not TocmClass Object.
                    if (typeOf(obj) !== 'object' || !obj.hasOwnProperty('name')) {
                        return;
                    }
                } else {
                    return;
                }
            } else {
                obj = TocmDefClass[name];
            }
            // Returning selected object.
            return obj;
        } else {
            return;
        }
    };
    // CREATING FUNCTION TO CREATE NEW CLASS.
    var TocmClass = function (name, props, media, delayed) {
        if (typeOf(name) === 'string' && typeOf(props) === 'object') {
            // COLLECTING CSS PROPERTIES.
            new TocmLogger('TocmClass', 'Creating new class "' + name + '".');

            this.name = this.family = name;
            this.properties = props;
            this.pseudo = {};
            this.config = {
                write_area: 'universal', // family <> universal.
                write_auto: false
            };
            this.parent = {};
            
            // ADDING TO MEDIA SPESIFIC COLLECTION IF 'media' WAS DEFINED AND ENSURE THE MEDIA HAS BEEN REGISTERED.
            if (typeOf(media) === 'string' && media !== 'none' && new TocmMedia(media).hasOwnProperty('name')) {
                this.media = media;
                
                // ADD TO THE MEDIA COLLECTIONS IF ALREADY EXISTS, OR CREATE NEW IF NOT EXISTS.
                new TocmLogger('TocmClass', 'Adding class "' + name + '" to media "' + media + '".', 'purple');

                if (typeOf(TocmMedClass[media]) === 'object') {
                    TocmMedClass[media][name] = this;
                } else {
                    TocmMedClass[media] = {};
                    TocmMedClass[media][name] = this;
                }
            } else {
                new TocmLogger('TocmClass', 'Adding class "' + name + '" to media "universal".', 'purple');

                this.media = 'none';
                TocmDefClass[name] = this;
            }
            // HIDING PRIVATE OBJECT.
            Object.defineProperty(this, 'config', {enumerable:false});
            Object.defineProperty(this, 'parent', {enumerable:false});
            // RETURNING THE CLASS.
            return this;
        } else {
            return;
        }
    };
    // CREATING FUNCTION TO CREATE BATCH OBJECT CLASSES.
    var TocmBatchClass = function (name, object, cmedia, area, family, parent) {
        var proname, tempname, newclass, media, newname, subclass, properties = {}, pseudos = {};
        if (typeOf(name) === 'string' && typeOf(object) === 'object') {
            // PARSING NAME TO GET WETHER THE NAME CONTAINS GLOBAL IDENTIFIER OR NOT.
            if (name.search('!') > -1) {
                name = name.replace('!', '');
                area = 'global';
            }
            
            // PARSING NAME TO GET WETHER THE NAME CONTAINS MEDIA IDENTIFIER OR NOT.
            if (name.search('@') > -1) {
                name = name.replace(/\s+(\@)\s+/g, '@'); // REMOVING SPACE.
                name = name.split('@'); // SPLITING NAME AND MEDIA.
                media = name[1]; // ADDING MEDIA NAME.
                name = name[0]; // ADDING CLASS NAME.
            } else {
                // IF NOT CONTAINS MEDIA IDENTIFIER, THEN TRY TO GET FROM ARGUMENT.
                if (typeOf(cmedia) === 'string' && cmedia !== 'none') {
                    // IF DEFINED, THEN USE IT.
                    media = cmedia;
                } else {
                    // ELSE, DEFINE MEDIA NAME WITH 'none'.
                    media = 'none';
                }
            }
            
            // CREATING NEW OBJECT FOR THIS CLASS.
            newclass = new TocmClass(name, {}, media);
            if (newclass.hasOwnProperty('name')) {
                if (typeOf(area) !== 'string' && area !== 'global') {
                    newclass.config.write_area = 'family';
                }
            } else {
                return;
            }
            
            // ENUMERATING PROPERTIES.
            for (proname in object) {
                if (object.hasOwnProperty(proname)) {
                    // IF PROPERTY IS OBJECT, THEN CREATE NEW CLASS INHERITING TO THIS CLASS.
                    if (typeOf(object[proname]) === 'object') {
                        if (TocmRef.pseudo.indexOf(proname) < 0) {
                            // IF PROPERTY IS NOT PSEUDO OBJECT, THEN CREATE NEW CLASS.
                            newname = name + ' '; // ADDING THIS NAME AS PARENT NAME FOR NEW CLASS.
                            // PARSING MULTIPLE NAME USE.
                            if (proname.search('&') > -1) {
                                // If  name is multiple.
                                tempname = proname.replace(/\s+(\&)\s+/g, '&'); // REPLACING SPACE.
                                tempname = tempname.split('&'); // SPLITING NAME.
                                // ADDING NAME.
                                for (var i = 0; i < tempname.length - 1; ++i) {
                                    newname += tempname[i] + ', ' + name + ' ';
                                }
                                newname += tempname[tempname.length - 1];
                            } else {
                                newname += proname;
                            }
                            // ASIGNING FAMILY NAME.
                            if (typeOf(family) !== 'string') {
                                family = name;
                            }
                            // CREATING NEW CLASS INHERITING TO THIS CLASS.
                            new TocmLogger('TocmClass', 'Adding child-class "' + newname + '" to parent calss "' + name + '".', 'green');

                            TocmConfig.autowrite = false;
                            subclass = new TocmBatchClass(newname, object[proname], media, area, family, newclass);
                        } else {
                            // IF PROPERTY IS PSEUDO OBJECT, THEN ADD THE PSEUDO OBJEC TO QUEUE.
                            if (typeOf(pseudos[proname]) !== 'object') {
                                pseudos[proname] = object[proname];
                            } else {
                                for (var vip in object[proname]) {
                                    if (object[proname].hasOwnProperty(vip)) {
                                        pseudos[proname][vip] = [object][proname][vip];
                                    }
                                }
                            }
                        }
                    } else {
                        // IF PROPERTI IS PLAIN OBJECT, THEN ADD THE PROPERTY TO QUEUE.
                        properties[proname] = object[proname];
                    }
                }
            }
            // ASIGNING FAMILY NAME.
            if (typeOf(family) === 'string') {
                newclass.family = family;
            } else {
                newclass.family = name;
            }
            // ASIGNING PARENT NAME.
            if (typeOf(parent) === 'object' && parent.hasOwnProperty('name')) {
                newclass.parent = parent;
            }
            // APPLYING PROPERTIES.
            for (var prop in properties) {
                if (properties.hasOwnProperty(prop)) {
                    newclass.properties[prop] = properties[prop];
                }
            }
            // APPLYING PSEUDOS.
            for (var psdo in pseudos) {
                if (pseudos.hasOwnProperty(psdo)) {
                    newclass.pseudo[psdo] = pseudos[psdo];
                }
            }
            // APPLYING CLASS.
            if (newclass.name === newclass.family) {
                TocmConfig.autowrite = true;
            }
            newclass.apply();
            // RETURNING CLASS.
            return newclass;
        }
    };
    // CREATING WRPAPPER //
    window.$global = function (selector, props, media) {
        return new TocmBatchClass(selector, props, media, 'global');
    };
    // CREATE A TOCM SELECTOR AND CREATOR WRAPPER.
    window.$class = window.Tocm = function (select, omedia, media) {
        // Ensure the selector/class pattern is string.
        if (typeOf(select) === 'string') {
            // If 'omedia' is string, then use it as media to select class.
            if (typeOf(omedia) === 'string') {
                return new TocmSelector(select, omedia);
            }
            // Else if 'omedia' is object, then use it as object to create class.
            else if (typeOf(omedia) === 'object') {
                // If the 'media' is string, then use it as media to create class.
                if (typeOf(media) === 'string' && media !== 'none') {
                    return new TocmBatchClass(select, omedia, media);
                }
                // Else, just create class as universal class.
                else {
                    return new TocmBatchClass(select, omedia);
                }
                // Writing CSS if the auto write is true.
                if (TocmConfig.autowrite === true) {
                    // TocmBuilder.writeSCS();
                }
            }
            // Else, just select class with no media.
            else {
                return new TocmSelector(select);
            }
        }
    };

    // CREATING MODULE WRAPPER.
    window.Tocm.module = TocmClass.prototype = {
        // CREATING FUNCTION TO APPLY CHANGES.
        apply: function () {
            if (this.hasOwnProperty('name')) {
                if (this.media !== 'none') {
                    TocmMedClass[this.media][this.name] = this;
                } else {
                    TocmDefClass[this.name] = this;
                }
                if (TocmConfig.autowrite === true) {
                    new TocmLogger('TocmClass', 'Writing class "' + this.name + '" changes to style node.', 'orange');
                    TocmBuilder.writeSCS(this);
                }
            }
            return this;
        },
        write: function () {
            TocmBuilder.writeSCS();
            return this;
        }
    };
    // HIDING CORE MODULE.
    Object.defineProperty(Tocm.module, 'apply', {enumerable: false});
    Object.defineProperty(Tocm.module, 'write', {enumerable: false});
    
    // CREATING MODULE SETTER.
    Tocm.defineModule = function (name, func) {
        if (typeOf(name) === 'string' && typeOf(func) === 'function') {
            Tocm.module[name] = func;
            Object.defineProperty(Tocm.module, name, {enumerable: false});
            return Tocm.module[name];
        }
    };
    // CREATING LAYOUT DEBUGGER.
    Tocm.debugLayout = function (linecolor) {
        if (typeOf(linecolor) !== 'string' || linecolor.match(/\#/)) {
            linecolor = '#f00';
        }
        $class('!*', {box_shadow: '0 0 0 1px ' + linecolor});
    };
})(window);

// CREATING TOCM MODULES.
(function (Tocm) {
    'use strict';
    // MODULE TO ASSIGN PROPERTIES.
    Tocm.module.set = function (objkey, value) {
        // DO ACTIONS ONLY IF THIS OBJECT IS TOCM CLASS.
        if (this.hasOwnProperty('name') && this.hasOwnProperty('properties')) {
            var key;
            // DO ACTIONS ONLY IF THE ARGUMENTS IS VALID TYPE.
            if (typeOf(objkey) === 'object') {
                for (key in objkey) {
                    if (objkey.hasOwnProperty(key)) {
                        this.properties[key] = objkey[key];
                    }
                }
            } else if (typeOf(objkey) === 'string' && typeOf(value) === 'string') {
                this.properties[objkey] = value;
            }
            // APPLYING CHANGES.
            this.apply();
        }
        return this;
    };
    // MODULE TO ASSIGN PSEUDO PROPERTIES.
    Tocm.module.on = function (pseudo, props) {
        var key;
        // DO ACTIONS ONLY IF ALL ARGUMENTS WAS DEFINED WITH TRUE TYPE AND IF THIS CLASS IS TOCM CLASS.
        if (typeOf(pseudo) === 'string' && typeOf(props) === 'object' && this.hasOwnProperty('name')) {
            if (pseudo.search('&') > -1) {
                pseudo = pseudo.replace(/\s+(\&)\s+/g, '&');
                pseudo = pseudo.split('&');
                for (var i = 0; i < pseudo.length; ++i) {
                    if (this.media !== 'none') {
                        this.on(pseudo[i], props);
                    } else {
                        this.on(pseudo[i], props);
                    }
                }
            } else {
                // DEFINE NEW PSEUDO IF UNDEFINED.
                if (typeOf(this.pseudo[pseudo]) === 'undefined') {
                    this.pseudo[pseudo] = {};
                }
                // APPLYING PROPERTIES TO PSEUDO.
                for (key in props) {
                    if (props.hasOwnProperty(key)) {
                        this.pseudo[pseudo][key] = props[key];
                    }
                }
                // APPLYING CHANGES.
                this.apply();
            }
        }
        return this;
    };
    // MODULE TO IMPORT PROPERTIES FROM ANOTHER CLASS.
    Tocm.module.copy = function (name, media, psdo) {
        var parent, key, ppsdo;
        if (typeOf(name) === 'string') {
            if (typeOf(media) === 'string' && media !== '' && media !== 'none') {
                parent = new TocmClass(name, media);
            } else {
                parent = new TocmClass(name);
            }

            for (key in parent.properties) {
                if (parent.properties.hasOwnProperty(key)) {
                    this.properties[key] = parent.properties[key];
                }
            }

            if (typeOf(psdo) === 'string') {
                if (parent.pseudo.hasOwnProperty(psdo)) {
                    ppsdo = parent.pseudo[psdo];
                    for (key in ppsdo) {
                        if (ppsdo.hasOwnProperty(key)) {
                            if (!this.pseudo.hasOwnProperty(psdo)) {
                                this.pseudo[psdo] = {};
                            }
                            this.pseudo[psdo][key] = ppsdo[key];
                        }
                    }
                }
            }
            this.apply();
        }
        return this;
    };
    // MODULE TO ADD CHILD CLASS. 
    Tocm.module.add = function (name, prop) {
        var newname = this.name + ' ';
        if (typeOf(name) === 'string') {
            if (name.search('&')) {
                name = name.replace(/\s+(\&)\s+/g, '&');
                name = name.split('&');
                for (var i = 0; i < name.length - 1; ++i) {
                    newname += name[i] + ', ' + this.name + ' ';
                }
                newname += name[name.length - 1];
            }
        }
        var newclass = $class(newname, prop, this.media);
        if (newclass.hasOwnProperty('name')) {
            newclass.family = this.family;
            newclass.parent = this;
            newclass.config.write_area = 'family';
            var doc = document.getElementById(newclass.name);
            if (doc) {
                doc.parentNode.removeChild(doc);
            }
            newclass.apply();
            return newclass;
        } else {
            return this;
        }
    };
    // MOODULE TO NAVIGATE TO OTHER CLASS.
    Tocm.module.goto = function (name) {
        var fclass = new TocmClass(this.name + ' ' + name, this.media);
        if (fclass.hasOwnProperty('name')) {
            return fclass;
        } else {
            return this;
        }
    };
    // MODULE TO GO BACK TO PARENT CLASS.
    Tocm.module.back = function () {
        if (this.hasOwnProperty('parent') && this.parent.hasOwnProperty('name')) {
            return this.parent;
        } else {
            return this;
        }
    };
    
    // HIDING MODULES.
    var mod = ['set', 'on', 'copy', 'add', 'goto', 'back'];
    for (var i = 0; i < mod.length; ++i) {
        Object.defineProperty(Tocm.module, mod[i], {
            enumerable: false
        });
    }
})(Tocm);

// CREATING GLOBAL REFERENCES.
(function (window) {
    'use strict';
    window.rgb = function (hexColor, opacity, rtype) {
        var shorthandRegex, result, objRgb, isPrs;

        // Expand shorthand form (e.g. '03F') to full form (e.g. '0033FF')
        shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hexColor = hexColor.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });

        result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);

        objRgb = {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        };

        if (opacity && typeOf(opacity) === 'string') {
            isPrs = opacity.search('%');

            if (isPrs !== -1) {
                opacity = opacity.replace('%', '');
                opacity = Number(opacity) / 100;
            }
            objRgb.o = opacity;
        } else if (opacity && typeOf(opacity) === 'number') {
            objRgb.o = opacity;
        }

        if (!rtype || rtype !== 'object') {
            result = objRgb.r + ', ' + objRgb.g + ', ' + objRgb.b;
            if (objRgb.o) {
                result = 'rgba(' + result + ', ' + objRgb.o + ')';
            } else {
                result = 'rgb(' + result + ')';
            }

            return result;
        } else {
            return objRgb;
        }
    };
    var Gradient = function (value, mode) {
        var gstr = '', vendor = TocmRef.vendor, type;
        if (typeOf('mode') === 'string') {
            mode += '-gradient';
            gstr += mode + '(' + value + '); ';
        } else {
            mode = 'gradient';
        }
        if (typeOf(value) === 'string') {
            for (var i = 0; i < vendor.length; ++i) {
                gstr += vendor[i] + mode + '(' + value + '); ';
            }
            return gstr;
        } else {
            return 'none';
        }
    };
    window.gradient = Gradient;
    window.linear_gradient = function (value) {
        return gradient(value, 'linear');
    };
    window.radial_gradient = function (value) {
        return gradient(value, 'radial');
    };
})(window);

// CREATING CONFIGURATION AND COLLECTIONS.
(function (window) {
    'use strict';
    window.TocmTimeline = {};
    if (!TocmConfig) {
        window.TocmConfig = {};
    }
    TocmConfig.animation = {
        duration: 0,
        timing: 'linear',
        delay: 0,
        repeat: 1,
        direction: 'normal',
        state: 'running',
        inherit: true,
        endNode: '',
        endTime: 0
    };
})(window);

// CREATING CONSTRUCTOR.
(function (window) {
    'use strict';
    // CREATING ENUMERATOR.
    var _writeAnimation = function (name, property, preconf, timeline) {
        if (typeOf(name) === 'string' && typeOf(property) === 'object') {
            // GETTING CONFIGURATIONS.
            var conf        = Object.keys(TocmConfig.animation),
                config      = TocmConfig.animation;
            
            // CREATING USABLE VARIABLES.
            var csstring = '',
                keyframe = '',
                cssclass = '';
            var atab = '\t',
                btab = '\t\t',
                ctab = '\t\t\t',
                open = ' {\n',
                line = ';\n',
                close = '}\n';
            
            // CREATING ANIMATION OBJECT.
            var animation = property, inherited = {}, selftimeline = {};
            
            // CREATING ANIMATION CONFIGURATIONS.
            if (!animation.duration) {
                if (typeOf(preconf) === 'object') {
                    animation.duration = preconf.duration;
                } else {
                    animation.duration = config.duration;
                }
            }
            if (!animation.timing) {
                if (typeOf(preconf) === 'object') {
                    animation.timing = preconf.timing;
                } else {
                    animation.timing = config.timing;
                }
            }
            if (!animation.delay) {
                if (typeOf(preconf) === 'object') {
                    animation.delay = preconf.delay;
                } else {
                    animation.delay = config.delay;
                }
            }
            if (!animation.repeat) {
                if (typeOf(preconf) === 'object') {
                    animation.repeat = preconf.repeat;
                } else {
                    animation.repeat = config.repeat;
                }
            }
            if (!animation.direction) {
                if (typeOf(preconf) === 'object') {
                    animation.direction = preconf.direction;
                } else {
                    animation.direction = config.direction;
                }
            }
            if (!animation.state) {
                if (typeOf(preconf) === 'object') {
                    animation.state = preconf.state;
                } else {
                    animation.state = config.state;
                }
            }
            if (typeOf(animation.inherit) !== 'boolean') {
                if (typeOf(preconf) === 'object') {
                    animation.inherit = preconf.inherit;
                } else {
                    animation.inherit = config.inherit;
                }
            }
            
            // CREATING TIMELINE.
            if (typeOf(timeline) === 'object' && animation.inherit === true) {
                for (var x in timeline) {
                    if (timeline.hasOwnProperty(x)) {
                        selftimeline[x.replace(/\%/g, '')] = timeline[x];
                    }
                }
            }
            for (var time in animation) {
                if (animation.hasOwnProperty(time) && time.match(/\%/g)) {
                    selftimeline[time.replace(/\%/g, '')] = animation[time];
                }
            }
            
            // SORTING TIMELINE.
            selftimeline = selftimeline.sort('STH');
            
            // CREATING CSS KEYFRAMES STRING.
            // Opening keyframes.
            keyframe += atab + '@keyframes ' + name.replace(/\./g, '_').replace(/\s/g, '').replace(/\#/g, '_') + open;
            // Adding keyframes properties.
            for (time in selftimeline) {
                if (selftimeline.hasOwnProperty(time)) {
                    inherited[time] = selftimeline[time];
                    
                    keyframe += btab + time + '%' + open;
                    keyframe += TocmBuilder.generateCSS(selftimeline[time], ctab);
                    keyframe += btab + close;
                }
            }
            // Closing keyframes.
            keyframe += atab + close;
            // Opening keyframes.
            keyframe += atab + '@-webkit-keyframes ' + name.replace(/\./g, '_').replace(/\s/g, '').replace(/\#/g, '_') + open;
            // Adding keyframes properties.
            for (time in selftimeline) {
                if (selftimeline.hasOwnProperty(time)) {
                    keyframe += btab + time + '%' + open;
                    keyframe += TocmBuilder.generateCSS(selftimeline[time], ctab);
                    keyframe += btab + close;
                }
            }
            // Closing keyframes.
            keyframe += atab + close;

            // CREATING CSS CLASS STRING.
            // Opening selector.
            cssclass += atab + name + open;
            // Adding animation properties.
            cssclass += btab + 'animation: ' + name.replace(/\./g, '_').replace(/\s/g, '').replace(/\#/g, '_') + ' ' + animation.duration + 's ' + animation.timing + ' '  + animation.delay + 's ' + animation.repeat + ' ' + animation.direction + ';\n';
            cssclass += btab + 'animation-play-state: ' + animation.state + ';\n';
            cssclass += btab + '-webkit-animation: ' + name.replace(/\./g, '_').replace(/\s/g, '').replace(/\#/g, '_') + ' ' + animation.duration + 's ' + animation.timing + ' '  + animation.delay + 's ' + animation.repeat + ' ' + animation.direction + ';\n';
            cssclass += btab + '-webkit-animation-play-state: ' + animation.state + ';\n';
            // Closing selector
            cssclass += atab + close;
            
            // ADDING GENERATED CLASS AND KEYFRAME TO CSS STRING.
            csstring += keyframe + '\n' + cssclass + '\n';
            
            // ITERATING CHILD ANIMATIONS.
            for (var child in animation) {
                if (animation.hasOwnProperty(child) && child.match(/\%/g) === null && conf.indexOf(child) < 0) {
                    csstring += _writeAnimation(name + ' ' + child, animation[child], {
                        duration: animation.duration,
                        timing: animation.timing,
                        delay: animation.delay,
                        repeat: animation.repeat,
                        direction: animation.direction,
                        state: animation.state,
                        inherit: animation.inherit
                    }, inherited);
                }
            }
            return csstring;
        } else {
            return '';
        }
    };
    
    // CREATING CORE CONSTRUCTOR.
    var TocmAnimation = function (name, properties) {
        if (typeOf(name) === 'string' && !name.match(/[\!\@\#\$\%\^\&\*\.\,\:\;]+/)) {
            if (typeOf(properties) === 'object') {
                new TocmLogger('TocmAnimation', 'Creating new animation "' + name + '".');
                this.name = name;
                for (var key in properties) {
                    if (properties.hasOwnProperty(key)) {
                        this[key] = properties[key];
                    }
                }
                this.apply();
                return this;
            } else {
                return TocmTimeline[name];
            }
        }
    };
    
    // REGISTERING TO WINDOW OBJECT AND CREATING MODULE WRAPPER.
    window.$animation = window.TocmAnimation = function (name, properties) {
        return new TocmAnimation(name, properties);
    };
    window.TocmAnimation.module = TocmAnimation.prototype = {
        apply: function () {
            // Getting the larger runtime.
            this.last();
            // Hiding Properties.
            var x = ['endNode', 'endTime', 'name'];
            for (var i = 0; i < x.length; ++i) {
                if (this.hasOwnProperty(x[i])) {
                    Object.defineProperty(this, x[i], {enumerable: false});
                }
            }
            // Adding animation object to Timeline.
            TocmTimeline[this.name] = this;
            // Build the animation.
            new TocmLogger('TocmAnimation', 'Writing animation "' + this.name + '" to style node.', 'orange');
            TocmBuilder.writeDOM(this.name, 'animation', _writeAnimation('.' + this.name, JSON.parse(JSON.stringify(this))));
            return this;
        },
        // FUNCTION TO GET LAST ANIMATED CLASS.
        last: function () {
            var conf = Object.keys(TocmConfig.animation),
                config = TocmConfig.animation;
            
            var endTime = config.endTime,
                endNode = config.endNode;
            
            var inherit = function (animation, preconf) {
                if (typeOf(animation) === 'object') {
                    // CREATING ANIMATION CONFIGURATIONS.
                    if (!animation.duration) {
                        if (typeOf(preconf) === 'object') {
                            animation.duration = preconf.duration;
                        } else {
                            animation.duration = config.duration;
                        }
                    }
                    if (!animation.delay) {
                        if (typeOf(preconf) === 'object') {
                            animation.delay = preconf.delay;
                        } else {
                            animation.delay = config.delay;
                        }
                    }
                    if (!animation.repeat) {
                        if (typeOf(preconf) === 'object') {
                            animation.repeat = preconf.repeat;
                        } else {
                            animation.repeat = config.repeat;
                        }
                    }
                }
                return animation;
            };

            var nobj = JSON.parse(JSON.stringify(this));
            nobj = inherit(nobj);
            
            var gLast = function (obj) {
                if (typeOf(obj) !== 'object') return;
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if (key === 'duration') {
                            var hX = obj.duration;
                            if (obj.hasOwnProperty('delay') && hX > 0) {
                                hX += obj.delay;
                            }
                            if (hX > endTime) {
                                if (obj.hasOwnProperty('repeat')) {
                                    if (obj.repeat === 'infinite') {
                                        new TocmLogger('TocmAnimation', '"' + obj.name + '": using infinite play and it\'s mean never stoped. Now skipping end-point node.', 'purple');
                                        endTime = 0;
                                        endNode = '';
                                    } else if (obj.repeat > 0) {
                                        new TocmLogger('TocmAnimation', '"' + obj.name + '": takes ' + (hX * obj.repeat) + 's to finish run. It\'s larger than current largest time: "' + endTime + 's". Now use it as end-point node.', 'purple');
                                        endTime = hX * obj.repeat;
                                        endNode = obj.name;
                                    }
                                } else {
                                    new TocmLogger('TocmAnimation', '"' + obj.name + '": takes ' + hX + 's to finish run. It\'s larger than current largest time: "' + endTime + 's". Now use it as end-point node.', 'purple');
                                    endTime = hX;
                                    endNode = obj.name;
                                }
                            } else {
                                new TocmLogger('TocmAnimation', '"' + obj.name + '": takes ' + hX + 's to finish run. It\'s smaller or equal to current largest time: "' + endTime + 's". Now skip it.', 'purple');
                            }
                        } else if (typeOf(obj[key]) === 'object' && !key.match(/\%/g) && conf.indexOf(key) < 0) {
                            var xobj = obj[key];
                            xobj.name = key;
                            xobj = inherit(xobj, obj);
                            gLast(xobj);
                        }
                    }
                }
            };
            
            gLast(nobj);
            
            this.endNode = endNode;
            this.endTime = endTime;
            
            return this;
        }
    };
})(window);

// CREATING EVENT.
(function ($event) {
    'use strict';
    $event.onRun = [];
    $event.onEnd = [];
})(TocmAnimation.module);

// CREATING MODULES.
(function ($module) {
    'use strict';
    // FUNCTION TO ADD CHILD ANIMATION.
    $module.add = function (name, properties) {
        new TocmLogger('TocmAnimation', 'Adding new animation "' + name + '" to parent animation "' + this.name + '".');
        if (typeOf(name) === 'string' && typeOf(properties) === 'object') {
            this[name] = properties;
            this.apply();
            return this;
        }
    };
    // FUNCTION TO PAUSE ANIMATION.
    $module.pause = function (delay) {
        new TocmLogger('TocmAnimation', 'Pausing animation "' + this.name + '".');
        this.state = 'paused';
        this.apply();
        var target = this;
        if (typeOf(delay) === 'number') {
            setTimeout(function () {
                target.play();
            }, (delay * 1000));
        }
        return this;
    };
    // FUNCTION TO CONTINUE ANIMATION.
    $module.play = function () {
        new TocmLogger('TocmAnimation', 'Playing animation "' + this.name + '".');
        this.state = 'running';
        this.apply();
        return this;
    };
    // FUNCTION TO SET PROPERTIES OR CONFIGURATIONS.
    $module.set = function (property, value) {
        new TocmLogger('TocmAnimation', 'Setting property to animation "' + this.name + '".', 'green');
        if (typeOf(property) === 'string') {
            var recset = function (object, prop) {
                for (var key in prop) {
                    if (prop.hasOwnProperty(key)) {
                        if (typeOf(prop[key]) === 'object') {
                            if (!object[key]) {
                                object[key] = {};
                            }
                            recset(object[key], prop[key]);
                        } else {
                            object[key] = prop[key];
                        }
                    }
                }
            };
            
            if (typeOf(value) === 'object') {
                if (!this[property]) {
                    this[property] = {};
                }
                recset(this[property], value);
            } else {
                this[property] = value;
            }
            new TocmLogger('TocmAnimation', 'Applying changes to animation "' + this.name + '".', 'purple');
            this.apply();
        } else if (typeOf(property) === 'object') {
            for (var name in property) {
                if (property.hasOwnProperty(name)) {
                    this.set(name, property[name]);
                }
            }
        }
        this.pause(0.01);
        return this;
    };
    // FUNCTION TO DELETE ANIMATION.
    $module.remove = function () {
        new TocmLogger('TocmAnimation', 'Removing animation "' + this.name + '".', 'red');
        delete TocmTimeline[this.name];
        var node = $.path('#' + this.name.replace(/\./g, ''))[0];
        node.parentNode.removeChild(node);
        return [];
    };
    
    // HIDING MODULES.
    var mod = Object.keys($module);
    for (var i = 0; i < mod.length; ++i) {
        Object.defineProperty(TocmAnimation.module, mod[i], {enumerable: false});
    }
})(TocmAnimation.module);

// CREATING SELECTOR.
(function(window) {
    'use strict';
    // CREATING XPATH SELECTOR.
    var XPathSelector = function (pattern) {
        var item, search, result = [];
        if (typeOf(pattern) === 'string') {
            search = document.evaluate(pattern, document, null, XPathResult.ANY_TYPE, null);
            while (item = search.iterateNext()) {
                result.push(item);
            }
        }
        return result;
    };
    
    // CREATING CORE SELECTOR.
    var TocmQuery = function (pattern) {
        var doms = [], i;
        // GETTING PATTERN TYPE.
        if (typeOf(pattern) === 'string') {
            // Adding global select (//) if not defined.
            var subs = pattern.substr(0,1);
            if (subs !== '/' && subs !== '//') {
                pattern =  '//' + pattern;
            }
            // Fixing slash-space.
            pattern = pattern.replace(/\s?\/\s?/g, '/');
            pattern = pattern.replace(/\s?\|\s?/g, '| ');
            // Replacing space with global select (//).
            pattern = pattern.replace(/\s/g, '//');
            
            // Creating RegExp Pattern.
            var pregmatch = [
                /(\@)([a-zA-Z\d\-\_]+)(\=)([\#\a-zA-Z\d\-\_]+)/, // Attribute Equal To.
                /(\@)([a-zA-Z\d\-\_]+)(!=)([\#\a-zA-Z\d\-\_]+)/, // Attribute Not Equal To.
                /(\@)([a-zA-Z\d\-\_]+)(\?)([\#\a-zA-Z\d\-\_]+)/, // Attribute Contains.
                /(\@)([a-zA-Z\d\-\_]+)(\!)([\#\a-zA-Z\d\-\_]+)/, // Attribute Not Contains.

                /(\#)([a-zA-Z\d\-\_]+)/, // ID Contains.
                /(\.)([a-zA-Z\d\-\_]+)/, // Class Contains.
                /(\@)([a-zA-Z\d\-\_]+)/, // Name Contains.
                /(\:)([\d]+)/, // Index Number.
                
                /(#!)([a-zA-Z\d\-\_]+)/, // ID NOT Contains.
                /(.!)([a-zA-Z\d\-\_]+)/, // Class NOT Contains.
                /(@!)([a-zA-Z\d\-\_]+)/ // Name NOT Contains.
            ];
            // Creating Pattern Replace to meet with XPath Pattern.
            var pregrepl = [
                '[^$2="$4"]',
                '[^$2!="$4"]',
                '[contains(^$2, "$4")]',
                '[not(contains(^$2, "$4"))]',

                '[contains(concat(" ", ^id, " "), " $2 ")]',
                '[contains(concat(" ", ^class, " "), " $2 ")]',
                '[contains(concat(" ", ^name, " "), " $2 ")]',
                '[$2]',

                '[not(contains(concat(" ", ^id, " "), " $2 "))]',
                '[not(contains(concat(" ", ^class, " "), " $2 "))]',
                '[not(contains(concat(" ", ^class, " "), " $2 "))]'
            ];
            // Creating XPath Pattern.
            for (i = 0; i < pregmatch.length; ++i) {
                if (pattern.match(pregmatch[i])) {
                    pattern = pattern.preg_replace(pregmatch[i], pregrepl[i]);
                }
            }
            // Replacing temp '^' to '@'.
            pattern = pattern.replace(/\^/g, '@');
            // Replacing '/[' to '/*[' to fix XPath String.
            pattern = pattern.replace(/\/\[/g, '/*[');
            // Replacing triple slash '///' to fix XPath String.
            pattern = pattern.replace(/\/\/\//g, '//');
            //console.log(pattern);
            
            // Selecting Dom Element.
            doms = new XPathSelector(pattern);
            return Zepto(doms);
        } else {
            return Zepto('');
        }
    };
    // ADDING TOCMQUERY TO WINDOW.
    window.$path = window.TocmQuery = TocmQuery;
})(window);

// CREATING TOCM TASK LIBRARY.
(function (window) {
    'use strict';
    window.TocmRegistry = {
        EventLibrary: {
            DOMEvent: {},
            IOEvent: {}
        },
        TaskLibrary: {
            Task: {
                length: 0,
                splice: function () {}
            },
            Listener: {
                length: 0,
                splice: function() {}
            }
        }
    };
})(window);

// CREATING TASK CONSTRUCTOR.
(function (window) {
    'use strict';
    // CREATING TASK LISTENER.
    var listenTask = function (tsid, time) {
        if (typeOf(tsid) === 'number') {
            var listener = TocmRegistry.TaskLibrary.Listener,
                tasklist = TocmRegistry.TaskLibrary.Task,
                task = tasklist[tsid];
            
            if (typeOf(time) === 'number') {
                listener[tsid] = setTimeout(function () {
                    task.call();
                }, time);
                
                listener.length++;
            } else if (typeOf(task.nextRun === 'number') && task.nextRun > 0) {
                listener[tsid] = setTimeout(function () {
                    task.call();
                }, task.nextRun);
                
                listener.length++;
            } else if (typeOf(task.nextRun) === 'string') {
                var nexd = new Date(task.nextRun).getTime();
                var curd = new Date().getTime();
                var tdur = nexd - curd;
                
                if (tdur > 0) {
                    listener[tsid] = setTimeout(function () {
                        task.call();
                    }, tdur);
                    
                    listener.length++;
                } else {
                    task.status = 'stopped';
                }
            }
        }
    };
    var unlistenTask = function (tsid) {
        var listener = TocmRegistry.TaskLibrary.Listener;
        
        if (listener[tsid]) {
            clearTimeout(listener[tsid]);
            delete listener[tsid];
            listener.length--;
        }
    };
    
    // CREATING TASK BUILDER.
    var TocmTask = function (name) {
        var task = TocmRegistry.TaskLibrary.Task;
        if (typeOf(name) === 'string') {
            new TocmLogger('TocmTask', 'Creating new task "' + name + '".');
            // Handle if task already exist.
            for (var i = 0; i < task.length; ++i) {
                if (task[i].name === name) {
                    new TocmLogger('TocmTask', 'Task "' + name + '" is already exist. Now return it.', 'orange');
                    return task[i];
                }
            }
            // Increasing task length.
            task.length++;
            // Configuring new task.
            this.name = name;
            this.tsid = (task.length - 1);
            this.status = 'init';
            this.runtime = '';
            this.nextRun = this.lastRun = this.trigger = '';
            
            this.actions = [];
            
            task[this.tsid] = this;
            new TocmLogger('TocmTask', 'Task "' + name + '" has been created.', 'green');
        }
        return this;
    };
    
    // CREATING TASK HANDLER.
    // ------------------------------------------------------
    // Handling actions.
    var actionHandler = function (task) {
        new TocmLogger('TocmTask', 'Running task "' + task.name + '".', 'orange');
        task.status = 'running';
        // Handling task onCall event.
        if (typeOf(task.onCall) === 'function') task.onCall(task);
        
        // Getting the actions.
        var action = task.actions;
        // Enumerating actions.
        try {
            // Trying to trigger actions.
            for (var i = 0; i < action.length; ++i) {
                new TocmLogger('TocmTask', 'Triggering action "' + action[i].name + '".');
                action[i](task);
                new TocmLogger('TocmTask', 'Action "' + action[i].name + '" has been triggered.', 'green');
            }
        } catch(e) {
            // If error occurs while triggering actions, then call the onFail handler and stop the task.
            task.status = 'failed';
            if (typeOf(task.onFail) === 'function') task.onFail(task);
            
            new TocmLogger('TocmTask', e.message, 'red', true);
        } finally {
            if (task.status !== 'failed') {
                task.status = 'ready';
                task.lastRun = new Date().format('dn mn %D, %Y %h:%m:%s');
                
                if (typeOf(task.onLoad) === 'function') task.onLoad(task);
                
                new TocmLogger('TocmTask', 'Task "' + task.name + '" finished running. Now it\'s ready for next run.', 'green');
                task.init();
                listenTask(task.tsid);
            }
        }
    };
    // Handling realtime task.
    var realtimeHandler = function (task) {
        // Set up the next run time.
        task.nextRun = 5;
        // Change task status.
        task.status = 'ready';

        return task;
    };
    // Handling immediate task.
    var immediateHandler = function (task) {
        // Turn off task.
        task.nextRun = 0;
        // Change task status.
        task.status= 'ready';

        return task;
    };
    // Handling delayed task.
    var delayedHandler = function (task) {
        // Getting current date in milliseconds.
        var curnMil = new Date().getTime();
        var nextMil;
        
        // Getting trigger.
        var trigger = task.trigger;
        var trigarr = trigger.split(' ');
        // Parsing trigger.
        if (trigarr.length > 1 && trigarr[0] === 'every') {
            var pat = trigarr[1].split(/([\d\.]+)/);
            pat[1] = Number(pat[1]);
            switch(pat[2]) {
                case 's':
                    nextMil = (pat[1] * 1000);
                    break;
                case 'm':
                    nextMil = (pat[1] * 60 * 1000);
                    break;
                case 'h':
                    nextMil = (pat[1] * 60 * 60 * 1000);
                    break;
                case 'd':
                    nextMil = (pat[1] * 60 * 60 * 24 * 1000);
                    break;
                case 'w':
                    nextMil = (pat[1] * 60 * 60 * 24 * 7 * 1000);
                    break;
                default:
                    nextMil = 0;
                    break;
            }
        }

        task.nextRun = new Date(curnMil + nextMil).format('dn mn %D, %Y %h:%m:%s');
        // Change task status.
        task.status = 'ready';
        
        return task;
    };
    // Handling scheduled task.
    var scheduledHandler = function (task) {
        var nextRun, lowTime, higTime;
        var nextDay = Number(new Date().toJulian().toDate('D')) + 1;
        var curTime = new Date().getTime();
        
        var trigger = task.trigger;
        var trigarr = trigger.split(/\s/);
        if (trigarr.length > 1) {
            switch(trigarr[0]) {
                case 'daily':
                    if (trigarr[1] === 'at') {
                        // Handling invalid time format.
                        if (!trigarr[2].match(/[\d]+\:[\d]+$/)) {
                            task.nextRun = 0;
                            task.status = 'failed';
                            new TocmLogger('TocmTask', 'Invalid time format "' + trigarr[2] + '" on "' + trigger + '". Task "' + task.name + '" terminated.', 'red', true);
                            break;
                        }
                        
                        // Trying schedule time for today.
                        nextRun = new Date(new Date().format('%M-%D-%Y ' + trigarr[2]));
                        // If time now is higher than scheduled time, then reschedule time for next day.
                        if (nextRun.getTime() <= curTime) {
                            nextRun = new Date(new Date().format('%M-' + nextDay + '-%Y ' + trigarr[2]));
                        }
                        
                        task.nextRun = nextRun.format('dn mn %D, %Y %h:%m:%s');
                        task.status = 'ready';
                    } else if (trigarr[1] === 'between') {
                        // Handling invalid time format.
                        if (!trigarr[2].match(/^[\d]{2}\:[\d]{2}$/) || trigarr[3] !== 'and' || !trigarr[4].match(/^[\d]{2}\:[\d]{2}$/)) {
                            task.nextRun = 0;
                            task.status = 'failed';
                            new TocmLogger('TocmTask', 'Invalid time format on "' + trigger + '". Task "' + task.name + '" terminated.', 'red', true);
                            break;
                        }
                        
                        lowTime = new Date(new Date().format('%M-%D-%Y ' + trigarr[2]));
                        higTime = new Date(new Date().format('%M-%D-%Y ' + trigarr[4]));
                        
                        if (curTime > higTime.getTime()) {
                            // Schedule time to next day if current time is higher than max range time.
                            nextRun = new Date(new Date().format('%M-' + nextDay + '-%Y ' + trigarr[2]));
                        } else if (curTime < lowTime.getTime()) {
                            // Schedule time to today if current time is lower than min range time.
                            nextRun = new Date(new Date().format('%M-%D-%Y ' + trigarr[2]));
                        } else if (curTime >= lowTime.getTime() && curTime <= higTime.getTime()) {
                            // Convert it to realtime task if current time is in time range.
                            nextRun = 15;
                        }

                        if (typeOf(nextRun) === 'date') {
                            task.nextRun = nextRun.format('dn mn %D, %Y %h:%m:%s');
                        } else if (typeOf(nextRun) === 'number') {
                            task.nextRun = nextRun;
                        }

                        task.status = 'ready';
                    } else {
                        new TocmLogger('TocmTask', 'Invalid time format on "' + trigger + '". Task "' + task.name + '" terminated.', 'red', true);
                    }
                    break;
                case 'weekly':
                    // Creating the day of week.
                    var weekDay;
                    var week = new Date().toJulian().toDate('w');
                    if (trigarr[1] === 'on') {
                        weekDay = trigarr[2];
                    } else {
                        weekDay = 'Sun';
                    }
                    // Getting date on week by the day.
                    var tgTime = new Date().dateOfWeek(week, weekDay);
                    // Forward for next week if current date has left the target date.
                    if (new Date(curTime).getDate() > tgTime.getDate()) {
                        tgTime = new Date().dateOfWeek((week + 1), weekDay);
                    }
                    
                    if (trigarr[3] === 'at') {
                        // Handling invalid time format.
                        if (!trigarr[4].match(/[\d]+\:[\d]+$/)) {
                            task.nextRun = 0;
                            task.status = 'failed';
                            new TocmLogger('TocmTask', 'Invalid time format "' + trigarr[4] + '" on "' + trigger + '". Task "' + task.name + '" terminated.', 'red', true);
                            break;
                        }
                        
                        // Trying schedule time for today.
                        nextRun = new Date(tgTime.format('%M-%D-%Y ' + trigarr[4]));
                        // If time now is higher than scheduled time, then reschedule time for next day.
                        if (nextRun.getTime() <= curTime) {
                            tgTime = new Date().dateOfWeek((week + 1), weekDay);
                            nextRun = new Date(tgTime.format('%M-%D-%Y ' + trigarr[4]));
                        }
                        
                        task.nextRun = nextRun.format('dn mn %D, %Y %h:%m:%s');
                        task.status = 'ready';
                    } else if (trigarr[3] === 'between') {
                        // Handling invalid time format.
                        if (!trigarr[4].match(/^[\d]{2}\:[\d]{2}$/) || trigarr[5] !== 'and' || !trigarr[6].match(/^[\d]{2}\:[\d]{2}$/)) {
                            task.nextRun = 0;
                            task.status = 'failed';
                            new TocmLogger('TocmTask', 'Invalid time format on "' + trigger + '". Task "' + task.name + '" terminated.', 'red', true);
                            break;
                        }
                        
                        lowTime = new Date(tgTime.format('%M-%D-%Y ' + trigarr[4]));
                        higTime = new Date(tgTime.format('%M-%D-%Y ' + trigarr[6]));
                        
                        if (curTime > higTime.getTime()) {
                            // Schedule time to next day if current time is higher than max range time.
                            tgTime = new Date().dateOfWeek((week + 1), weekDay);
                            nextRun = new Date(tgTime.format('%M-%D-%Y ' + trigarr[4]));
                        } else if (curTime < lowTime.getTime()) {
                            // Schedule time to today if current time is lower than min range time.
                            nextRun = new Date(tgTime.format('%M-%D-%Y ' + trigarr[4]));
                        } else if (curTime >= lowTime.getTime() && curTime <= higTime.getTime()) {
                            // Convert it to realtime task if current time is in time range.
                            nextRun = 15;
                        }

                        if (typeOf(nextRun) === 'date') {
                            task.nextRun = nextRun.format('dn mn %D, %Y %h:%m:%s');
                        } else if (typeOf(nextRun) === 'number') {
                            task.nextRun = nextRun;
                        }

                        task.status = 'ready';
                    } else {
                        new TocmLogger('TocmTask', 'Invalid time format on "' + trigger + '". Task "' + task.name + '" terminated.', 'red', true);
                    }
                    break;
                default:
                    new TocmLogger('TocmTask', 'Invalid time format on "' + trigger + '". Task "' + task.name + '" terminated.', 'red', true);
                    break;
            }
        }
        
        return task;
    };
    
    // CREATING TASK MODULES.
    TocmTask.prototype = {
        // CREATING TASK INIT.
        init: function () {
            var task;
            this.status = 'init';
            
            if (this.runtime === 'realtime') {
                task = realtimeHandler(this);
            } else if (this.runtime === 'immediate') {
                task = immediateHandler(this);
            } else if (this.runtime === 'delayed') {
                task = delayedHandler(this);
            } else if (this.runtime === 'scheduled') {
                task = scheduledHandler(this);
            } else {
                this.status = 'failed';
            }
            return this;
        },
        call: function () {
            if (this.status === 'ready') {
                unlistenTask(this.tsid);
                actionHandler(this);
            }
            return this;
        },
        // CREATING TASK STARTER.
        run: function (exec) {
            this.init();

            if (exec === true) {
                this.call();
            } else {
                listenTask(this.tsid);
            }

            return this;
        },
        // CREATING TASK STOPPER.
        stop: function () {
            new TocmLogger('TocmTask', 'Stopping task "' + this.name + '".');
            this.status = 'stopped';
            if (TocmRegistry.TaskLibrary.Listener[this.tsid]) {
                clearTimeout(TocmRegistry.TaskLibrary.Listener[this.tsid]);
            }
            new TocmLogger('TocmTask', 'Task "' + this.name + '" has been stopped.');
            return this;
        },
        // CREATING DELAY SETTER.
        repeat: function (trigger) {
            if (typeOf(trigger) === 'string') {
                new TocmLogger('TocmTask', 'Set task "' + this.name + '" as delayed task.');
                unlistenTask(this.tsid);
                this.runtime = 'delayed';
                this.trigger = trigger;
                this.init();
            }
            return this;
        },
        // CREATING REALTIME SETTER.
        realtime: function () {
            new TocmLogger('TocmTask', 'Set task "' + this.name + '" as realtime task.');
            unlistenTask(this.tsid);
            this.runtime = 'realtime';
            this.trigger = '';
            this.init();
            return this;
        },
        schedule: function (trigger) {
            if (typeOf(trigger) === 'string') {
                new TocmLogger('TocmTask', 'Set task "' + this.name + '" as scheduled task.');
                unlistenTask(this.tsid);
                this.runtime = 'scheduled';
                this.trigger = trigger;
                this.init();
            }
            return this;
        },
        immediate: function (time) {
            this.runtime = 'immediate';
            if (typeOf(time) === 'number') {
                new TocmLogger('TocmTask', 'Set task "' + this.name + '" as immediate task.');
                this.init();
                listenTask(this.tsid, time);
            } else {
                new TocmLogger('TocmTask', 'Set task "' + this.name + '" as immediate task and run it immediately since no time defined.');
                this.init();
                this.call();
            }
            return this;
        },
        addAction: function (func) {
            if (typeOf(func) === 'function') {
                new TocmLogger('TocmTask', 'Adding action "' + func.name + '" to task "' + this.name + '".');
                if (this.actions.indexOf(func) < 0) {
                    this.actions.push(func);
                } else {
                    this.actions[this.actions.indexOf(func)] = func;
                }
                new TocmLogger('TocmTask', 'Action "' + func.name + '" has been added to task "' + this.name + '".', 'green');
            }
            return this;
        }
    };
    
    window.$task = window.TocmTask = function (name, runtime) {
        return new TocmTask(name, runtime);
    };
    window.TocmTask.module = window.TocmTask.event = TocmTask.prototype;
})(window);

// EXTENDING JQUERY IDENTIFIER ($).
(function() {
    'use strict';
    var $ = {};
    $.anime = TocmAnimation;
    $.class = Tocm;
    $.media = TocmMedia;
    $.path = TocmQuery;
    $.font = TocmFont;
    $.keyframe = TocmKeyframe;
    $.task = TocmTask;
})();

// CREATING JQUERY PLUGIN.
(function ($) {
    'use strict';
    $.fn.addAnimation = function (name) {
        if (typeOf(name) === 'string') {
            var runNode = this;
            runNode.addClass(name.replace(/\./g, ''));
            
            var anim = $.anime(name);
            var pfx = ["webkit", "moz", "MS", "o", ""], i, x;
            
            if (typeOf(anim.onRun) === 'function' && anim.endNode !== '') {
                for (x = 0; x < runNode.length; ++x) {
                    for (i = 0; i < pfx.length; ++i) {
                        runNode[x].addEventListener(pfx[i] + 'AnimationStart', anim.onRun, false);
                    }
                }
            }
            if (typeOf(anim.onEnd) === 'function' && anim.endNode !== '') {
                for (x = 0; x < runNode.length; ++x) {
                    for (i = 0; i < pfx.length; ++i) {
                        runNode[x].addEventListener(pfx[i] + 'AnimationEnd', anim.onEnd, false);
                    }
                }
            }
            // Automaticaly remove animation when animation endded.
            if (anim.endNode !== '') {
                var remAnim = function () {
                    runNode.removeClass(name.replace(/\./g, ''));
                };
                for (x = 0; x < runNode.length; ++x) {
                    for (i = 0; i < pfx.length; ++i) {
                        runNode[x].addEventListener(pfx[i] + 'AnimationEnd', remAnim, false);
                    }
                }
            }
        }
        return this;
    };
    $.fn.remAnimation = function (name) {
        if (typeOf(name) === 'string') {
            this.removeClass(name.replace(/\./g, ''));
        }
        return this;
    };
})(Zepto);