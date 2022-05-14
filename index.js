// Your code here
function createEmployeeRecord(arr) {
    return {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour: arr[3],
      timeInEvents: [],
      timeOutEvents: []
    }
  }
  
  function createEmployeeRecords(employeesData) {
    return employeesData.map((eachData) => {
      return createEmployeeRecord(eachData);
    })
  }
  
  function createTimeInEvent(employee, timeStamp) {
    const [date, punchedInStamp] = timeStamp.split(' ');
  
    employee.timeInEvents.push({
      type: 'TimeIn',
      hour: parseInt(punchedInStamp),
      date: date
    })
  
    return employee;
  }
  
  function createTimeOutEvent(employee, timeStamp) {
    const [date, punchedOutStamp] = timeStamp.split(' ');
  
    employee.timeOutEvents.push({
      type: 'TimeOut',
      hour: parseInt(punchedOutStamp),
      date: date
    })
  
    return employee;
  }
  
  function hoursWorkedOnDate(employee, givenDate) {
    const timeIn = employee.timeInEvents.find((e) => {
      return e.date === givenDate
    });
  
    const timeOut = employee.timeOutEvents.find((e) => {
      return e.date === givenDate
    });
  
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  function wagesEarnedOnDate(employee, givenDate) {
    const timeIn = employee.timeInEvents.find((e) => {
      return e.date === givenDate
    });
  
    const timeOut = employee.timeOutEvents.find((e) => {
      return e.date === givenDate
    });
  
    const totalHoursWorked = (timeOut.hour - timeIn.hour) / 100;
  
    return totalHoursWorked * employee.payPerHour;
  }
  
  function allWagesFor(employee) {
    // .reduce(callbackFn, initialValue)
    // let sum = 0;
    const datesWorked = employee.timeInEvents.map((e) => {
      return e.date;
    })
  
    // for (let date of datesWorked) {
    //   sum += wagesEarnedOnDate(employee, date);
    // }
  
    const wage = datesWorked.reduce((sum, date) => {
      return sum+=wagesEarnedOnDate(employee, date);
    }, 0);
    
    return wage;
    // return sum;
  }
  
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((sum, employee) => {
      return sum+=allWagesFor(employee);
    }, 0);
  }