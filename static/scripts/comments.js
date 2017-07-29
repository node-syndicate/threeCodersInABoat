$(() => {
    const date = (() => {
        const d = new Date();
        const year = d.getFullYear();
        let month = d.getMonth();
        month++;
        const day = d.getDate();
        const hours = d.getHours();
        const minutes = d.getMinutes();
        return `${hours}:${minutes} ${day}/${month}/${year}`;
    })();
    const articleId = $('.comments-container').attr('articleid');

    $('.comment-button').on('click', () => {
        const $commentInput = $('.comment-input');
        const comment = $commentInput.val();
        $commentInput.val('');
        if (comment === '') {
            $($commentInput)
                .attr('placeholder',
                'Please type something before commenting.');
        } else {
            $.ajax({
                url: '/comments',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ comment, articleId, date }),
                success: (response) => {
                    $('.comments-container').append(response);
                },
            });
        }
    });

    $('.comments-container').on('click', (e) => {
        const target = e.target;
        if ($(target).hasClass('comment-delete')) {
            $.ajax({
                url: '/comments',
                method: 'DELETE',
                contentType: 'application/json',
                data: JSON.stringify({ articleId }),
                success: () => {
                    $(target).parent().remove();
                },
            });
        }
    });

    $('.comment-container').on('click', (e) => {
        const target = e.target;
        const commentItem = $(target).parent();
        const commentDate = $('.comment-date').text();
        const commentUsername = $('.comment-username').text();
        const commentContent = $('.comment-content').text();
        if ($(target).hasClass('comment-edit')) {
            commentItem.html('')
        }
        if ($(target).hasClass('comment-edited')) {
            $.ajax({
                url: '/comments',
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({ articleId }),
                success: (response) => {
                    // hide editor 
                    // show edited comment
                },
            });
        }

        if ($(target).hasClass('comment-cancel-edit')){

        }
    });
});


