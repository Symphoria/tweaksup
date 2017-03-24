var self = this;
var image;

function changeImage(imageName) {
    // $('#' + 'imageName').attr('src', imageName + '1.jpg');
    document.getElementById(imageName).src = imageName + '1.jpg';
    console.log('changed');
}

$('.hackimg').hover(function() {
    var imageName = $(this).attr('id');
    console.log(imageName);
    self.image = imageName;
    changeImage(imageName);
    }, function() {
        document.getElementById(image).src = image + '.jpg';
});

console.log('dome!!');
