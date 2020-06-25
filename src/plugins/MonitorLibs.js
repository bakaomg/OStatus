import dayjs from 'dayjs';

//获取运行时间所需 Unix 时间戳
export const getCustomUptimeUnixTime = (days) => {
    const dates = [];
    const today = dayjs(new Date().setHours(0, 0, 0, 0));

    for (let d = 0; d < days; d++) {
        dates.push(today.subtract(d, 'day'));
    }

    const ranges = [];

    dates.forEach(date => {
        ranges.push(`${date.unix()}_${date.add(1, 'day').unix()}`);
    });

    return ranges.join('-');
}

//计算正常运行的平均百分比
export const getUpTime = (value) => {
    return (Math.floor(value * 100) / 100).toString();
}

//获取事件类型
export const getEventType = (type) => {
    switch (type) {
        case 1:
            return 'Down'
        case 2:
            return 'UP'
        case 99:
            return 'Paused'
        case 98:
            return 'Started'
    }
}

export const buildMonitor = (monitorData) => {
    //获取监视器状态
    monitorData.getMonitorStatus = () => {
        switch (monitorData.status) {
            case 0:
                return 'Paused';
            case 1:
                return 'Not Checked Yet';
            case 2:
                return 'UP';
            case 8:
                return 'Seems Down';
            case 9:
                return 'Down';
        }
    };
    monitorData.getMonitorStatusClass = () => {
        status = monitorData.getMonitorStatus().replace(/\s+/g, "_");
        return "status status-" + status;
    };
    //计算正常运行的平均百分比
    monitorData.getAverage = () => {
        let ranges = monitorData.custom_uptime_ranges.split('-');
        return getUpTime(ranges.pop());
    };
    //获取监视器类型
    monitorData.getMonitorType = () => {
        switch (monitorData.type) {
            case 1:
                return "HTTP(s)";
            case 2:
                return "Keyword";
            case 3:
                return "Ping";
            case 4:
                return "Port";
            case 5:
                return "Heartbeat";
        }
    };
    return monitorData;
}
