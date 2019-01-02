var apod = {

  randomDate: function(start, end){
    let date = new Date(
    start.getTime() + Math.random() *
     (end.getTime() - start.getTime())
   );

    // Format the date

    //let date = new Date(2013,5,6);
      let d = date.getDate();
      let m = date.getMonth() + 1;
      let y = date.getFullYear();

      if(m<10){
        m='0'+ m;
      }

      if(d<10){
        d='0' + d;
      }

      return `${y}-${m}-${d}`;
  },

    buildDOM: function(result){
      $('#apodTitle').text(result.title);
      if(result.media_type === 'video'){
        $('#apodImg').hide();
        $('#apodVideo > iframe').attr('src', result.url).show();
      }else{
        $('#apodVideo').hide();
        $('#apodImg > iframe').attr('src', result.url).show();

      }

      $('#apodImg').attr('src', result.url).attr('alt', result.title);

      if(result.copyright != undefined){
      $('#apodCopyright').text('Copyright: ' + result.copyright);
      }

      $('#apodDate').text('Date: ' + result.date);
      $('#apodDesc').text(result.explanation);

    },
  // Application Constructor
  getRequest: function() {

    let date = this.randomDate(new Date(1995,5,16), new Date());
    let key =  'g7hv9ZGtURaFopObgeayBK9PRFXBWTUbxcYFubt4';
    var url = `https://api.nasa.gov/planetary/apod?api_key=${key}&date=${date}`;
    let _this=this;
      $.ajax({
          url: url
      }).done(function(result){
        _this.buildDOM(result);
        console.log(result);
      });
  },

  init: function(){
    this.getRequest();
  }
};

apod.init();

$(function(){
  $('#btnRandApod').on('click', function(){
    apod.getRequest();
  });
});
