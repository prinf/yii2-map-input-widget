function MapInputWidgetManager()
{

    var widgetSelector = '.kolyunya-map-input-widget';

    var self = this;

    var widgets = Array();

    var initializeWidget = function ( widgetContainer )
    {
        if ( ! $(widgetContainer).data('initialized') )
        {
            var widget = new MapInputWidget(widgetContainer);
            widget.initialize();
            return widget;
        }
        return null;
    };

    var addWidget = function ( widget )
    {
        var widgetId = widget.getId();
        widgets[widgetId] = widget;
    };

    this.initializeWidgets = function()
    {
        $(widgetSelector).each
        (
            function ( widgetIndex , widgetContainer )
            {
                var widget = initializeWidget(widgetContainer);
                if ( widget )
                {
                    addWidget(widget);
                }
            }
        );

    };

    this.getWidget = function ( widgetId )
    {
        var widget = widgets[widgetId];
        return widget;
    };

}

function MapInputWidget ( widget )
{

    var inputLatSelector = $(widget).data('latitude-selector');
    var inputLngSelector = $(widget).data('longitude-selector');

    var canvasSelector = 'div.kolyunya-map-input-widget-canvas';

    var self = this;

    var inputLat;
    var inputLng;

    var canvas;

    var map;

    var initializeComponents = function()
    {
        inputLat = $(inputLatSelector).get(0);
        inputLng = $(inputLngSelector).get(0);
        canvas = $(widget).find(canvasSelector).get(0);
    };

    var initializeMap = function()
    {

        map = new google.maps.Map
        (
            canvas,
            {
                mapTypeId: $(widget).data('map-type'),
                center: getInitialMapCenter(),
                zoom: $(widget).data('zoom'),
                styles:
                [
                    {
                        featureType: "poi",
                        stylers:
                        [
                            {
                                visibility: "off",
                            },
                        ],
                    },
                ],
                mapTypeControlOptions :
                {
                    mapTypeIds:
                    [
                    ],
                },
            }
        );

        google.maps.event.addListener
        (
            map,
            'click',
            function ( click )
            {
                self.setPosition
                (
                    {
                        latitude: click.latLng.lat(),
                        longitude: click.latLng.lng(),
                    }
                );
            }
        );

    };

    var initializeWidget = function()
    {
        var point = getInitialValue();
        self.setPosition(point);
        $(widget).data('initialized',true);
    };

    var hasInitialValue = function()
    {
        var hasInitialValue = $(inputLat).prop('value') != '' && $(inputLng).prop('value') != '';
        return hasInitialValue;
    };

    var getInitialValue = function()
    {
        if($(inputLat).prop('value') != '' && $(inputLng).prop('value') != ''){
            return new google.maps.LatLng($(inputLat).prop('value'), $(inputLng).prop('value'));
        } else {
            return null;
        }
    };

    var getInitialCenter = function()
    {
        var latitude = $(widget).data('latitude');
        var longitude = $(widget).data('longitude');
        var point = new google.maps.LatLng(latitude,longitude);
        return point;
    };

    var getInitialMapCenter = function()
    {
        var initialMapCenter;
        if ( hasInitialValue() )
        {
            initialMapCenter = getInitialValue();
        }
        else
        {
            initialMapCenter = getInitialCenter();
        }
        return initialMapCenter;
    };

    // Constructs a point from latitude and langitude
    var makePoint = function ( pointData )
    {
        var point;
        if
        (
            pointData.latitude !== undefined
                &&
            pointData.longitude !== undefined
        )
        {
            var latitude = pointData.latitude;
            var longitude = pointData.longitude;
            point = new google.maps.LatLng(latitude,longitude);
        }
        else
        {
            point = pointData;
        }
        return point;
    };

    // Initializes widget
    this.initialize = function()
    {
        initializeComponents();
        initializeMap();
        initializeWidget();
    };

    // Returns widget identifier
    this.getId = function()
    {
        var id = $(widget).prop('id');
        return id;
    };

    // Sets the widget value to specified point;
    // Pans the map to the corresponding point;
    // Sets marker position to the corresponding point.
    this.setPosition = function ( pointData )
    {

        if ( map.marker )
        {
            map.marker.setMap(null);
        }

        if ( pointData === null )
        {
            // Disable the input in order not to send it in POST array
            $(inputLat).prop('disabled',true);
            $(inputLng).prop('disabled',true);
            return;
        }
        else
        {
            // Enable the input in order to send in in POST array
            $(inputLat).prop('disabled',false);
            $(inputLng).prop('disabled',false);
        }

        var point = makePoint(pointData);

        //reverse geocoding...
        $.ajax({
            url: "http://nominatim.openstreetmap.org/reverse",
            data: {
                "format": "json",
                "lat": point.lat(),
                "lon": point.lng(),
                "addressdetails": 1,
                "accept-language": 'en'
            },
            cache: false,
            type: "GET",
            success: function (response) {
                var result = '';
                if(response.address.pedestrian){ result += response.address.pedestrian;}
                else if(response.address.road){ result += response.address.road;}
                else if(response.address.suburb){ result += response.address.suburb;}

                if(response.address.house_number){ result += ', '+response.address.house_number;}
                if(response.address.city){ result += ', '+response.address.city;}
                if(response.address.city_district){result += ', '+response.address.city_district;}
                if(response.address.postcode){result += ', '+response.address.postcode;}

                var address_input = $($(widget).data('address-selector'));
                address_input.animate({borderColor: "#FF0000"}, 250);
                setTimeout(function(){
                    address_input.val(result);
                    address_input.animate({borderColor: "#CCCCCC"}, 250)
                },400);
            }
        });

        if ( $(widget).data('align-map-center') === 1 )
        {
            map.panTo(point);
        }

        var markerAnimation = null;
        if ( $(widget).data('animate-marker') === 1 )
        {
            markerAnimation = google.maps.Animation.DROP;
        }
        map.marker = new google.maps.Marker
        (
            {
                map: map,
                position: point,
                draggable: true,
                animation: markerAnimation,
            }
        );

        google.maps.event.addListener
        (
            map.marker,
            'dragend',
            function()
            {
                self.setPosition(this.getPosition());
            }
        );

        $(inputLat).prop('value', point.lat());
        $(inputLng).prop('value', point.lng());

    };

    // Pans the map the the specified point
    this.panTo = function ( pointData )
    {
        var point = makePoint(pointData);
        map.panTo(point);
    };

    // Sets the map zoom to a specified value
    this.setZoom = function ( zoom )
    {
        map.setZoom(zoom);
    };


}

// A global instance of map inputs manager.
// Use it to get references to widget instances.
var mapInputWidgetManager;

$(window).load
(
    function()
    {

        // Create an instance of widget manager
        mapInputWidgetManager = new MapInputWidgetManager();

        // Initialize widgets
        mapInputWidgetManager.initializeWidgets();

    }
);
