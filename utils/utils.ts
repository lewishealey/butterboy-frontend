import moment from 'moment';

export function getDate(date) {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  export function getDeliveryDate(object) {
      var date = moment().format("MM-DD-YYYY");
      var time = "09:00";
      var now = moment();
      var today = moment(date + ' ' + time);
      const nowPlus1 = moment(today).add(1, 'days');
      const nowPlus2 = moment(today).add(2, 'days');
      const nowPlus3 = moment(today).add(3, 'days');
      const nowPlus4 = moment(today).add(4, 'days');
  
      let deliveryDayNums = [];
      const settings = object[1];
      settings.deliveryDays.forEach(delivery =>
          deliveryDayNums.push(parseInt(delivery.value))
      )
  
      if(nowPlus1.diff(now, 'hours') >= settings.notice) {
          if(deliveryDayNums.includes(nowPlus1.day())) {
            console.log(nowPlus1)
              return nowPlus1;
          }
      }
  
      if(nowPlus2.diff(now, 'hours') >= settings.notice) {
          if(deliveryDayNums.includes(nowPlus2.day())) {
            console.log(nowPlus2)
            return nowPlus2;
          }
      }
  
      if(nowPlus3.diff(now, 'hours') >= settings.notice) {
          if(deliveryDayNums.includes(nowPlus3.day())) {
            console.log(nowPlus3)
            return nowPlus3;
          }
      }
  
      if(nowPlus4.diff(now, 'hours') >= settings.notice) {
          if(deliveryDayNums.includes(nowPlus4.day())) {
            console.log(nowPlus4)
            return nowPlus4;
          }
      }
  }
