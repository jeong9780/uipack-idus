import $ from 'jquery';
import { extractBg } from './util';

function getImgSrc($elem) {
    var $thumbnail = $elem.find('.imgloader__thumbnail');
    var src;

    if ($thumbnail[0].nodeName === 'IMG') {
        src = $thumbnail[0].src;
    } else {
        src = extractBg($thumbnail[0]);
    }

    return src;
}

export default function imgloader($element) {
    var img;
    var imgLarge;
    img = new Image();
    img.src = getImgSrc($element);

    imgLarge = new Image();
    imgLarge.src = $element.attr('data-img');

    $(imgLarge).attr('data-state', 'loading');

    if (imgLarge.complete) {
        $(imgLarge).removeAttr('data-state');

        $element.append(imgLarge);

        return;
    }

    img.onload = function () {
        $element.find('.imgloader__thumbnail').attr('data-state', 'loaded');
    }

    imgLarge.onload = function () {
        $(imgLarge).attr('data-state', 'loaded');
    }

    $element.append(imgLarge);
};
