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
        if (idDict[key] !== undefined)
        {
            amenityList.push(key);
        }
    }
    $(".amenities h4").text(amenityList.length > 0 ? amenityList.join(',') : '\u00A0');
  })
});

  