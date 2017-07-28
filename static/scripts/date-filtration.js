$(() => {
    $('#datepicker').datepicker({
        dateFormat: 'yy-mm-dd',
        onSelect: (dateText, inst) => {
            const fullDate = $('input[name=datepicker]').val();
            const category = $('h1#categoryHeader').text();
            $.ajax({
                url: `/news`,
                method: 'GET',
                contentType: 'application/json',
                data: $.param({ 'categories': category, 'date': fullDate }),
                success: (response) => {
                    $('input[name=datepicker]').val('');
                    $('.divider').html(response);
                    $('.get-news').hide();
                },
            });
        },
    });
});
