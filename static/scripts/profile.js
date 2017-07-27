$(() => {
    $('button#edit').on('click', () => {
        $('div.row, form.well.form-horizontal').toggleClass( 'hidden' );
    });


    $('button#submit').on('click', (event) => {
        event.preventDefault();
        const formData = new FormData();
        const username = $('input[name=username]').val();
        const newEmail = $('input[name=email]').val();
        const file = $('input[name=img]')[0].files[0];
        formData.append('img', file);
        formData.append('email', newEmail);
        
         $.ajax({
            url: '/profile/' + username,
            method: 'PUT',
            contentType: false,
            processData: false,
            data: formData,
            success: (response) => {
                console.log(response);
                location.reload();
                // $('div.row, form.well.form-horizontal').toggleClass( 'hidden' );
            }
        });
    });
});
