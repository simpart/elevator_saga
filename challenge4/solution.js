// Challenge #4: Transport 28 people in 60 seconds or less
// idle時、最後にボタンが押された階へ行く

{
    init: function(elevators, floors) {        
        for(var idx in elevators) {
            this.initElev(elevators[idx],idx);
        }
        for(var idx in floors) {
            this.initFloor(floors[idx],idx);
        }
    },
    initElev: function(elev,idx) {
        elev.on("idle", function() {
            //elev.goToFloor(Math.floor( Math.random() * 8 ));
            this.goToFloor(this.waitFloor);
        });
        elev.on("floor_button_pressed", function(f_num) {
            this.goToFloor(f_num);
        });
        elev.idx = idx;
        elev.waitFloor = 0;
        this.elevObj.push(elev);
    },
    elevObj: new Array(),
    initFloor: function(floor,idx) {
        var ctl = this;
        floor.on("up_button_pressed", function() {
            for(var idx in ctl.elevObj) {
                ctl.elevObj[idx].waitFloor = this.floorNum();
            }
        });
        floor.on("down_button_pressed", function() {
            for(var idx in ctl.elevObj) {
                ctl.elevObj[idx].waitFloor = this.floorNum();
            }
        });
    },
    test: 'test',
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}
