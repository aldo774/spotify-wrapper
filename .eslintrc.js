module.exports = {
    'extends': 'airbnb',
    'rules': {
      'import/no-extraneous-dependencies': ['error', {'devDependencies': ['tests/*.js', 'src/*.js']}]
    }
};
