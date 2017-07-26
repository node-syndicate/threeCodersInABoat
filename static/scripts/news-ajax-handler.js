$('.get-news').on('click', () => {
    $.ajax({
        method: 'GET',
        url: '/news',
    })
    .done(console.log('wtf'));
});
