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
  
  $.getJSON("http://localhost:5001/api/v1/status", (response) => {
    console.log(response);
    if (response.status === 'OK') {
        $("div#api_status").addClass('available');
    }else{
        $("div#api_status").removeClass('available');
    }
  });