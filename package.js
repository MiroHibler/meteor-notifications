Package.describe({
	name         : 'miro:notifications',
	version      : '0.1.0',
	// Brief, one-line summary of the package.
	summary      : 'Simple custom notifications for Meteor app',
	// URL to the Git repository containing the source code for this package.
	git          : 'https://github.com/MiroHibler/meteor-notifications.git',
	// By default, Meteor will default to using README.md for documentation.
	// To avoid submitting documentation, set this field to null.
	documentation: 'README.md'
});

Package.onUse( function ( api ) {
	api.versionsFrom( '1.1.0.2' );

	api.use([
		'underscore'
	]);

	api.addFiles( 'lib/both/notifications_both.js', [ 'server', 'client' ] );

	api.addFiles([
		'lib/server/notifications_publications.js',
		'lib/server/notifications_server.js'
	], 'server' );

	api.addFiles([
		'lib/client/notifications_subscriptions.js',
		'lib/client/notifications_client.js'
	], 'client' );

	api.export( 'notifications' );
	api.export( 'Notifications' );
});

Package.onTest( function ( api ) {
	api.use( 'tinytest' );
	api.use( 'miro:notifications' );

	api.addFiles( 'tests/notifications_tests.js' );
});
