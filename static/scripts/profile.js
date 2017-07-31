/* globals $ */

$(() => {
    $('form.well.form-horizontal').on('submit', (event) => {
        event.preventDefault();
        const formData = new FormData();
        const username = $('input[name=username]').val();
        const newEmail = $('input[name=email]').val();
        const file = $('input[name=img]')[0].files[0];
        formData.append('img', file);
        formData.append('email', newEmail);

        $.ajax({
            url: '/edit' + username,
            method: 'PUT',
            contentType: false,
            processData: false,
            data: formData,
            success: (response) => {
                console.log(response);
                $('div.mainContainer').html('');
                if (response[0].msg) {
                    console.log('test');
                    response.forEach((err) => {
                        $('div.mainContainer').append(`<div class="alert alert-danger">${err.msg}</div>`);
                    });
                } else {
                    window.location.assign('/profile');
                }
            },
        });
    });
});
