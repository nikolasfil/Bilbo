module.exports = {
    // use them as {{calculation value}}
    calculation: function (value) {
        return value + 100;
    },
    
    list: function (value, options) {
        // return "<h2>"+options.fn({test: value})+"</h2>";
        let out = "<ul>";
        for (let i = 0; i < value.length; i++) {
            // out = out + "<li>"+options.fn({firstName: '',lastName: ''})+"</li>";
            out = out + "<li>" + options.fn(value[i]) + "</li>";
        }
        return out + "</ul>";
    },

    // concat function that takes arguments and concats them
    concat: function () {
        let outStr = '';
        for (let arg in arguments) {
            if (typeof arguments[arg] != 'object') {
                outStr += arguments[arg];
            }
        }
        return outStr;
    }
}