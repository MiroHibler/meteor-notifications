// check that the userId specified owns the documents
var ownsDocument = function ( userId, doc ) {
		return ( doc && doc.userId === userId );
	};

Meteor.publish( 'notifications', function () {
	// Only unread notifications of the active user
	return notifications.find({
		userId: this.userId,
		readAt: {
			$exists: false
		}
	});
});

notifications.allow({
	update: function ( userId, doc, fieldNames ) {
		return ownsDocument( userId, doc ) &&
			( fieldNames.length === 1 ) &&
			( fieldNames[ 0 ] === 'readAt' );
	}
});
