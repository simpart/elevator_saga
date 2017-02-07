{
    init: function(elevators, floors) {
        for(var idx in elevators) {
            this.initElev(elevators[idx],idx);
        }
    },
    initElev: function(elev,idx) {
        elev.on("floor_button_pressed", function(f_num) {
            this.goToFloor(f_num);
        });
        elev.idx = idx;
        this.elevObj.push(elev);
    },
    elevObj: new Array(),
    update: function(dt, elevators, floors) {
                // We normally don't need to do anything here
    }
}
