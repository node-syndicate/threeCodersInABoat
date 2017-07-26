let page = 0;
$('.get-news').on('click', () => {
    const category = $('.category-title').text();
    page++;
    const url = `/news?categories=${category}&page=${page}`;
    $.get(url, (result) => {
        $('.sub-news > .row').append(result);
    });
});
