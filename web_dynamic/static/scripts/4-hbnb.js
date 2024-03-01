
$(document).ready(function(){
    let idDict = {};
    $('input[type="checkbox"]').change(function(){
        if ($(this).prop('checked')) {
            idDict[$(this).data('name')] = $(this).data('id');
        } else {
            delete idDict[$(this).data('name')];
        }
        let amenityList = [];
        for (const key in idDict) {
            if (idDict[key] !== undefined) {
                amenityList.push(key);
            }
        }
        $(".amenities h4").text(amenityList.length > 0 ? amenityList.join(',') : '\u00A0');
    });

    $('button').click(function () {
        let List = Object.values(idDict);
        let requestInfo = {
            amenities: List
        };

        if (List.length === 0) {
            $("section.places").empty();
            return;
        }

        $.post({
            url: "http://localhost:5001/api/v1/places_search",
            data: JSON.stringify(requestInfo),
            headers: {
                "Content-Type": "application/json"
            },
            success: addToHtml,
            dataType: "json"
        });
    });

    $.getJSON("http://localhost:5001/api/v1/status", (response) => {
        console.log(response);
        if (response.status === 'OK') {
            $("div#api_status").addClass('available');
        } else {
            $("div#api_status").removeClass('available');
        }
    });

    function addToHtml(response) {
        $("section.places").empty();
        response.forEach(place => {
            $("section.places").append(
                `<article>
                    <div class="title_box">
                        <h2>${place.name}</h2>
                        <div class="price_by_night">$${place.price_by_night}</div>
                    </div>
                    <div class="information">
                        <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                        <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                        <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                    </div>
                    <div class="description">
                        ${place.description}
                    </div>
                </article>`
            );
        });
    }
});
