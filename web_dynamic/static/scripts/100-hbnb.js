
$(document).ready(function(){
    const states = {};
    const amenities = {};
    const cities = {};

    $('input[type="checkbox"]').change(function() {
        let refClass;
            switch ($(this).attr('id')) {
                case "states_info":
                    refClass = states;
                    break;
                case "amenities_info":
                    refClass = amenities;
                    break;
                case "cities_info":
                    refClass = cities;
                    break;
            }
            if ($(this).prop('checked')) {
                refClass[$(this).data('name')] = $(this).data('id');
            } else {
            delete refClass[$(this).data('name')];
            }
        if ($(this).attr('id') === "amenities_info") {
        $(".amenities h4").text(Object.keys(amenities).join(", "));
        } else {
            console.log(states, cities);
            $(".locations h4").text(Object.keys(states).concat(Object.keys(cities)).join(", "));
        }
    });
    

    $('button').click(function () {
        /*if (List.length === 0) {
            $("section.places").empty();
            return;
        }*/
        $.post({
            url: "http://localhost:5001/api/v1/places_search",
            data: JSON.stringify({
                amenities: Object.values(amenities),
                states: Object.values(states),
                cities: Object.values(cities)
            }),
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
