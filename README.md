#Yii2 map input widget

##Description
A [Yii2 input widget](http://www.yiiframework.com/doc-2.0/yii-widgets-inputwidget.html) which provides a user-friendly interface for selecting geographical coordinates via [Google maps](https://www.google.com/maps/preview). Allows users to select geographical coordinates by clicking on an interative Google map embedded into you web-page.

The widget is [composer](https://getcomposer.org/)-enabled. You can aquire the latest available version from the [packagist repository](https://packagist.org/packages/kolyunya/yii2-map-input-widget).

##Demo
A simple widget demo is available [here](http://kolyunya.github.io/yii2-map-input-widget/). You may inspect the hidden input value via some web-developer tool (e.g. [Firebug](https://addons.mozilla.org/ru/firefox/addon/firebug/)) to see how geographical coordinates are represented inside the widget.

##Usage examples

###Minimal example
To reproduce the following minimal example you will need to acquire a Google maps browser key as described in [Google maps developer's guide](https://developers.google.com/maps/documentation/javascript/tutorial#api_key). The key may be stored as an application parameter for easy referencing or anywhere you like. All other widget parameters have some sensible default values and may not be configured.
~~~php
echo $form->field($model, 'coordinates')->widget(
    'kolyunya\yii2\widgets\MapInputWidget',
    [
        // Google maps browser key.
        'key' => $key,
    ]
);
~~~

###Extended example
An exhaustive list of widget parameters (which are not derived from [yii\widgets\InputWidget](http://www.yiiframework.com/doc-2.0/yii-widgets-inputwidget.html)) available for configuration is described in the following example.
~~~php
echo $form->field($model, 'coordinates')->widget(
    'kolyunya\yii2\widgets\MapInputWidget',
    [

        // Google maps browser key.
        'key' => $key,

        // Initial map center latitude. Used only when the input has no value.
        // Otherwise the input value latitude will be used as map center.
        // Defaults to 0.
        'latitude' => 42,

        // Initial map center longitude. Used only when the input has no value.
        // Otherwise the input value longitude will be used as map center.
        // Defaults to 0.
        'longitude' => 42,

        // jQuery selector for an input where your are going to store your
        // latitude value
        latitudeSelector = null,

        // jQuery selector for an input where your are going to store your
        // longitude value
        longitudeSelector = null,



        // jQuery selector for an input where your are going to save geocoding
        // result value
        addressSelector = null,

        // Initial map zoom.
        // Defaults to 0.
        'zoom' => 12,

        // Map container width.
        // Defaults to '100%'.
        'width' => '420px',

        // Map container height.
        // Defaults to '300px'.
        'height' => '420px',

        // Google map type. See official Google maps reference for details.
        // Defaults to 'roadmap'
        'mapType' => 'satellite',

        // Marker animation behavior defines if a marker should be animated on position change.
        // Defaults to false.
        'animateMarker' => true,

        // Map alignment behavior defines if a map should be centered when a marker is repositioned.
        // Defaults to true.
        'alignMapCenter' => false,

    ]
);
~~~
