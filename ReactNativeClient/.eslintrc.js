module.exports = {
    'extends': 'airbnb',
    'parser': 'babel-eslint',
    'env': {
        'jest': true,
    },
    'rules': {
        'no-use-before-define': 'off',
        'react/jsx-filename-extension': 'off',
        'react/prop-types': 'off',
        'comma-dangle': 'off',
        'react/destructuring-assignment': 'off',
        'import/prefer-default-export': 'off',
        'no-restricted-globals': 'off'
    },
    'globals': {
        "fetch": false
    }
};