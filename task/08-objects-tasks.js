'use strict';

/**************************************************************************************************
 *                                                                                                *
 * Plese read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 **************************************************************************************************/


/**
 * Returns the rectagle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    var r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
    this.width = width
    this.height = height
}

Rectangle.prototype.getArea = function() {
    return this.width * this.height
}


/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
    return JSON.stringify(obj)
}


/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    var r = fromJSON(Rectangle.prototype, '{"width":10, "height":20}');
 *
 */
function fromJSON(proto, json) {
    return Object.assign(Object.create(proto), JSON.parse(json))
}


/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurences
 *
 * All types of selectors can be combined using the combinators ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy and implement the functionality
 * to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string repsentation according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple, clear and readable as possible.
 *
 * @example
 *
 *  var builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()  => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()  => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()        =>    'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

// Prototype for BaseElementSelectorFactory() instance
const baseSelectorPrototype = {
    element: function (value) {
        if (
            this.mountedSelectors.includes('id') ||
            this.mountedSelectors.includes('class') ||
            this.mountedSelectors.includes('attribute') ||
            this.mountedSelectors.includes('pseudo-class') ||
            this.mountedSelectors.includes('pseudo-element')
        ) {
            throw new Error(
                'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
            )
        }

        if (this.mountedSelectors.includes('element')) {
            throw new Error(
                'Element, id and pseudo-element should not occur more then one time inside the selector'
            )
        }

        this.mountedSelectors.push('element')
        this.selector += value

        return this
    },

    id: function (value) {
        if (
            this.mountedSelectors.includes('class') ||
            this.mountedSelectors.includes('attribute') ||
            this.mountedSelectors.includes('pseudo-class') ||
            this.mountedSelectors.includes('pseudo-element')
        ) {
            throw new Error(
                'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
            )
        }

        if (this.mountedSelectors.includes('id')) {
            throw new Error(
                'Element, id and pseudo-element should not occur more then one time inside the selector'
            )
        }

        this.mountedSelectors.push('id')
        this.selector += '#' + value

        return this
    },

    class: function (value) {
        if (
            this.mountedSelectors.includes('attribute') ||
            this.mountedSelectors.includes('pseudo-class') ||
            this.mountedSelectors.includes('pseudo-element')
        ) {
            throw new Error(
                'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
            )
        }

        this.mountedSelectors.push('class')
        this.selector += '.' + value

        return this
    },

    attr: function (value) {
        if (
            this.mountedSelectors.includes('pseudo-class') ||
            this.mountedSelectors.includes('pseudo-element')
        ) {
            throw new Error(
                'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
            )
        }

        this.mountedSelectors.push('attribute')
        this.selector += `[${value}]`

        return this
    },

    pseudoClass: function (value) {
        if (this.mountedSelectors.includes('pseudo-element')) {
            throw new Error(
                'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
            )
        }

        this.mountedSelectors.push('pseudo-class')
        this.selector += ':' + value

        return this
    },

    pseudoElement: function (value) {
        if (this.mountedSelectors.includes('pseudo-element')) {
            throw new Error(
                'Element, id and pseudo-element should not occur more then one time inside the selector'
            )
        }

        this.mountedSelectors.push('pseudo-element')
        this.selector += '::' + value

        return this
    },
    
    stringify: function () {
        return this.selector
    }
}

// Factory function for creating base object
function BaseElementSelectorFactory() {
    const mountedSelectors = []
    const selector = ''

    return Object.assign(Object.create(baseSelectorPrototype), {
        selector,
        mountedSelectors
    })
}

const cssSelectorBuilder = {

    element: function(value) {
        return BaseElementSelectorFactory().element(value)
    },

    id: function(value) {
        return BaseElementSelectorFactory().id(value)
    },

    class: function(value) {
        return BaseElementSelectorFactory().class(value)
    },

    attr: function(value) {
        return BaseElementSelectorFactory().attr(value)
    },

    pseudoClass: function(value) {
        return BaseElementSelectorFactory().pseudoClass(value)
    },

    pseudoElement: function(value) {
        return BaseElementSelectorFactory().pseudoElement(value)
    },

    combine: function(selector1, combinator, selector2) {
        selector1.selector = selector1.selector + ` ${combinator} ` + selector2.selector

        return selector1
    },
};


module.exports = {
    Rectangle: Rectangle,
    getJSON: getJSON,
    fromJSON: fromJSON,
    cssSelectorBuilder: cssSelectorBuilder
};
