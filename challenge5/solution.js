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
        var ctl = this;
        elev.on("idle", function() {
            var go_lst = this.goto_mng.getGoList(this);
            if ((go_lst.length == 1) && (go_lst[0] == 0)) {
                console.log('pick up');
                // 優先度1：行き先階数が0階のみの場合、0階に行く途中で下の階に行きたい人を1回だけ拾う
                var down_wait = ctl.wait_mng.getDownWait(this);
                if (null !== down_wait) {
                    this.goto_mng.go(this,down_wait);
                }
                this.goto_mng.go(this,0);
                return;
            } else if (0 != go_lst.length) {
                // 優先度2：乗客が行きたい階数(0階以外)を上階から順に止まる
                var go_loop = 0;
                //this.goto_mng.go(this,go_lst[0]);
                for(go_loop=(go_lst.length-1); go_loop >= 0 ;go_loop--) {
                    if ((0 === go_lst[go_loop]) && (0 === go_loop)) {
                        continue;
                    }
                    ctl.wait_mng.down_tbl[go_lst[go_loop]] = false;
                    this.goto_mng.go(this,go_lst[go_loop]);
                }
                return;
            }
            //this.goto_mng.dumpTbl(this);
            // 優先度４：下階に行きたい人が待っているフロアの一番上階
            var down_wait2 = ctl.wait_mng.getDownWait(this);
            if (null !== down_wait2) {
                this.goto_mng.go(this,down_wait2);
                return;
            }
            // 優先度３：上階に行きたい人が待っているフロアの中で一番下階
            var up_wait = ctl.wait_mng.getUpWait(this);
            if (null !== up_wait) {
                this.goto_mng.go(this,up_wait);
                return;
            }
            
            var rand = Math.floor( Math.random() * 6 );
            ctl.wait_mng.down_tbl[rand] = false;
            ctl.wait_mng.down_tbl[rand] = false;
            this.goto_mng.go(this,rand);
        });
        elev.on("floor_button_pressed", function(floorNum) {
            this.goto_mng.tbl[floorNum] = true;
        })
        elev.idx = idx;
        elev.goto_mng = {};
        elev.goto_mng.go = function(elv,gf) {
            //elv.goto_mng.dumpTbl(elv);
            //console.log('go to ' + gf);
            elv.goto_mng.tbl[gf] = false;
            elv.goToFloor(gf);
        };
        elev.goto_mng.tbl = new Array(false,false,false,false,false,false);
        elev.goto_mng.getGoList = function (elev) {
            var ret_val = new Array();
            for (var idx in elev.goto_mng.tbl) {
                if (true == elev.goto_mng.tbl[idx]) {
                    ret_val.push(idx);
                }
            }
            return ret_val;
        };
        elev.goto_mng.dumpTbl = function (elv) {
            var dump = '';
            for(var idx in elv.goto_mng.tbl) {
                if ('' != dump) {
                    dump = dump + ',';
                }
                dump = dump + elv.goto_mng.tbl[idx]; 
            }
            console.log('{' + dump + '}');
        }
        this.elevObj.push(elev);
    },
    elevObj: new Array(),
    initFloor: function(floor,idx) {
        var ctl = this;
        floor.on("up_button_pressed", function() {
            ctl.wait_mng.up_tbl[this.floorNum()] = true;
        });
        floor.on("down_button_pressed", function() {
            ctl.wait_mng.down_tbl[this.floorNum()] = true;
        });
        ctl.florObj.push(floor);
    },
    florObj: new Array(),
    wait_mng: {
        up_tbl : new Array(false,false,false,false,false,false),
        down_tbl : new Array(false,false,false,false,false,false),
        getDownWait: function (elv) {
            var down_loop = 0;
            for(down_loop=(elv.currentFloor()-1); down_loop > 0 ; down_loop--) {
                if(true === this.down_tbl[down_loop]) {
                    this.down_tbl[down_loop] = false;
                    return down_loop;
                }
            }
            return null;
        },
        getUpWait: function() {
            for(var up_idx in this.up_tbl) {
                if (true === this.up_tbl[up_idx]) {
                    this.up_tbl[up_idx] = false;
                    return up_idx;
                }
            }
            return null;
        }
    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}
