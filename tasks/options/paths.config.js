module.exports = {
    src: './src',
    dist: 'dist',
    scss: [{
        name: 'plasma',
        src: './src/plasma',
        dist: './dist/assets/css',
        glob: '/!(*.spec).scss',
    }, {
        name: 'docs',
        src: './src/docs',
        dist: './dist/assets/css',
        glob: '/!(*.spec).scss',
    }],
    // scripts: [
    //     // {
    //     //     name: 'dependencies',
    //     //     src: [
    //     //         './src/app/app.entry.js'
    //     //     ],
    //     //     dist: './dist/assets/js/dependencies.entry.js',
    //     // }
    // ],
    html: [
        // {
        //     name: 'templates-dist',
        //     src: './src/app/**/!(*index|*.spec).html',
        //     dist: './dist/assets/templates/app/'
        // },
        {
            name: 'index',
            src: './src/index.html',
            dist: './dist'
        }, {
            name: 'docs',
            src: './src/docs/**/*.html',
            dist: './dist/docs'
        }
    ],
    // fonts: [],
    // models: [
    // // {
    // //     name: 'images',
    // //     src: './src/**/*.json',
    // //     glob: '**/*.json',
    // //     dist: './dist/assets/models'
    // // }
    // ],
    // images: [{
    //     name: 'images',
    //     src: './src/**/*.*(png|jpeg|jpg|gif|svg)',
    //     glob: '*.*(png|jpeg|jpg|gif|svg)',
    //     dist: './dist/assets/img'
    // }]
}