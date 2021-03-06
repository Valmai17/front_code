define(function (require) {
    var dateFunc = {
        getDuration: function (date) {
            // how many days of this month
            var dt = new Date(date)
            var month = dt.getMonth()
            dt.setMonth(dt.getMonth() + 1)
            dt.setDate(0);
            return dt.getDate()
        },
        changeDay: function (date, num) {
            var dt = new Date(date)
            return new Date(dt.setDate(dt.getDate() + num))
        },
        getStartDate: function (date) {
            // return first day of this month
            return new Date(date.getFullYear(), date.getMonth(), 1)
        },
        getEndDate: function (date) {
            // get last day of this month
            var dt = new Date(date.getFullYear(), date.getMonth() + 1, 1) // 1st day of next month
            return new Date(dt.setDate(dt.getDate() - 1)) // last day of this month
        },
        format: function (date, format) {
            if (typeof date === 'string') {
                date = new Date(date.replace(/-/g, '/'))
            } else {
                date = new Date(date)
            }

            var map = {
                'M': date.getMonth() + 1,
                'd': date.getDate(),
                'h': date.getHours(),
                'm': date.getMinutes(),
                's': date.getSeconds(),
                'q': Math.floor((date.getMonth() + 3) / 3),
                'S': date.getMilliseconds()
            }

            format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
                var v = map[t]
                if (v !== undefined) {
                    if (all.length > 1) {
                        v = '0' + v
                        v = v.substr(v.length - 2)
                    }
                    return v
                } else if (t === 'y') {
                    return String(date.getFullYear()).substr(4 - all.length)
                }
                return all
            })
            return format
        }
    }

    return dateFunc;
});
