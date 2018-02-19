/*
  Please add all Javascript code to this file.
*/
var nytList;
var articles = {};
var source   = $('#template').html();
var template = Handlebars.compile(source);

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
    $.ajax({
          url: url,
          method: 'GET',
          success: function(result){
            articles = result.response.docs
            articles.forEach(function(a){
              var link = a.web_url;
              var hed = a.headline.main;
              var abstract = a.snippet;
              var source = a.byline.original;
              var words = a.word_count;
              var type = a.type_of_material;
              var image_source = a.multimedia[0];
              if (image_source){
                var image = 'https://static01.nyt.com/' + a.multimedia[0].url;
              }
              else {
                var image = '../images/Logo-NYT.jpg';
              };
              var innerTemp = {
                link : a.web_url,
                hed : a.headline.main,
                abstract : a.snippet,
                pic : image
              };
              var html = template(innerTemp)
              $('#main').append(html)
              console.log(link + '\b ' + hed + '\b ' + abstract + '\b ' + source + '\b ' + words + '\b ' + type + '\b ' + image);
            });},
            complete: function(){
              $('.loader').toggle();
              {debugger};
              $('#main').toggle();}
        })/*.done(function(result) {
          console.log(result);
          articles = {
            hed : result.response.docs
          }
          {debugger}
        }).fail(function(err) {
          throw err;
        });*/
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
  $('#main').toggle();

  $('.loader').toggle();
  var source = $(this).data('api');
  var read = apis[source]();
});
