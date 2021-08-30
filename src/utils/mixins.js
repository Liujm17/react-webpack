export function monthDays(startingTimeInMonth) {
    let days=[]
    let startDay=new Date(new Date(startingTimeInMonth).getTime())
    let currentDay =new Date(new Date(startingTimeInMonth).getTime())
    // let startDay=new Date(new Date('2021-8').getTime())
    //  let currentDay =new Date(new Date('2021-8').getTime())
     //当前月份和开始月份,每当同一个月的时候往days中push一个只有年月日时间戳
     //然后currentDay时间戳天数加1,再while判断，直到currentDay.getMonth()与startDay.getMonth()不等
      while (currentDay.getMonth() === startDay.getMonth()) {
        days.push(currentDay.getTime());
        currentDay.setDate(currentDay.getDate() + 1);
    }
    //获取这个月1号是周几,周日的话startDay.getDay()为0即为false所以数组长度为6
    //fill是为null值填充长度为6的数组
    //concat为合并之前的已经有一个月的时间戳的days，因为这是开始的没有的日期,所以是Array合并days
    days = new Array(startDay.getDay() ? startDay.getDay() - 1 : 6)
        .fill(null)
        .concat(days);
    //days的最后一天的时间戳
    const lastDay = new Date(days[days.length - 1]);
    
    //同理，因为是结尾的没有的日期，所以是days合并Array
    days = days.concat(
      //最后一天的时间戳获取是周几,周日为false即为0,其他为7 - lastDay.getDay()数量的null
        new Array(lastDay.getDay() ? 7 - lastDay.getDay() : 0).fill(null)
    );
     const weeks = [];
   
    for (let row = 0; row < days.length / 7; ++row) {
        const week = days.slice(row * 7, (row + 1) * 7);
        weeks.push(week);
    }
    return weeks
}

 