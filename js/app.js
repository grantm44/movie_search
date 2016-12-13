$(document).ready(function (){
  $('#submit').click(function(e){
    e.preventDefault();
    var title = $('#search').val();
    var URL = 'http://www.omdbapi.com/?';
    var data = {
      s: title, //osearch for title entered in field
    };
  
  //callback function for ajax request
  function callBack(info){
    var list ='';

    if(info.Error === 'Movie not found!'){ //check if no data is returned show error
      list += "<li class='no-movies'>";
      list += "<i class='material-icons icon-help'>help_outline</i>No movies found that match: " + $('#search').val() + ".";
      list += "</li>";
    }else{
      $.each(info.Search, function(i, info){ //display movies returned
        list += "<li>";
        list+= "<div class='poster-wrap'>";
        if(info.Poster === 'N/A'){ //check for poster and display place holder if no poster 
          list += '<i class="material-icons poster-placeholder">crop_original</i>'; 
        }else{
          list += '<img class = "movie-poster" src =' + info.Poster  + ' >';
        }
        list += "</div>";
        list += '<span class="movie-title">'+ info.Title +' </span>';
        list += '<span class="movie-year">' + info.Year +'</span>';
        list +=  '</li>'; 
      });
    }
    //hide opening page  
    $('.desc').hide();
    $('#movies').empty();
    $('#movies').append(list); //append movies to page
    
  }

  $.getJSON(URL, data, callBack);
  });
}); // end ready