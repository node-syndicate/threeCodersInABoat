// delete this after comments are done
$(() => {
    $('form#search-form').on('submit', (event) => {
        event.preventDefault();
        const searchedString = $('input[name=search]').val();
        $.ajax({
            url: `/search?searched=${searchedString}`,
            method: 'GET',
            contentType: 'application/json',
            data: JSON.stringify({ 'searchedString': searchedString }),
            success: (response) => {
                console.log(response);
                console.log(event.target);
                window.location.assign('/profile');
            }
        });
    })

});
