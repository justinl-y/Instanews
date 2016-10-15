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

        //var selectValue = $(e.target).val();
        //var selectText = $(e.target).find('option:selected').text(); //only time the find is required
        //var selectName = $(e.target).attr('name');

        //console.log(selectValue);
        //console.log(selectText);
        //console.log(selectName);

        var sectionName = $(e.target).val();

        var url = 'https://api.nytimes.com/svc/topstories/v2/' + sectionName + '.json';
        url += '?' + $.param({
                'api-key': 'e969eed331bd4fc8a6764edfb463db8b'
            });

        //console.log(url);

        var $newsItemsList = $('.newsItems');

        $.ajax({
            url: url,
            method: 'GET'
        }).done(function(result) {
            //console.log(result);

            if (result.num_results === 0) {
                $newsItemsList.empty().append('<li>Sorry. No news items found.</li>');
            }  else {
                $newsItemsList.empty();

                //set up variables
                var newsItemsList = result.results;
                var newsItems = [];
                var newsItem = {};

                //extract news items from news listing json
                $.each(newsItemsList, function (key) { //, value
                    //console.log(key);
                    //console.log(newsItemsList[key].url);

                    if (newsItemsList[key].multimedia.length !== 0) {
                        newsItem = {abstract: newsItemsList[key].abstract,
                                        image: newsItemsList[key].multimedia[4].url,
                                        url: newsItemsList[key].url};

                        newsItems.push(newsItem);
                    }
                })

                //get max 12 items from newsItems
                for (var i = 0; i < 12; i++) {
                    console.log(newsItems[i].url);

                    //var newsItemMarkup = '<img src="' + newsItems[i].image + '">';
                    //$newsItemsList.append('<li>' + newsItemMarkup + '</li>');
                }
            }

        }).fail(function(err) {
            throw err;

            //$newsItemsList.empty().append('<li>Sorry. No an error has occured.</li>');
        });
    });

});
