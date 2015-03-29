;;;+function() {
        /**
     * 对原生的日期对象进行封装
     * @class SuperDate
     * @constructor
     */
    var SuperDate = function(datetime) {
        /**
         * 构造方法
         * @method init
         * @param [{String|Number}] datetime 初始化的日期，如果为空则初始化当前日期
         */
        var sourceDatetime, isie;
        sourceDatetime = datetime;
        datetime = datetime ? new Date(datetime) : new Date();
        isie = !-[1,];
        //操蛋的ie8不支持把字符串转为时间戳，所以就只能这样处理了
        if(isNaN(datetime)) {
            datetime = sourceDatetime.split(/[\-|\:|\s|\/]/g);
            datetime[1] = +datetime[1] - 1;
            switch(datetime.length.toString()) {
                case "3":
                    datetime = new Date(datetime[0], datetime[1], datetime[2]);
                break;
                case "4":
                    datetime = new Date(datetime[0], datetime[1], datetime[2], datetime[3]);
                break;
                case "5":
                    datetime = new Date(datetime[0], datetime[1], datetime[2], datetime[3], datetime[4]);
                break;
                case "6":
                    datetime = new Date(datetime[0], datetime[1], datetime[2], datetime[3], datetime[4], datetime[5]);
                break;
            }
        }
        this.yyyy = datetime.getFullYear();
        this.MM = datetime.getMonth() + 1;
        this.dd = datetime.getDate();
        this.HH = datetime.getHours();
        this.mm = datetime.getMinutes();
        this.ss = datetime.getSeconds();
        this.D = datetime.getDay();
        this.datetime = datetime;
        this.timestamp = +datetime;
    }
    SuperDate.prototype = {
        /**
         * 增加年份
         * @method addYear
         * @param {Number} year 具体需要增加的年份数，可以为负数
         */
        addYear: function(year) {
            return new SuperDate((this.yyyy + year) + "-" + this.MM + "-" + this.dd + " " + this.HH + ":" + this.mm + ":" + this.ss);
        },
        /**
         * 增加月份
         * @method addMonth
         * @param {Number} month 具体需要增加的月份数，可以为负数
         */
        addMonth: function(month) {
            var year, r, maxDay;
            year = (month - month % 12) / 12;
            year = this.yyyy + year;
            month = month % 12;
            r = this.MM + month;
            if(r < 0) {
                year -= 1;
                month = 12 + r;
            }
            else if(r > 0) {
                if(r > 12) {
                    year += 1;
                    month = r % 12;
                }
                else {
                    month = r;
                }
            }
            else {
                year -= 1;
                month = 12;
            }
            switch(month) {
                case 1: case 3: case 5: case 7: case 8: case 10: case 12:
                    maxDay = 31
                break;
                case 2:
                    if(year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
                        maxDay = 29;
                    }
                    else {
                        maxDay = 28;
                    }
                break;
                default:
                    maxDay = 30;
            }
            return new SuperDate(year + "-" + month + "-" + (this.dd > maxDay ? maxDay : this.dd) + " " + this.HH + ":" + this.mm + ":" + this.ss);
        },
        /**
         * 增加天数
         * @method addDay
         * @param {Number} day 具体需要增加的天数，可以为负数
         */
        addDay: function(day) {
            return new SuperDate(this.timestamp + day * 86400000);
        },
        /**
         * 增加小时
         * @method addHour
         * @param {Number} hour 具体需要增加的小时数，可以为负数
         */
        addHour: function(hour) {
            return new SuperDate(this.timestamp + hour * 3600000);
        },
        /**
         * 增加分钟
         * @method addMinute
         * @param {Number} minute 具体需要增加的分钟数，可以为负数
         */
        addMinute: function(minute) {
            return new SuperDate(this.timestamp + minute * 60000);
        },
        /**
         * 增加秒
         * @method addSecond
         * @param {Number} second 具体需要增加的秒数，可以为负数
         */
        addSecond: function(second) {
            return new SuperDate(this.timestamp + second * 1000);
        },
        /**
         * 对比时间
         * @method compare
         * @param {Date} datetime 想要对比的时间
         * @return {Null} 对比的日期不合法
         * @return {Number}
         * 如果返回值为1，当前日期大于对比时间；
         * 如果当前值为-1，当前日期小于对比时间；
         * 如果当前值为0，当前日期等于对比时间
         */
        compare: function(datetime) {
            var timestamp;
            timestamp = new SuperDate(datetime).timestamp;
            if(isNaN(timestamp)) {
                return null;
            }
            else if(timestamp < this.timestamp) {
                return 1;
            }
            else if(timestamp > this.timestamp) {
                return -1;
            }
            else {
                return 0;
            }
        },
        valueOf: function() {
            return this.timestamp;
        },
        /**
         * 将时间按制定的字符串进行格式化
         * @method format
         * @param {String} format 需要格式化的格式。例：yyyy-MM-dd HH:mm:ss
         * @return {String}
         */
        format: function(format) {
            var _this, chinaeseDay, key;
            _this = this;
            chinaeseDay = ["日", "一", "二", "三", "四", "五", "六"];
            if(format) {
                return format.replace(/(y+)|M+|d+|H+|m+|s+|D/g, function(s) {
                    var value;
                    switch(s[0]) {
                        case "D":
                            return chinaeseDay[_this.D];
                        break;
                        default:
                            key = s + s + s + s;
                            if("y" == s[0]) {
                                key = "yyyy";
                            }
                            else {
                                key = key;
                                key = key.substr(key.length - 2);
                            }
                            value = "0" + _this[key].toString();
                            value = value.substr(value.length - s.length);
                    }
                    return value;
                });
            }
            else {
                return new Date(this.datetime);
            }
        }
    }
    /**
     * 计算两个时间相隔的天数
     * @method subDay
     * @param {Date} d1 开始时间
     * @param {Date} d2 结束时间
     */
    $.extend($, {
        date: function(d) {
            return new SuperDate(d);
        },
        subDay: function(d1, d2) {
            d1 = +new SuperDate(d1).timestamp;
            d2 = +new SuperDate(d2).timestamp;
            return (d2 - d1) / 86400000;
        },
        toDate: function(d) {
            return $.date(d).format("yyyy-MM-dd");
        },
        toDatetime: function(d) {
            return $.date(d).format("yyyy-MM-dd HH:mm:ss");
        }
    })
}();
