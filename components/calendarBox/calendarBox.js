//index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    curYear: { // 当前显示的年
      type: Number,
      value: new Date().getFullYear()
    },
    curMonth: { // // 当前显示的月
      type: Number,
      value: new Date().getMonth() + 1
    },
    curDay: {
      type: Number,
      value: new Date().getDate()
    },
    valueList: {
      type: Array,
      value: []
    },
    legend: {
      type: Array,
      value: []
    }
  },
  // 监听父组件year的变化
  observers: {
    "valueList": function (valueList) {
      this.getAllArr()
    }
  },
  data: {
    navData: [
      {
        text: '1月'
      },
      {
        text: '2月'
      },
      {
        text: '3月'
      },
      {
        text: '4月'
      },
      {
        text: '5月'
      },
      {
        text: '6月'
      },
      {
        text: '7月'
      },
      {
        text: '8月'
      },
      {
        text: '9月'
      },
      {
        text: '10月'
      },
      {
        text: '11月'
      },
      {
        text: '12月'
      }
    ],
    currentTab: 0,
    navScrollLeft: 0,
    currentMonthDateLen: 0, // 当月天数
    preMonthDateLen: 0, // 当月中，上月多余天数
    allArr: [], // 当月所有数据,
    selectedDay: {}, //记录选中日期
    years: null,
    currentYear: new Date().getFullYear(),
    currentMonth: new Date().getMonth() + 1,
    currentDay: new Date().getDate()
  },
  //事件处理函数
  ready() {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          pixelRatio: res.pixelRatio,
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    })
    this.setData({
      currentYear: this.data.curYear,
      currentMonth: this.data.curMonth,
      currentDay: this.data.curDay,
      currentTab: this.data.curMonth - 1
    })
  },
  methods: {
    // 获取某年某月总共多少天
    getDateLen(year, month) {
      let actualMonth = month - 1;
      let timeDistance = +new Date(year, month) - +new Date(year, actualMonth);
      return timeDistance / (1000 * 60 * 60 * 24);
    },
    // 获取某月1号是周几
    getFirstDateWeek(year, month) {
      return new Date(year, month - 1, 1).getDay()
    },
    // 上月 年、月
    preMonth(year, month) {
      if (month == 1) {
        return {
          year: --year,
          month: 12
        }
      } else {
        return {
          year: year,
          month: --month
        }
      }
    },
    // 下月 年、月
    nextMonth(year, month) {
      if (month == 12) {
        return {
          year: ++year,
          month: 1
        }
      } else {
        return {
          year: year,
          month: ++month
        }
      }
    },
    // 获取当月数据，返回数组
    getCurrentArr() {
      let curYear = new Date().getFullYear();
      let curMon = new Date().getMonth() + 1;
      let curDay = new Date().getDate();
      let valueList = this.data.valueList || [];
      let currentMonthDateLen = this.getDateLen(this.data.currentYear, this.data.currentMonth) // 获取当月天数
      let currentMonthDateArr = [] // 定义空数组
      if (currentMonthDateLen > 0) {
        for (let i = 1; i <= currentMonthDateLen; i++) {
          let item = {}; 
          if (this.data.currentYear == curYear && this.data.currentMonth == curMon && i == curDay ) {
            item = {
              month: 'current', // 只是为了增加标识，区分上下月
              currenDay: true,
              date: i
            }
          } else {
           item = {
              month: 'current', // 只是为了增加标识，区分上下月
              date: i
            }
          }
          if(this.data.currentYear == this.data.curYear && this.data.currentMonth == this.data.curMonth && this.data.currentDay == i){
            item.selected = true
          }
          for (let j = 0; j < valueList.length; j++){
            if (this.data.currentYear == valueList[j].year && this.data.currentMonth == valueList[j].month && valueList[j].day == i){
              item.num = valueList[j].count
            }
          }
          currentMonthDateArr.push(item)
        }
      }
      this.setData({
        currentMonthDateLen
      })
      return currentMonthDateArr
    },
    // 获取当月中，上月多余数据，返回数组
    getPreArr() {
      let preMonthDateLen = this.getFirstDateWeek(this.data.currentYear, this.data.currentMonth) // 当月1号是周几 == 上月残余天数）
      let preMonthDateArr = [] // 定义空数组
      if (preMonthDateLen > 0) {
        let { year, month } = this.preMonth(this.data.currentYear, this.data.currentMonth) // 获取上月 年、月
        let date = this.getDateLen(year, month) // 获取上月天数
        for (let i = 0; i < preMonthDateLen; i++) {
          preMonthDateArr.unshift({ // 尾部追加
            month: 'pre', // 只是为了增加标识，区分当、下月
            date: date
          })
          date--
        }
      }
      this.setData({
        preMonthDateLen
      })
      return preMonthDateArr
    },
    // 获取当月中，下月多余数据，返回数组
    getNextArr() {
      let nextMonthDateLen = 42 - this.data.preMonthDateLen - this.data.currentMonthDateLen // 下月多余天数
      let nextMonthDateArr = [] // 定义空数组
      if (nextMonthDateLen > 0) {
        for (let i = 1; i <= nextMonthDateLen; i++) {
          nextMonthDateArr.push({
            month: 'next',// 只是为了增加标识，区分当、上月
            date: i
          })
        }
      }
      return nextMonthDateArr
    },
    // 整合当月所有数据
    getAllArr() {
      let preArr = this.getPreArr()
      let currentArr = this.getCurrentArr()
      let nextArr = this.getNextArr()
      let allArr = [...preArr, ...currentArr, ...nextArr]
      this.setData({
        allArr
      })
    },
    // 点击每天
    getDayClick(e) {
      let item = e.currentTarget.dataset.item;
      let index = e.currentTarget.dataset.index;
      if(item.month == "next" || item.month == "pre"){
        return false
      } else {
        let newAllArr = [];
        for (let i = 0; i < this.data.allArr.length; i++) {
          let arr = this.data.allArr[i]
          arr.selected = false
          if (this.data.allArr[i].date == item.date && i == index) {
            arr.selected = !arr.selected
            newAllArr.push(arr)
          } else {
            newAllArr.push(arr)
          }
        }
        this.setData({
          allArr: newAllArr,
          currentDay: item.date
        })
        let newItem = {
          value:this.setNewTime('day'),
          type: true
        }
        this.triggerEvent('sendObj', newItem)
      }
    },
    getDateTime(e) {
      let years = e.detail.value;
      this.setData({
        currentYear: years
      })
      this.getAllArr();
      let newItem = {
        value: this.setNewTime('year')
      }
      this.triggerEvent('sendObj', newItem)
    },
    switchNav(event) {
      const cur = event.currentTarget.dataset.current;
      //每个tab选项宽度占1/5
      const singleNavWidth = this.data.windowWidth / 5;
      //tab选项居中                            
      this.setData({
        navScrollLeft: (cur - 2) * singleNavWidth
      })
      if (this.data.currentTab == cur) {
        return false;
      } else {
        this.setData({
          currentTab: cur,
          currentMonth: cur + 1
        })
        this.getAllArr()
      }
      let newItem = {
        value: this.setNewTime('month')
      }
      this.triggerEvent('sendObj', newItem)
    },
    swiperTab(event) {
      const cur = event.detail.current;
      const singleNavWidth = this.data.windowWidth / 5;
      this.setData({
        currentTab: cur,
        currentMonth: cur + 1,
        navScrollLeft: (cur - 2) * singleNavWidth
      });
      this.getAllArr()
    },
    setNewTime(type){
      let years = this.data.currentYear;
      let month = this.data.currentMonth >= 10 ? this.data.currentMonth : '0'+this.data.currentMonth;
      let day = this.data.currentDay >= 10 ? this.data.currentDay : '0'+this.data.currentDay;
      if(type == 'year' || type == 'month'){
        return `${years}-${month}`
      }else{
        return `${years}-${month}-${day}`
      }
    }
  }
})