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

console.log('dome!!');
