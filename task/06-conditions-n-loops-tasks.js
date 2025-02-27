'use strict';

/**************************************************************************************************
 *                                                                                                *
 * Plese read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling  *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration              *
 *                                                                                                *
 **************************************************************************************************/


/**
 * Returns the 'Fizz','Buzz' or an original number using the following rules:
 * 1) return original number
 * 2) but if number multiples of three return 'Fizz'
 * 3) for the multiples of five return 'Buzz'
 * 4) for numbers which are multiples of both three and five return 'FizzBuzz'
 *
 * @param {number} num
 * @return {any}
 *
 * @example
 *   2 =>  2
 *   3 => 'Fizz'
 *   5 => 'Buzz'
 *   4 => 4
 *  15 => 'FizzBuzz'
 *  20 => 'Buzz'
 *  21 => 'Fizz'
 *
 */
function getFizzBuzz(num) {
    if (num % 15 === 0) {
        return 'FizzBuzz'
    }
    
    if (num % 3 === 0) {
        return 'Fizz'
    }
    
    if (num % 5 === 0) {
        return 'Buzz'
    }
    
    return num
}


/**
 * Returns the factorial of the specified integer n.
 *
 * @param {number} n
 * @return {number}
 *
 * @example:
 *   1  => 1
 *   5  => 120
 *   10 => 3628800
 */
function getFactorial(n) {
    if (n === 1) return n

    return getFactorial(n - 1) * n
}


/**
 * Returns the sum of integer numbers between n1 and n2 (inclusive).
 *
 * @param {number} n1
 * @param {number} n2
 * @return {number}
 *
 * @example:
 *   1,2   =>  3  ( = 1+2 )
 *   5,10  =>  45 ( = 5+6+7+8+9+10 )
 *   -1,1  =>  0  ( = -1 + 0 + 1 )
 */
function getSumBetweenNumbers(n1, n2) {
    let sum = 0

    for (let i = n1; i <= n2; i++) {
        sum += i
    }

    return sum
}


/**
 * Returns true, if a triangle can be built with the specified sides a,b,c and false in any other ways.
 *
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {bool}
 *
 * @example:
 *   1,2,3    =>  false
 *   3,4,5    =>  true
 *   10,1,1   =>  false
 *   10,10,10 =>  true
 */
function isTriangle(a,b,c) {
    return a + b > c && a + c > b && c + b > a
}


/**
 * Returns true, if two specified axis-aligned rectangles overlap, otherwise false.
 * Each rectangle representing by object 
 *  {
 *     top: 5,
 *     left: 5,
 *     width: 20,
 *     height: 10
 *  }
 * 
 *  (5;5)
 *     -------------  
 *     |           | 
 *     |           |  height = 10
 *     ------------- 
 *        width=20    
 * 
 * NOTE: Please use canvas coordinate space (https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#The_grid),
 * it differs from Cartesian coordinate system.
 * 
 * @param {object} rect1
 * @param {object} rect2
 * @return {bool}
 *
 * @example:
 *   { top: 0, left: 0, width: 10, height: 10 },
 *   { top: 5, left: 5, width: 20, height: 20 }    =>  true
 * 
 *   { top: 0, left: 0, width: 10, height: 10 },
 *   { top:20, left:20, width: 20, height: 20 }    =>  false
 *  
 */
function doRectanglesOverlap(rect1, rect2) {
    const rectXOverlap = (rect1.left >= rect2.left && rect1.left <= (rect2.left + rect2.width)) ||
                         (rect2.left >= rect1.left && rect2.left <= (rect1.left + rect1.width))
    const rectYOverlap = (rect1.top >= rect2.top && rect1.top <= (rect2.top + rect2.height)) ||
                         (rect2.top >= rect1.top && rect2.top <= (rect1.top + rect1.height))

    return rectXOverlap && rectYOverlap
}


