// $(document).ready(function(){
//   let idDict = {};

//   $('input[type="checkbox"]').change(function(){
//     if ($(this).prop('checked')) {
//         idDict[$(this).data('name')] = $(this).data('id');
//     } else {
//         delete idDict[$(this).data('name')];
//     }
//     console.log($(this).data('name'));
//     let amenityList = [];
//     for (const key in idDict) {
//         if (idDict[key] !== undefined)
//         {
//             amenityList.push(key);
//         }
//     }
//     $(".amenities h4").text(amenityList.length > 0 ? amenityList.join(',') : '\u00A0');
//   })
// });


$(document).ready(function(){
    let idDict = {};
  
    $('input[type="checkbox"]').change(function(){
      console.log('Checkbox change event triggered');
  
      // Log data dataibutes to check their values
      console.log('data-name:', $(this).data('name'));
      console.log('data-id:', $(this).data('id'));
  
      if ($(this).prop('checked')) {
          idDict[$(this).data('name')] = $(this).data('id');
      } else {
          delete idDict[$(this).data('name')];
      }
  
      console.log('idDict:', idDict);
  
      let amenityList = [];
      for (const key in idDict) {
          if (idDict[key] !== undefined) {
              amenityList.push(key);
          }
      }
  
      console.log('amenityList:', amenityList);
  
      $(".amenities h4").text(amenityList.length > 0 ? amenityList.join(',') : '\u00A0');
    });
  });
  
  