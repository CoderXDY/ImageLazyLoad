## ImageLazyLoad ##
> It is a javascript plugn which could load the image lazy in html page

## Getting Start ##
**step one:**

Firstly, you must import the two js script:   

>  jquery.js  
>  imageLazyLoad.js

**step two:**

when the image need to load lazy, you can code it:

```
<img src="default.png" data-url="profile.png" height="300" width="300" class="img-lazy"/>
```
the src sets the default image url and the data-url sets the real image url

**step three:**

then you need to code it:
```
$(".img-lazy").lazyLoad();

```

**step four:**

when the browser page was scrolled,the image will be loaded from network.

## Detail of Implement ##

> + check the img tag whether is in the browser'view or not
> + when loading the real image, the js plugin will set the img's src by the value of the data-url.

