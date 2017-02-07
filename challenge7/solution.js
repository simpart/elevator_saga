{
    init: function(elevators, floors) {
        for(var idx in elevators) {
            this.initElev(elevators[idx],idx);
        }
    },
    initElev: function(elev,idx) {
        alert(elev.maxPassengerCount());
        elev.on("stopped_at_floor", function(floorNum) {
            //console.log(this.loadFactor())
        })
        elev.on("floor_button_pressed", function(f_num) {
            for(var elev_idx in elev.gototbl) {
                elev.gototbl[elev_idx]++;
                if (elev_idx === f_num) {
                    elev.gototbl[elev_idx]++;
                }
            }
            var max = 0;
            for(var elev_idx in elev.gototbl) {
                if (max < elev.gototbl[elev_idx]) {
                    
                }
            }
            this.goToFloor(f_num);
        });
        elev.idx = idx;
        elev.gototbl = new Array(0,0,0);
        this.elevObj.push(elev);
    },
    elevObj: new Array(),
    update: function(dt, elevators, floors) {
                // We normally don't need to do anything here
    }
}

