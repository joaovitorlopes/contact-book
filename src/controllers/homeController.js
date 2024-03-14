exports.initialPage = (request, response) => {
    response.render('index', {
        title: 'New Page Title',
        nums: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        example: 'This is the title of page'
    });
    return;
}

exports.postHandling = (request, response) => {
    response.send(request.body);
    return;
}