/**
 * Returns true, if point lies inside the circle, otherwise false.
 * Circle is an object of 
 *  {
 *     center: {
 *       x: 5,       
 *       y: 5
 *     },        
 *     radius: 20
 *  }
 * 
 * Point is object of 
 *  {
 *     x: 5,
 *     y: 5
 *  }
 * 
 * @param {object} circle
 * @param {object} point
 * @return {bool}
 *
 * @example:
 *   { center: { x:0, y:0 }, radius:10 },  { x:0, y:0 }     => true
 *   { center: { x:0, y:0 }, radius:10 },  { x:10, y:10 }   => false
 *   
 */
function isInsideCircle(circle, point) {
    const distance = Math.sqrt(Math.abs(circle.center.x - point.x)**2 + Math.abs(circle.center.y - point.y)**2)

    return distance < circle.radius
}


/**
 * Returns the first non repeated char in the specified strings otherwise returns null.
 *
 * @param {string} str
 * @return {string}
 *
 * @example:
 *   'The quick brown fox jumps over the lazy dog' => 'T'
 *   'abracadabra'  => 'c'
 *   'entente' => null
 */
function findFirstSingleChar(str) {
    const charCount = str.split('').filter(char => char).reduce((acc, curr) => {
        if (!acc[curr]) acc[curr] = 0
        
        acc[curr]++

        return acc
    }, {})

    for (const char in charCount) {
        if (charCount[char] === 1) return char
    }
    
    return null
}


/**
 * Returns the string representation of math interval, specified by two points and include / exclude flags.
 * See the details: https://en.wikipedia.org/wiki/Interval_(mathematics)
 *
 * Please take attention, that the smaller number should be the first in the notation
 *
 * @param {number} a
 * @param {number} b
 * @param {bool} isStartIncluded
 * @param {bool} isEndIncluded
 * @return {string}
 *
 * @example
 *   0, 1, true, true   => '[0, 1]'
 *   0, 1, true, false  => '[0, 1)'
 *   0, 1, false, true  => '(0, 1]'
 *   0, 1, false, false => '(0, 1)'
 * Smaller number has to be first :
 *   5, 3, true, true   => '[3, 5]'
 *
 */
function getIntervalString(a, b, isStartIncluded, isEndIncluded) {
    const [start, end] = [Math.min(a, b), Math.max(a, b)]

    if (isStartIncluded && isEndIncluded) {
        return `[${start}, ${end}]`
    }
    
    if (isStartIncluded) {
        return `[${start}, ${end})`
    }
    
    if (isEndIncluded) {
        return `(${start}, ${end}]`
    }
    
    return `(${start}, ${end})`
}


/**
 * Reverse the specified string (put all chars in reverse order)
 *
 * @param {string} str
 * @return {string}
 *
 * @example:
 * 'The quick brown fox jumps over the lazy dog' => 'god yzal eht revo spmuj xof nworb kciuq ehT'
 * 'abracadabra' => 'arbadacarba'
 * 'rotator' => 'rotator'
 * 'noon' => 'noon'
 */
function reverseString(str) {
    const charList = str.split('')
    let reversed = ''

    for (let i = charList.length - 1; i >= 0; i--) {
        reversed += charList[i]
    }

    return reversed
}


/**
 * Reverse the specified integer number (put all digits in reverse order)
 *
 * @param {number} num
 * @return {number}
 *
 * @example:
 *   12345 => 54321
 *   1111  => 1111
 *   87354 => 45378
 *   34143 => 34143
 */
function reverseInteger(num) {
    let nextNumber = num
    let reversed = 0

    while (nextNumber !== 0) {
        const lastDigit = nextNumber % 10
        reversed = reversed * 10 + lastDigit
        nextNumber = Math.floor(nextNumber / 10)
    }

    return reversed
}


/**
 * Validates the CCN (credit card number) and return true if CCN is valid
 * and false otherwise.
 *
 * See algorithm here : https://en.wikipedia.org/wiki/Luhn_algorithm
 *
 * @param {number} cnn
 * @return {boolean}
 *
 * @example:
 *   79927398713      => true
 *   4012888888881881 => true
 *   5123456789012346 => true
 *   378282246310005  => true
 *   371449635398431  => true
 *
 *   4571234567890111 => false
 *   5436468789016589 => false
 *   4916123456789012 => false
 */
