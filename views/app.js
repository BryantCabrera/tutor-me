$('.index__login--btn').on('click', function () {
    console.log('clicked');
    $('.index__login--form').css('display', 'block');
    $('.index__register--form').css('display', 'none');
    $('.index__login--text').html('Not registered yet? <a href="#" class="index__register--btn">LogIn</a>')
});

$('.index__register--btn').on('click', function () {
    $('.index__login--form').css('display', 'none');
    $('.index__register--form').css('display', 'block');
    $('.index__login--text').html('Already a registered user? <a href="#" class="index__login--btn">LogIn</a>')
});