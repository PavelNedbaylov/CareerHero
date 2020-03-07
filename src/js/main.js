$(document).ready(function () {

    $.fancybox.defaults.btnTpl.smallBtn = '<button data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}">' +
        '<i class="icon icon-close"></i>' +
        '</button>';

    $(document).on('click', '.side__toggle', function(e) {
        $('body').toggleClass('open-filter');
    });

    // Кнопка закрытия меню
    $('.sidebar__close').click(function() {
        $('#st-container').removeClass('st-menu-open');
    });

    // Карусели/слайдеры
    $(".reviews-carousel").owlCarousel({
        items: 1,
        dots: false,
        nav: true,
        loop: false,
        //autoplay:true,
        //autoplayTimeout:5000,
        navText: ['<i class="icon icon-arrow-left"></i>','<i class="icon icon-arrow-right"></i>'],
    });

    $(".slider-style").owlCarousel({
        items: 1,
        dots: false,
        nav: true,
        loop: false,
        //autoplay:true,
        //autoplayTimeout:5000,
        navText: ['<i class="icon icon-chevron-left"></i>','<i class="icon icon-chevron-right"></i>'],
    });

    $('.datepicker').pickadate({
        format: 'dd.mm.yyyy',
        firstDay: 1,
        today: '',
        clear: 'Сброс',
        close: '',
    });

    $('.form-group--date').click(function(e) {
        if (e.target.tagName === 'I') {
            $(e.currentTarget.children[0]).click();
        }
    });

    // аккордеон
    $('.i-acc-link').not('.open').next('.i-acc-hide').hide();
    $('.i-acc-link').click(function(){
        if ( $(this).next('.i-acc-hide').is(':visible') ) {
            $(this).removeClass('open').next('.i-acc-hide').slideToggle(400);
        } else {
            $(this).closest('.i-acc-parent').find('.i-acc-link').removeClass('open');
            $(this).closest('.i-acc-parent').find('.i-acc-hide').slideUp(400);
            $(this).addClass('open').next('.i-acc-hide').slideToggle(400);
        }
    });




    $(function () {
        var step_count = $('.nextgen__step').length;

        $('form.nextgen').on('change', 'input,select', function() {

            var step_block = $(this).closest('.nextgen__step');
            var step_num = step_block.data('step');
            var step_next_num = step_num + 1;
            var step_prev_num = step_num - 1;
            var step_next_block = step_block.next('.nextgen__step');
            var step_prev_block = step_block.prev('.nextgen__step');

            console.log(step_count);

            if (step_num < step_count) {
                step_block.removeClass('current');
                step_next_block.addClass('current');
            }
        });

        $('.nextgen__back').on('click', function () {
            var step_num = $(this).closest('.nextgen__step').data('step');
            if (step_num > 1) {
                var step_block = $('.nextgen__step.current');
                step_block.removeClass('current');
                step_block.prev('.nextgen__step').addClass('current');
            }
        })
    })


});