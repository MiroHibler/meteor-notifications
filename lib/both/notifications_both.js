APP_PREFIX = 'Notifications';

notifications = new Meteor.Collection( 'notifications' );

var defaults = {
	// Default notification handler (console)
	showHandler: function ( notification, callback ) {
		if ( notification && notification.content ) {
			var notificationMmessage = '[' + notification.content.title + ']: ' + notification.content.text;

			switch ( notification.type ) {
				case 'info':
					console.info( notificationMmessage );
					break;

				case 'warning':
					console.warn( notificationMmessage );
					break;

				case 'error':
				case 'danger':
					console.error( notificationMmessage );
					break;

				default:
					console.log( notificationMmessage );
					break;
			}

			if ( callback ) callback( notification );
		}
	}
};

Notifications = {
	_options: {},

	init: function ( options ) {
		if ( options ) {
			this._options = _.defaults( {}, options );
		}
	},

	show: function ( notification, callback ) {
		var self = this,
			showCallback = function () {
				self.markAsRead( notification._id );
			};

		if ( notification && self._options.showHandler ) {
			if ( callback ) {
				self._options.showHandler( notification, callback );
			} else {
				self._options.showHandler( notification, showCallback );
			}
		}
	}
};

Notifications.init( defaults );