function isCreditCardNumber(ccn) {
    const reversedPayload = String(ccn).split('').map(n => Number(n)).reverse()
    const checkDigit = reversedPayload.shift()
    let sum = 0

    for (let i = 0; i < reversedPayload.length; i++) {
        if (i % 2 === 0) {
            sum += reversedPayload[i] > 4 ? reversedPayload[i] * 2 - 9 : reversedPayload[i] * 2
            continue
        }

        sum += reversedPayload[i]
    }

    return 9 - ((sum + 9) % 10) === checkDigit
}


/**
 * Returns the digital root of integer:
 *   step1 : find sum of all digits
 *   step2 : if sum > 9 then goto step1 otherwise return the sum
 *
 * @param {number} n
 * @return {number}
 *
 * @example:
 *   12345 ( 1+2+3+4+5 = 15, 1+5 = 6) => 6
 *   23456 ( 2+3+4+5+6 = 20, 2+0 = 2) => 2
 *   10000 ( 1+0+0+0+0 = 1 ) => 1
 *   165536 (1+6+5+5+3+6 = 26,  2+6 = 8) => 8
 */
function getDigitalRoot(num) {
    const sum = String(num).split('').reduce((acc, curr) => acc + Number(curr) , 0)

    if (sum < 9) return sum

    return getDigitalRoot(String(sum).split('').reduce((acc, curr) => acc + Number(curr), 0))
}


/**
 * Returns true if the specified string has the balanced brackets and false otherwise.
 * Balanced means that is, whether it consists entirely of pairs of opening/closing brackets
 * (in that order), none of which mis-nest.
 * Brackets include [],(),{},<>
 *
 * @param {string} str
 * @return {boolean}
 *
 * @example:
 *   '' => true
 *   '[]'  => true
 *   '{}'  => true
 *   '()   => true
 *   '[[]' => false
 *   ']['  => false
 *   '[[][][[]]]' => true
 *   '[[][]][' => false
 *   '{)' = false
 *   '{[(<{[]}>)]}' = true 
 */
function isBracketsBalanced(str) {
    const bracesList = str.split('');
    const opening = ['(', '[', '{', '<'];
    const closing = [')', ']', '}', '>'];
    const stack = [];

    for (let i = 0; i < bracesList.length; i++) {
        if (opening.includes(bracesList[i])) {
            stack.push(bracesList[i]);
            continue
        }
    
        if (closing.includes(bracesList[i])) {
            const last = stack.length - 1;
            const index = opening.indexOf(stack[last]);

            if (closing[index] === bracesList[i]) {
                stack.pop();
            } else return false;
        }
    }

    return stack.length === 0
}


/**
 * Returns the human readable string of time period specified by the start and end time.
 * The result string should be constrcuted using the folliwing rules:
 *
 * ---------------------------------------------------------------------
 *   Difference                 |  Result
 * ---------------------------------------------------------------------
 *    0 to 45 seconds           |  a few seconds ago
 *   45 to 90 seconds           |  a minute ago
 *   90 seconds to 45 minutes   |  2 minutes ago ... 45 minutes ago
 *   45 to 90 minutes           |  an hour ago
 *  90 minutes to 22 hours      |  2 hours ago ... 22 hours ago
 *  22 to 36 hours              |  a day ago
 *  36 hours to 25 days         |  2 days ago ... 25 days ago
 *  25 to 45 days               |  a month ago
 *  45 to 345 days              |  2 months ago ... 11 months ago
 *  345 to 545 days (1.5 years) |  a year ago
 *  546 days+                   |  2 years ago ... 20 years ago
 * ---------------------------------------------------------------------
 *
 * @param {Date} startDate
 * @param {Date} endDate
 * @return {string}
 *
 * @example
 *   Date('2000-01-01 01:00:00.100'), Date('2000-01-01 01:00:00.200')  => 'a few seconds ago'
 *   Date('2000-01-01 01:00:00.100'), Date('2000-01-01 01:00:05.000')  => '5 minutes ago'
 *   Date('2000-01-01 01:00:00.100'), Date('2000-01-02 03:00:05.000')  => 'a day ago'
 *   Date('2000-01-01 01:00:00.100'), Date('2015-01-02 03:00:05.000')  => '15 years ago'
 *
 */
