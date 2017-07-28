// $(() => {
//     let fullDate;
//     $('#datepicker').datepicker({
//         dateFormat: 'yy-mm-dd',
//         onSelect: () => {
//             let date = $('#datepicker').datepicker('getDate').getDate();
//             let month = $('#datepicker').datepicker('getDate').getMonth() + 1;
//             const year = $('#datepicker').datepicker('getDate').getFullYear();
//             date < 10? date = '0' + date: date;
//             month < 10? month = '0' + month: month;
//             fullDate = `${year}-${month}-${date}`;
//             const category = $('.category-title h1').text();
//             const url = `/news?categories=${category}&filter=${fullDate}`;
//             console.log(url);
//             $.get(url, (result) => {
//                 $('.sub-news > .row').append(result);
//             });
//         },
//     });
// });

$(() => {
    // let fullDate;
    $('#datepicker').datepicker({ 
        dateFormat: 'yy-mm-dd',
        onSelect: (dateText, inst) => {
            // const date = $('#datepicker').datepicker('getDate').getDate();
            // const month = $('#datepicker').datepicker('getDate').getMonth() + 1;
            // const year = $('#datepicker').datepicker('getDate').getFullYear();
            // fullDate = [date, month, year];
            const fullDate = $('input[name=datepicker]').val();
            const category = $('h1#categoryHeader').text();

            $.ajax({
                url: `/news`,
                method: 'GET',
                contentType: 'application/json',
                data: $.param({ 'categories': category, 'date': fullDate }),
                success: (response) => {
                    console.log(response);
                    $('input[name=datepicker]').val('');
            }
        });
    }
 });
});