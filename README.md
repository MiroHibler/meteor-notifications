# meteor-notifications

Simple custom notifications for Meteor app.

## TL;DR;

_meteor-notifications_ package makes adding user notifications to a Meteor app a
joy.

It's also simply customizable. There are **no templates** provided (programmers
are encouraged to provide their own) but template handlers are there for
programmer's convenience.

There are two kinds of notifications you can use:

 * _**Distributed**_ - displayed to other users
 * _**Local**_ - displayed to currently logged user


## Templates

_meteor-notifications_ provides two **template handlers** you can use out of the
box: `Notifications` and `NotificationsItem`. You can use them to handle your
own custom templates (as long as you name them respectively).

There are also **global** template handlers which can be used in any other
template within app: `Notifications` and `NotificationsItem`.


## Installation

Install using Meteor:

```sh
meteor add miro:notifications
```

## Quick Start

Define your custom templates like these (note how they're named!):

> Taken from [the Notifications chapter of Discover Meteor Book](https://book.discovermeteor.com/chapter/notifications)

```html
<template name="Notifications">
	<a href="#" class="dropdown-toggle" data-toggle="dropdown">
	{{#if notificationCount}}
		{{title}}<span class="badge badge-inverse">{{notificationCount}}</span><b class="caret"></b>
	{{else}}
		No {{title}}
	{{/if}}
	</a>
	{{#if notificationCount}}
		<ul class="notification dropdown-menu">
		{{#each notifications}}
			{{> NotificationsItem}}
		{{/each}}
		</ul>
	{{/if}}
</template>

<template name="NotificationsItem">
	<li>
		<a href="#" alt="{{type}}">
			<strong>{{title}}</strong> {{text}}
		</a>
	</li>
</template>
```

Or, in case of using global template handlers with custom templates:

```html
<template name="myCustomTemplate">
	<a href="#" class="dropdown-toggle" data-toggle="dropdown">
	{{#if Notifications.notificationCount}}
		{{Notifications.title}}<span class="badge badge-inverse">{{Notifications.notificationCount}}</span><b class="caret"></b>
	{{else}}
		No {{Notifications.title}}
	{{/if}}
	</a>
	{{#if Notifications.notificationCount}}
		<ul class="notification dropdown-menu">
		{{#each Notifications.notifications}}
			{{> myCustomTemplateItem}}
		{{/each}}
		</ul>
	{{/if}}
</template>

<template name="myCustomTemplateItem">
	<li>
		<a href="#" alt="{{type}}">
			<strong>{{NotificationsItem.title}}</strong> {{NotificationsItem.text}}
		</a>
	</li>
</template>
```


## API

_meteor-notifications_ provides a few API methods:

### `init( options )` _(Anywhere)_
**Set options for Notifications**

 * `options` An options object; currently there's only one optional parameter supported:
  * `showHandler( notification, callback )` - a method to handle actual
  displaying with a callback method that can be used to manipulate the
  notification (provided as argument to the method). For example, a notification
  can be marked as read right after displaying.

> **_NOTE:_** If custom templates are NOT defined by the user, this method will
be used for 'distributed' notifications as well.

> If custom method is not set up, the provided handler will write notifications
to the console.

### `create( userId, content, type )` _(Anywhere)_
**Create 'distributed' Notifications**

> If custom templates are defined, this will cause notification to be displayed
  automatically - there's no need to call `show()` method!
  (It uses `showHandler` to display notifications).

 * `userId` User ID of the user for whom the notification is for.
 * `content` A user-defined content object; for default `showHandler` method it's:
 `{title: <string>, text: <string>}`
 * `type` A notification type styling (in case where custom `showHandler` is used);
 Can be one of `[info|warning|error|danger|success]`; default is `info` (`error`
 and `danger` are synonyms for compatibility with Bootstrap).


### `show( notification, callback )` _(Anywhere)_
**Show 'local' Notifications**

> This is used internally in case the custom templates are not defined!
  (It uses `showHandler` to display notifications).

 * `notification` A user-defined notification object; for default `showHandler` method it's:
 `{type: <string>, content: {title: <string>, text: <string>}}`
 * `callback` A callback method that can be used to manipulate the
  notification (provided as argument to the method). For example, a notification
  can be marked as read right after displaying.


### `markAsRead( notificationId )` _(Anywhere)_
**Mark 'distributed' Notifications as read**

 * `notificationId` ID of the notification that should be marked as read.


## Examples

### Custom client-side `showHandler`

> Example is using [bootstrapGrowl](https://github.com/ifightcrime/bootstrap-growl) jQuery plugin

```javascript
var defaults = {
		ele            : 'body',  // which element to append to
		type           : 'info',  // ('success', 'info', 'warning', 'danger')
		offset         : {
			from  : 'top',        // 'top', or 'bottom'
			amount: 20
		},
		align          : 'right', // ('left', 'right', or 'center')
		width          : 250,     // (integer, or 'auto')
		delay          : 4000,    // in ms
		allow_dismiss  : true,
		stackup_spacing: 10       // spacing between consecutively stacked growls
	};

Notifications.init({
	// Setup custom notification handler (bootstrapGrowl)
	showHandler: function ( notification, callback ) {
		if ( notification && notification.content ) {
			var options = {
					type: ( notification.type === 'error' ) ? 'danger' : notification.type
				},
				notificationMmessage = '<h4><strong>' + notification.content.title + '</strong></h4>' +
										notification.content.text;

			$.bootstrapGrowl( notificationMmessage, _.defaults( options, defaults ) );

			if ( callback ) callback( notification );
		}
	}
});
```

### Display 'local' notification

```javascript
// Not using callback in this example
Notifications.show({
	type   : 'info',
	content: {
		title: 'Hello!',
		text : 'Welcome to meteor-notifications!'
	}
});
```


## Changelog

#### v0.1.0
 - Initial version

## Copyright and license

Copyright © 2015 [Miroslav Hibler](http://miro.hibler.me)

_miro:notifications_ is licensed under the [**MIT**](http://miro.mit-license.org) license.
