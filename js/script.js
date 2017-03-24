$(function(){
  // console.clear();

  var xmlhttp = new XMLHttpRequest();

  function getJson(keyword, counter){

    xmlhttp.open('GET', 'https://pixabay.com/api/?key=3347954-5f97fda8c03be95e43ec4ac3c&q='+keyword+'&image_type=all&per_page='+counter, true);
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          var text = JSON.parse(xmlhttp.responseText),
              totalImg = text.total,
              realImg;
          console.log(totalImg);

          if (totalImg == 0) {
            alert('No photo in base!');
          } else if (totalImg<counter) {
            realImg = totalImg;
            alert('In base only '+realImg+' images!');
          } else {
            realImg = counter;
          }
          for (var i = 0; i < realImg; i++) {
            var imgUrl = text.hits[i].previewURL,
            linkImgUrl = text.hits[i].pageURL;

            $('.search').append('<a href="'+linkImgUrl+'"><img src="'+imgUrl+'" class="search__img"></a>');
          }
        } else if (xmlhttp.status != 200) {
          alert('Error XMLHttpRequest. The server is temporarily unavailable.');
        }
      }
    };

    xmlhttp.send();

  }

  $('#inputText').on('keydown', function (e) {
    if (e.which == 13) {
      $(this).parent().find('#inputSubmit').trigger('click');
      return false;
    }
  });

  $('#inputSubmit').on('click', function(){
    $('.search').find('img').remove();
    var inputText = $('#inputText').val();
    getJson(inputText, 9);
    $('#inputText').val('');
  });


// =================================================================

  function Human(name, age, sex, height, weight) {
    this.name = name || 'John';
    this.age = age || 35;
    this.sex = sex || 'man';
    this.height = height || 170;
    this.weight = weight || 80;
  }

  function Worker(placeOfWork, pay) {
    Human.apply(this, arguments);
    this.placeOfWork = placeOfWork || 'Plant';
    this.pay = pay || 6000;
  }

  function Student(placeOfStudy, grant) {
    Human.apply(this, arguments);
    this.placeOfStudy = placeOfStudy || 'OPI';
    this.grant = grant || 1000;
  }

  Worker.prototype = Object.create(Human.prototype);
  Worker.prototype.constructor = Worker;

  Student.prototype = Object.create(Human.prototype);
  Student.prototype.constructor = Student;

  Worker.prototype.working = function() {
      console.log(this.name + ' is working now!');
  };

  Student.prototype.watchSerials = function() {
      console.log(this.name + ' is watch serials!');
  };

  var human1 = new Human();
  var human2 = new Human('Alex', 45, 'man', 172, 90);
  var worker1 = new Worker('Miranda', 28, 'female', 155, 45);
      worker1.pay = 8000;
  var worker2 = new Worker('Bob', 50, 'man', 180, 85);
  var student1 = new Student('Tom', 18, 'man', 168, 68);
      student1.placeOfStudy = 'KPI';
  var student2 = new Student('Sabrina', 19, 'female', 160, 47);

  console.log('Human - ', human1);
  console.log('Human - ', human2);
  console.log('Worker - ', worker1);
  worker1.working();
  console.log('Worker - ', worker2);
  console.log('Student - ', student1);
  console.log('Student - ', student2);
  student2.watchSerials();

});