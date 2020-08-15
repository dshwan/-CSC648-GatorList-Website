<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>GatorList</title>

        <meta name="csrf-token" content="{{ csrf_token() }}">
        
        {{-- import css frameworks --}}
        <link rel="stylesheet" href="{{asset('css/app.css')}}">

        {{-- Import Google Maps API Key --}}
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBmbDCDGERAGuQH7jGPLBg8MGd5sQpoxvY"></script>

        {{-- Import reCaptcha --}}
        <script src="https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit" async defer></script>

        <!-- Matomo -->
        <script type="text/javascript">
            var _paq = window._paq || [];
            /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
            _paq.push(["setCookieDomain", "*.18.224.109.221"]);
            _paq.push(['trackPageView']);
            _paq.push(['enableLinkTracking']);
            (function() {
                var u="https://gatorlist.matomo.cloud/";
                _paq.push(['setTrackerUrl', u+'matomo.php']);
                _paq.push(['setSiteId', '1']);
                var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                g.type='text/javascript'; g.async=true; g.defer=true; g.src='//cdn.matomo.cloud/gatorlist.matomo.cloud/matomo.js'; s.parentNode.insertBefore(g,s);
            })();
        </script>
        <!-- End Matomo Code -->

    </head>
    <body>
        <div id="app" class="flex-center position-ref full-height">
            {{-- Single App Page --}}
            <gatorlist-navbar></gatorlist-navbar>
            <router-view></router-view>
        </div>
    
    {{-- import js frameworks --}}
    <script src="{{ asset('./js/app.js') }}"></script>
    </body>
</html>