function timespanToHumanString(startDate, endDate) {
    const milliseconds = endDate.getTime() - startDate.getTime()

    const millisecondsIn = {
      second: 1000,
      minute: 1000 * 60,
      hour: 1000 * 60 * 60,
      day: 1000 * 60 * 60 * 24,
      month: 1000 * 60 * 60 * 24 * 30,
      year: 1000 * 60 * 60 * 24 * 365
    }

    switch (true) {
        case milliseconds <= 45 * millisecondsIn.second: {
            return 'a few seconds ago'
        }
        case milliseconds <= 90 * millisecondsIn.second: {
            return 'a minute ago'
        }
        case milliseconds <= 45 * millisecondsIn.minute: {
            const minutes = Math.abs(Math.round(-(milliseconds / millisecondsIn.minute)))
            return `${minutes} minutes ago`
        }
        case milliseconds <= 90 * millisecondsIn.minute: {
            return 'an hour ago'
        }
        case milliseconds <= 22 * millisecondsIn.hour: {
            const hours = Math.abs(Math.round(-(milliseconds / millisecondsIn.hour)) )
            return `${hours} hours ago`
        }
        case milliseconds <= 36 * millisecondsIn.hour: {
            return 'a day ago'
        }
        case milliseconds <= 25 * millisecondsIn.day: {
            const days = Math.abs(Math.round(-(milliseconds / millisecondsIn.day)))
            return `${days} days ago`
        }
        case milliseconds <= 45 * millisecondsIn.day: {
            return 'a month ago'
        }
        case milliseconds <= 345 * millisecondsIn.day: {
            const months = Math.abs(Math.round(-(milliseconds / millisecondsIn.month)))
            return `${months} months ago`
        }
        case milliseconds <=  545 * millisecondsIn.day: {
            return 'a year ago'
        }
        default: {
            const years = Math.abs(Math.round(-(milliseconds / millisecondsIn.year)))
            return `${years} years ago`
        }
    }
}


/**
 * Returns the string with n-ary (binary, ternary, etc, where n<=10) representation of specified number.
 * See more about
 * https://en.wikipedia.org/wiki/Binary_number
 * https://en.wikipedia.org/wiki/Ternary_numeral_system
 * https://en.wikipedia.org/wiki/Radix
 *
 * @param {number} num
 * @param {number} n, radix of the result
 * @return {string}
 *
 * @example:
 *   1024, 2  => '10000000000'
 *   6561, 3  => '100000000'
 *    365, 2  => '101101101'
 *    365, 3  => '111112'
 *    365, 4  => '11231'
 *    365, 10 => '365'
 */
function toNaryString(num, n) {
    return num.toString(n)
}


/**
 * Returns the commom directory path for specified array of full filenames.
 *
 * @param {array} pathes
 * @return {string}
 *
 * @example:
 *   ['/web/images/image1.png', '/web/images/image2.png']  => '/web/images/'
 *   ['/web/assets/style.css', '/web/scripts/app.js',  'home/setting.conf'] => ''
 *   ['/web/assets/style.css', '/.bin/mocha',  '/read.me'] => '/'
 *   ['/web/favicon.ico', '/web-scripts/dump', '/webalizer/logs'] => '/'
 */
function getCommonDirectoryPath(pathes) {
    // map all paths to convenient format like ['/', 'web', '/', 'images']
    const pathList = pathes.map(path => {
        const pathItems = path.split('/')
        const newPathItems = []

        pathItems.forEach((item, index) => {
            newPathItems.push(item, index !== pathItems.length - 1 ? '/' : '')
        })

        return newPathItems.filter(i => i)
    })

    const shortestPathLength = Math.min(...pathList.map(p => p.length))
    const shortestCommonPath = []
    let temporalStack = []

    for (let i = 0; i < shortestPathLength; i++) {
        
        // shift first element of the path and push it into the stack
        for (let j = 0; j < pathList.length; j++) {
            temporalStack.push(pathList[j].shift())
        }

        // check if all items in stack are the same, if so push them to shortestCommonPath and flush the stack
        if (temporalStack.every(item => temporalStack[0] === item)) {
            shortestCommonPath.push(temporalStack[0])
            temporalStack = []
        } else break
    }

    return shortestCommonPath.join('')
}


