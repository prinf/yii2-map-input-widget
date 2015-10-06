<?php

namespace kolyunya\yii2\widgets;

use Yii;

class MapInputWidget extends \yii\widgets\InputWidget
{

    public $key;

    public $latitude = 0;

    public $longitude = 0;

    public $zoom = 0;

    public $width = '100%';

    public $height = '300px';

    public $mapType = 'roadmap';

    public $animateMarker = false;

    public $alignMapCenter = true;

    public $latitudeSelector = null;

    public $longitudeSelector = null;

    public $addressSelector = null;

    public function run()
    {

        Yii::setAlias('@kolyunya','@vendor/kolyunya');

        // Asset bundle should be configured with the application key
        $this->configureAssetBundle();

        return $this->render(
            'MapInputWidget',
            [
                'id' => $this->getId(),
                'model' => $this->model,
                'attribute' => $this->attribute,
                'latitude' => $this->latitude,
                'longitude' => $this->longitude,
                'latitudeSelector' => $this->latitudeSelector,
                'longitudeSelector' => $this->longitudeSelector,
                'addressSelector' => $this->addressSelector,
                'zoom' => $this->zoom,
                'width' => $this->width,
                'height' => $this->height,
                'mapType' => $this->mapType,
                'animateMarker' => $this->animateMarker,
                'alignMapCenter' => $this->alignMapCenter,
            ]
        );
    }

    private function configureAssetBundle()
    {
        \kolyunya\yii2\assets\MapInputAsset::$key = $this->key;
    }
}
