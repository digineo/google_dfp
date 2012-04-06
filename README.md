Google DFP
==========

Ruby On Rails helpers and assets for [Google DFP](http://www.google.com/dfp/).


Installation
------------

Gemfile:

    gem 'google_dfp', :git => 'git://github.com/digineo/google_dfp.git'

Create a `/config/google_dfp.yml` in your rails project containing all configured ads:

	leaderboard:
	  size: 728x90
	  unit: /123456/leaderboard
	skyscraper:
	  size: 120x600
	  unit: /123456/bigsize

Add the supplied javascript to your asset pipeline (e. g. `/app/assets/javascripts/application.js`)

	//= require google_dfp

Please ensure the `google_dfp.js` is inserted at the bottom of your `<body>` element and jQuery is loaded before.


Usage
-----

Just call the `dfp_tag` helper in any view to include insert a DFP tag.

	<%= dfp_tag :leaderboard %>


Copyright
---------

Copyright © 2012 [Digineo GmbH](http://www.digineo.de/), released under the MIT license.
