$(document).ready(function(){
    $(".list").hide();

    $.getJSON('assets/info.json', function(data) {
        data.forEach(batch => {
            // Set the text content of the span element
            $(`#RNo-Batch-${batch.batchNo}`).text(batch.roomNo);

            function formatName(name) {
                return name
                    .split(' ')
                    .map(function(part) {
                        return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
                    })
                    .join(' ');
            }
            var formattedNames = batch.coordinators.map(formatName);
            var namesText = formattedNames.join(', ');
            $(`#Coordinators-Batch-${batch.batchNo}`).text(namesText+'.');


            listCreation(batch.participants, `#student-data-batch-${batch.batchNo}`)
        });
    });
    $(window).on('scroll', function() {
        var scrollTop = $(window).scrollTop();
        var blurValue = Math.min(scrollTop / 10, 20);
        $('#bg').css('filter', 'blur(' + blurValue + 'px)');
        var imagePosition = +scrollTop * 0.5;
        var opacity = Math.max(1 - scrollTop / 500, 0.25);
        $('#start img').css({
            'transform': 'translateY(' + imagePosition + 'px)',
            'opacity': opacity
        });
    });
});

function listCreation(batch1, id) {
    $.each(batch1, function(index, student) {
        const SNo = index + 1;
        // var rowHtml = '<tr style="display: none;">'+
        var rowHtml = '<tr>'+
            '<td>'+SNo+'</td>'+
            '<td>'+student.HTNO1+'</td>'+
            '<td>'+student.Name1+'</td>'+
            '<td>'+student.HTNO2+'</td>'+
            '<td>'+student.Name2+'</td>'+
            '<td>'+student.Class+'</td>'+
            '<td>'+student.CourseCode+'</td>'+
        '</tr>';
        $(id).append(rowHtml);
        // var delay = index * 100;
        // setTimeout(function() {
        //     $('#student-data-batch-1 tr').eq(index).fadeIn();
        // }, delay);
    });
    $(".list").fadeIn();
}