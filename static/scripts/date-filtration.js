$(() => {
    let fullDate;
    $('#datepicker').datepicker({
        dateFormat: 'yy-mm-dd',
        onSelect: () => {
            const date = $('#datepicker').datepicker('getDate').getDate();
            const month = $('#datepicker').datepicker('getDate').getMonth() + 1;
            const year = $('#datepicker').datepicker('getDate').getFullYear();
            fullDate = [date, month, year];
            // console.log('date', fullDate);
        },
    });
});
