$('.comment-button').on('click', () => {
    const $commentInput = $('.comment-input');
    const comment = $commentInput.val();
    const articleId = 
    $commentInput.val('');
    if (comment === '') {
        $($commentInput).attr('placeholder', 'type some words here dude');
    }
    $.ajax({
        url: '/comment',
        method: 'PUT',
        contentType: false,
        processData: false,
        data: comment,
        success: (response) => {
            window.location.assign('/profile');
        },
    });
});
