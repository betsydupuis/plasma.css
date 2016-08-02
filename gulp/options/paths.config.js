module.exports = {
    src: './src',
    dist: './dist',
    scss: [{
            name: 'flexbox-grid',
            src: './src/flexbox-grid',
            dist: './dist/assets/css',
            glob: '/!(*.spec).scss',
        },
        // {//     name: 'other',
        //     src: './src/css',
        //     dist: './dist/assets/css',
        //     glob: '/**/!(*.spec).scss',
        // }
    ],
    html: [{
        name: 'templates',
        src: './src/**/!(*index|*.spec).html',
        dist: './dist/assets/templates'
    }, {
        name: 'index',
        src: './src/index.html',
        dist: './dist'
    }]
}