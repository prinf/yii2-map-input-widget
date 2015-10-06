<?php

use yii\helpers\Html;
use yii\helpers\Url;

// Register asset bundle
\kolyunya\yii2\assets\MapInputAsset::register($this);

// [BEGIN] - Map input widget container
echo Html::beginTag(
    'div',
    [
        'class' => 'kolyunya-map-input-widget',
        'style' => "width: $width; height: $height;",
        'id' => $id,
        'data' =>
        [
            'latitude' => $latitude,
            'longitude' => $longitude,
            'zoom' => $zoom,
            'map-type' => $mapType,
            'animate-marker' => $animateMarker,
            'align-map-center' => $alignMapCenter,
            'latitude-selector' => $latitudeSelector,
            'longitude-selector' => $longitudeSelector,
            'address-selector' => $addressSelector
        ],
    ]
);

    // Map canvas
    echo Html::tag(
        'div',
        '',
        [
            'class' => 'kolyunya-map-input-widget-canvas',
            'style' => "width: 100%; height: 100%",
        ]
    );

// [END] - Map input widget container
echo Html::endTag('div');
