"use strict";

let nums = '0123456789';
let littleEng = 'abcdefghijklmnopqrstuvwxyz';
let bigEng = littleEng.toUpperCase();
let littleRus = 'абвгдеёжзийклмнопрстуфхцчшщьыъэюя';
let bigRus = littleRus.toUpperCase();
let classicSymbs = '!#$%';
let symbs = '';
let passStr = '';
let pass = '';

function genPass() {
    passStr = ''; pass = '';
    if($('.active').length == 0) {
        //$('#outPass').empty();
        console.log('ничего не выбрано');
        return;
    } else {
        if( $('#nums').hasClass('active') ) passStr += nums;
        if( $('#littleEng').hasClass('active') ) passStr += littleEng;
        if( $('#bigEng').hasClass('active') ) passStr += bigEng;
        if( $('#littleRus').hasClass('active') ) passStr += littleRus;
        if( $('#bigRus').hasClass('active') ) passStr += bigRus;
        if( $('#classicSymbs').hasClass('active') ) passStr += classicSymbs;
        if( $('#symbs').hasClass('active') ) {
            symbs = $('#userSymbsText')[0].value;
            passStr += symbs;
        }
        //console.log(passStr);
        function unique(arr) {
            let result = [];
            for (let str of arr) {
                if (!result.includes(str)) {
                    result.push(str);
                }
            }
            return result;
        }
        
        passStr = ( unique( passStr.split('') ).join('') );
        //console.log(passStr);

        for(let i = 0; i < +($('#countNum')[0].innerText); i++) {
            pass += passStr[getRandomInt(passStr.length)];
        }
        //console.log(pass);
        $('#outPass').empty();
        $('#outPass').append( pass );
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

$('#countUp, #countDown').click( function(elem) {
    let val = +($('#countNum')[0].innerText);
    
    if( elem.target.id == 'countUp' ) {
        $('#countNum').empty();
        $('#countNum').append( ++val );
    } else {
        $('#countNum').empty();
        $('#countNum').append( --val );
    }
    
    if(val == 1) {
        $('#countDown').hide();
    } else {
        $('#countDown').show();
    }

    if(val == 100) {
        $('#countUp').hide();
    } else {
        $('#countUp').show();
    }
    let cols = $('#outPass').attr('cols');
    let rows = Math.ceil( val/cols);
    $('#outPass').attr('rows', rows);
    if( val < 20 ) $('#outPass').attr('cols', val);

    genPass();
} );

$('.active, .passive').click( function(elem) {
    if(elem.target.id == 'userSymbsText' || (elem.target.id == 'symbs' && $('#userSymbsText')[0].value == '' ) ) {
    
    } else {
        if( $(elem.target).hasClass('active') ) {
            $(elem.target).addClass('passive');
            $(elem.target).removeClass('active');
        } else {
            $(elem.target).addClass('active');
            $(elem.target).removeClass('passive');
        }
        genPass();
    }
} );

$('#userSymbsText').focusout( function() {
    if( $('#userSymbsText')[0].value == '' ) {
        $('#symbs').removeClass('active');
        $('#symbs').addClass('passive');
    }
} );

$('#reGen').click( function() {
    genPass();
} );

$('#copyPass').click( function() {
    let text = document.getElementById("outPass");
    text.select();
    document.execCommand('copy');
} );

$(document).ready( function() {
    genPass();
} );