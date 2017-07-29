/* globals $ */

$(() => {
    let page = 0;
    $('.get-news').on('click', () => {
        const category = $('.category-title h1').text();
        page++;
        const url = `/news?categories=${category}&page=${page}`;
        $.get(url, (result) => {
            $('.divider').append(result);
        });
    });
});

