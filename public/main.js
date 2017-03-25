var self = this;
var image;

function changeImage(imageName) {
    document.getElementById(imageName).src = imageName + '1.jpg';
}

$('.hackimg').hover(function() {
    var imageName = $(this).attr('id');
    self.image = imageName;
    changeImage(imageName);
    }, function() {
        document.getElementById(image).src = image + '.jpg';
});

$('#more').click(function() {
    window.location.href('/feed');
});

function getHackData(category) {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'http://tweaksup.herokuapp.com/' + category + '/hacksdata',
        success: function(data) {
            console.log(data);
            $('#feed-wrapper').empty();
            for (var i = 0; i <= data.length; i++) {
                var box = document.createElement("div");
                box.className = 'hackDiv';
                box.innerHTML += "<p class='text'>" + data[i].body + "</p>";

                $(box).hide().appendTo('#feed-wrapper').fadeIn(400);
                console.log('something');
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
}

$('#register').click(function() {
    window.location.href = 'create';
});

$('#login').click(function() {
    window.location.href = 'login';
});

$('a').click(function() {
    getHackData($(this).attr('id'));
    $('a').parent().removeClass('active');
    $(this).parent().addClass('active');
});

document.addEventListener('DOMContentLoaded', getHackData('Tech.'));

console.log('done!!');
