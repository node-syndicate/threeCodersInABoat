/* globals $ */

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

    $('.comments-container').on('click', (e) => {
        const target = e.target;
        const commentItem = $(target).parent();
        if ($(target).hasClass('comment-edit')) {
            $(commentItem).hide();
            $(commentItem).next().show();
        }
    });

    $('.comments-container').on('click', (e) => {
        const target = e.target;
        const commentEditor = $(target).parent();
        const commentBare = commentEditor.prev();
        if ($(target).hasClass('comment-submit')) {
            const comment = $(target).prev().val();
            const id = $(target).attr('id');
            $.ajax({
                url: '/comments',
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({ id, comment, articleId, date }),
                success: (response) => {
                    const result = JSON.parse(response);
                    $(commentEditor).hide();
                    $(commentBare).children('.comment-date').text(result.date);
                    $(commentBare).children('.comment-content').text(result.comment);
                    $(commentBare).show();
                },
            });
        }
    });

    $('.comments-container').on('click', (e) => {
        const target = e.target;
        const commentItem = $(target).parent();
        if ($(target).hasClass('comment-cancel')) {
            $(commentItem).hide();
            $(commentItem).prev().show();
        }
    });
});


