module.exports = function () {
    var client = './public/';

    var config = {
        temp: './.temp',
        alljs: ['./src/**/*.js', './*.js'],
        stylus: [client + 'css/site.styl']
    };

    return config;
};
