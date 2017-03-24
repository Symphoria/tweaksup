var self = this;

function changeImage(imageName) {
    $('#' + 'imageName').attr('src', imageName + '1.jpg');
}

$('.hackimg').hover(function() {
    var imageName = (this).attr('src');
    changeImage(imageName);
})

console.log('dome!!');