/**
 * Returns the product of two specified matrixes.
 * See details: https://en.wikipedia.org/wiki/Matrix_multiplication
 *
 * @param {array} m1
 * @param {array} m2
 * @return {array}
 *
 * @example:
 *   [[ 1, 0, 0 ],       [[ 1, 2, 3 ],           [[ 1, 2, 3 ],
 *    [ 0, 1, 0 ],   X    [ 4, 5, 6 ],     =>     [ 4, 5, 6 ],
 *    [ 0, 0, 1 ]]        [ 7, 8, 9 ]]            [ 7, 8, 9 ]]
 *
 *                        [[ 4 ],
 *   [[ 1, 2, 3]]    X     [ 5 ],          =>     [[ 32 ]]
 *                         [ 6 ]]
 *
 */
function getMatrixProduct(m1, m2) {
    const product = [] 

    for (let i = 0; i < m1.length; i++) {
        const row = []

        for (let j = 0; j < m1.length; j++) {
            let dotProduct = 0

            for (let k = 0; k < m1[0].length; k++) {
                dotProduct += m1[i][k] * m2[k][j]
            }

            row.push(dotProduct)
        }

        product.push(row)
    }

    return product
}


/**
 * Returns the evaluation of the specified tic-tac-toe position.
 * See the details: https://en.wikipedia.org/wiki/Tic-tac-toe
 *
 * Position is provides as 3x3 array with the following values: 'X','0', undefined
 * Function should return who is winner in the current position according to the game rules.
 * The result can be: 'X','0',undefined
 *
 * @param {array} position
 * @return {string}
 *
 * @example
 *
 *   [[ 'X',   ,'0' ],
 *    [    ,'X','0' ],       =>  'X'
 *    [    ,   ,'X' ]]
 *
 *   [[ '0','0','0' ],
 *    [    ,'X',    ],       =>  '0'
 *    [ 'X',   ,'X' ]]
 *
 *   [[ '0','X','0' ],
 *    [    ,'X',    ],       =>  undefined
 *    [ 'X','0','X' ]]
 *
 *   [[    ,   ,    ],
 *    [    ,   ,    ],       =>  undefined
 *    [    ,   ,    ]]
 *
 */
function evaluateTicTacToePosition(position) {
    // row check
    for (let i = 0; i < 3; i++) {
        if (position[i][0] === position[i][1] && position[i][1] === position[i][2]) {
            if (position[i][0] === 'X' || position[i][0] === '0') return position[i][0]
        }
    }

    // column check
    for (let i = 0; i < 3; i++) {
        if (position[0][i] === position[1][i] && position[1][i] === position[2][i]) {
            if (position[0][i] === 'X' || position[0][i] === '0') return position[0][i]
        }
    }

    // diagnal check
    if (position[0][0] === 'X' && position[1][1] === 'X' && position[2][2] === 'X' ||
        position[0][2] === 'X' && position[1][1] === 'X' && position[2][0] === 'X' ||
        position[0][0] === '0' && position[1][1] === '0' && position[2][2] === '0' ||
        position[0][2] === '0' && position[1][1] === '0' && position[2][0] === '0') {
            
        return position[1][1]
    }
}


module.exports = {
    getFizzBuzz: getFizzBuzz,
    getFactorial: getFactorial,
    getSumBetweenNumbers: getSumBetweenNumbers,
    isTriangle: isTriangle,
    doRectanglesOverlap: doRectanglesOverlap,
    isInsideCircle: isInsideCircle,
    findFirstSingleChar: findFirstSingleChar,
    getIntervalString : getIntervalString,
    reverseString: reverseString,
    reverseInteger: reverseInteger,
    isCreditCardNumber: isCreditCardNumber,
    getDigitalRoot: getDigitalRoot,
    isBracketsBalanced: isBracketsBalanced,
    timespanToHumanString : timespanToHumanString,
    toNaryString: toNaryString,
    getCommonDirectoryPath: getCommonDirectoryPath,
    getMatrixProduct: getMatrixProduct,
    evaluateTicTacToePosition : evaluateTicTacToePosition
};
