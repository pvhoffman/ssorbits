// ssorbits.js
//
// Copyright (c) 2011, Paul V. Hoffman.
// All rights reserved.

var ssorbits = {
	orbitalElement : null,
	userLatitude   :   32.7152778,
	userLongitude  : -117.1563889,
	userLocation   : "San Diego, CA",

	_updateInterval : 5000,

	updateOrbitalData : function() {
		var d = new Date();
		var e = solarSystemOrbits.epochFromDate(d);
		var u = d.getUTCHours() + d.getUTCMinutes() / 60.0 + d.getUTCSeconds() / 3600.0;
		var r = this.orbitalElement.data(e, u, this.userLatitude, this.userLongitude);
		var deg = this.toDegrees(r.c.hourangle);
		var hms = this.toHoursMinutesSeconds(deg);
		var sph = this.toSpherical(r.c.geocentric.x, r.c.geocentric.y, r.c.geocentric.z);

		$('#user-time').html(d.toLocaleString());

		$('#hourangle-degrees').html(deg.toFixed(3));
		$('#hourangle-hours').html(hms.h);
		$('#hourangle-minutes').html(hms.m);
		$('#hourangle-seconds').html(hms.s.toFixed(2));

		deg = this.toDegrees(this.rev(sph.ra));
		hms = this.toHoursMinutesSeconds(deg);

		$('#ra-geo-degrees').html(deg.toFixed(3));
		$('#ra-geo-hours').html(hms.h);
		$('#ra-geo-minutes').html(hms.m);
		$('#ra-geo-seconds').html(hms.s.toFixed(2));

		deg = this.toDegrees(sph.de);
		hms = this.toDegreesMinutesSeconds(deg);

		$('#de-geo-degrees1').html(deg.toFixed(3));
		$('#de-geo-degrees2').html(hms.d);
		$('#de-geo-minutes').html(hms.m);
		$('#de-geo-seconds').html(hms.s.toFixed(2));


		sph = this.toSpherical(r.c.topocentric.x, r.c.topocentric.y, r.c.topocentric.z);
		deg = this.toDegrees(this.rev(sph.ra ));
		hms = this.toHoursMinutesSeconds(deg);

		$('#ra-topo-degrees').html(deg.toFixed(3));
		$('#ra-topo-hours').html(hms.h);
		$('#ra-topo-minutes').html(hms.m);
		$('#ra-topo-seconds').html(hms.s.toFixed(2));

		deg = this.toDegrees(sph.de );
		hms = this.toDegreesMinutesSeconds(deg);

		$('#de-topo-degrees1').html(deg.toFixed(3));
		$('#de-topo-degrees2').html(hms.d);
		$('#de-topo-minutes').html(hms.m);
		$('#de-topo-seconds').html(hms.s.toFixed(2));


		sph = this.toHorizontal(r.c.topocentric.x, r.c.topocentric.y, r.c.topocentric.z);
		deg = this.toDegrees(this.rev(sph.az));

		$('#az-topo-degrees').html(deg.toFixed(3));

		deg = this.toDegrees(sph.al);
		$('#al-topo-degrees').html(deg.toFixed(3));

		if(this.orbitalElement.id == 'moon-earth'
				|| this.orbitalElement.id == 'mercury'
				|| this.orbitalElement.id == 'neptune'
				|| this.orbitalElement.id == 'venus'
				|| this.orbitalElement.id == 'uranus'
				|| this.orbitalElement.id == 'jupiter'
				|| this.orbitalElement.id == 'saturn'
				|| this.orbitalElement.id == 'mars'){
			deg = this.toDegrees(r.e.elongation);
			$('#elongation-angle').html(deg.toFixed(2));
			deg = r.e.phase * 100.0;
			$('#phase-percent').html(deg.toFixed(2));
			$('#magnitude').html(r.e.magnitude.toFixed(3));
		}
	},
	toHorizontal : function(x, y, z) {
	    var az = Math.atan2(y, x) + Math.PI;
	    az = this.rev(az);
	    var al = Math.atan2(z, Math.sqrt(x*x + y*y));
	    var res = {'al' : al, 'az' : az};
	    return res;
	},
	toDegrees : function(radians) {
		return radians * (180.0 / Math.PI);			   
	},
	toSpherical : function(x, y, z){
		var e = 0.0001;
		var r = Math.sqrt(x*x + y*y + z*z);
		var ra = 0.0;
		var decl = 0.0;
		if (Math.abs(x) < e &&  Math.abs(y) < e) {
			decl = Math.atan2(z, Math.sqrt(x*x + y*y));
		} else {
			ra = Math.atan2(y, x);
			decl = Math.asin(z / r);
		}
		return {'r' : r, 'ra' : ra, 'de' : decl};
	},
	rev : function(a){
		return a - Math.floor(a / (Math.PI * 2.0)) * (Math.PI * 2.0);
	},
	toDegreesMinutesSeconds : function(degrees){
		var dd = this.truncate(degrees);
		var mm = (Math.abs(degrees) - Math.abs(dd)) * 60.0;
		var ss = (mm - this.truncate(mm)) * 60.0;
		var res = {'d' : dd, 'm' : this.truncate(mm), 's' : ss};
		return res;

	},
	toHoursMinutesSeconds : function(degrees) {
		var hh = degrees / 15.0;
		var mm = (Math.abs(hh) - Math.abs(this.truncate(hh))) * 60.0;
		var ss = (mm - this.truncate(mm)) * 60.0;
		var res = {'h' : this.truncate(hh), 'm' : this.truncate(mm), 's' : ss};
		return res;

	},
	truncate : function(d) {
		if(d < 0) return Math.ceil(d);
		return Math.floor(d);
	},
	loop : function(o) {
		this.orbitalElement = o;
		this._loopInternal();
	},
	_loopInternal : function() {
		this.updateOrbitalData();
		setTimeout("ssorbits._loopInternal();", this._updateInterval);

	}
};
