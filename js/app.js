/*
  Please add all Javascript code to this file.
*/
var nytList

var time = setTimeout(function(){
  $('.loader').toggle();
  $('#main').toggle();
},1000);

// Next: Use API and console.log the data returned

//returns articles from the NYTimes api
var apis = {
  nytAPI : function(){
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
      'api-key': "67440d21b3a04fe49f4211828a60f982"
    });
    return $.ajax({
      url: url,
      method: 'GET',
    }).done(function(result) {
      nytList = result.response.docs;

      console.log(result);
      {debugger}
    }).fail(function(err) {
      throw err;
    });
  },
};

// saving the reurned NYtimes api object in a variable
//var nytArticles = nytAPI;

// list the titles
var showTitles = function(arr){
  var num = arr.length;
  for (var i = 0; i <= num; i++)
  console.log(arr[i].headline.main);
}

// add event handler for the news sources
$('nav').on('click','ul ul li',function(){
  var source = $(this).data('api');
  {debugger};
  return apis[source]();
});
