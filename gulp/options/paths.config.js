module.exports = {
    src: './src',
    dist: './dist',
    scss: [{
            name: 'plasma',
            src: './src/plasma',
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
    }],
    fonts: [{
        name: 'font-awesome',
        src: './node_modules/font-awesome/fonts/*.*(svg|eot|ttf|woff|otf)',
        dist: './dist/assets/fonts',
        glob: '/**/*.*(svg|eot|ttf|woff|otf)'
    }]
}