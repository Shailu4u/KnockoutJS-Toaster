# KnockoutJS-Toaster
**KnockoutJS Toaster** is a simple toast notification library built on top of Knockout.js 3.2 components. It is easy to use, custom element, small size, independent module and extensible. Jquery is not required.

[![Dependency Status](https://beta.gemnasium.com/badges/github.com/Shailu4u/KnockoutJS-Toaster.svg)](https://beta.gemnasium.com/projects/github.com/Shailu4u/KnockoutJS-Toaster)

### Current Version 0.1.0

## Demo
* http://plnkr.co/edit/M7VVxt

## Getting started

* Link scripts:

```html
<link href="css/toaster.css" rel="stylesheet" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/knockout/3.2.0/knockout-min.js" ></script>
<script src="js/toaster.js"></script>
```

* Add toaster custom element: 

```html
<toast-container params='toasts: toaster.toasts'> </toast-container>  <!-- supply toasts from toaster to toast-container must required -->
```

* Add toaster custom element with default options overridden: 

```html
<toast-container params='
                     timeout: 5000,
                     showClose: false,
                     limit: 5,
                     toasts: toaster.toasts'>
</toast-container>
```

## Usage

* Use toaster methods such as success, error, note, info, wait and warning to display different toast types. For example, write below JS code to display success toast in button click event handler.

```js
	// Display a Success toast with title and onClick options
            toaster.success({
                title: "Success!",
                msg: 'Click to change me.',
                timeout: 0,
                showClose: false,
                onClick:  {
                    title : 'Well done!',
                    msg : 'Closing in 4 seconds.',
                    timeout : 4000
                }
            });
```

## Options

| Key                       | Default         | Values             								     |  Description                                                                     |
| --------------------------|:---------------:|------------------------------------------------------|----------------------------------------------------------------------------------|
| limit                     | `10`            | Integer          						             | Limits maximum number of toasts displayed on page, set to 0 for unlimited toasts	|
| showClose		            | `true`  	      | Boolean												 | Show/hide close button in toast                              			        |
| clickToClose              | `false`         | Boolean											     | Enable or Disable click to close                                                 |
| pushTo	                | `top`           | `top`, `bottom`  							         | Position where new toasts are pushed to, either top or bottom in array           |
| timeout				    | `3000`          | Integer or `0`  							         | How long to show the toast for in ms, set to 0 for indefinite.          	        |
| position					| `top-right`     | `top-right`, `top-left`, `bottom-right`,`bottom-left`| Position in the page where toasts are to be displayed 			    		 	|

## Other Options

| Key/Method                |  Values       	                                  |  Description                                                                      |
| --------------------------|:---------------------------------------------------:|:----------------------------------------------------------------------------------|
| title                     | String                                              | Title to be displayed in the toast                                                |
| msg		                | String											  | Toast message                                									  |
| img        		        | String											  | Image url to be displayed in the toast                                            |
| waittimeout  		        | Integer											  | Waiting time for toast to change its content. (required when onAdd option is used)|
| onAdd        		        | Object											  | The toast type and content will change after waittimeout seconds.                 |
| type	                    | `success`, `warning`, `info`, `error`,`wait`, `note`| Change the toast type when onAdd or onClick option is used.                       |
| onClick      		        | String											  | The toast type and content will change after clicking on toast                    |
| clear()                   | function									          | To clear or remove all toasts                                                     |


### Animations
This library relies on CSS3 transformations for animations.

### Known Issues
- No callback on toast close in page view modal

### Future enhancements
- Callback events such as before or after closing toasts etc
- Fully accessible via keyboard, for example closing of all toasts on ESC key
- Auto-height and width based on the size attributes (to use, omit the height property in your CSS!)
- If Toast message text is more, then show or hide entire text based on mouseover or mouseout events
		
## Author
**Shailendra Kumar**

## Credits
Inspired by http://plnkr.co/edit/HKTC1a

## Copyright
Copyright © 2015 [Shailendra Kumar](http://masterofweb.in).

## License 
KnockoutJS-Toaster is under MIT license - http://www.opensource.org/licenses/mit-license.php
