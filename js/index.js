'use strict';

//console.log('I\'m alive js');

$(document).ready(function() {
    //console.log('I\'m alive jquery');

    /*$('#sections').on('change', function (e) {
        //var optionSelected = $("option:selected", this);
        //var valueSelected = this.value;
        ////var textSelected = this.text;

        var optionSelected = $(this).find("option:selected");
        var valueSelected  = optionSelected.val();
        var textSelected   = optionSelected.text();
        console.log(optionSelected);
        console.log(valueSelected);
        console.log(textSelected);




    });*/

    $('#sections-form').on('change', 'select', function (e) {
        e.preventDefault();

        var selectValue = $(e.target).val();
        var selectText = $(e.target).find('option:selected').text(); //only time the find is required
        var selectName = $(e.target).attr('name');

        //console.log(selectValue);
        //console.log(selectText);
        //console.log(selectName);

        var url = 'https://api.nytimes.com/svc/topstories/v2/home.json';
        url += '?' + $.param({
                'api-key': 'e969eed331bd4fc8a6764edfb463db8b'
            });

        //console.log(url);

        $.ajax({
            url: url,
            method: 'GET'
        }).done(function(result) {
            console.log(result);
        }).fail(function(err) {
            throw err;
        });
    });

});
