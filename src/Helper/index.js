import moment from 'moment';

export const formatNumbers = (number) => {
  const nfObject = new Intl.NumberFormat('en-IN');
  return nfObject.format(number);
};

export const calculateStock = (data) => {
  let stock = 0

  data.forEach(element => {
    stock += element.quantity;
  });

  return stock;
}

export const getOrderStatus = (item) => {

  const statusOptions = [
    {
      title: "Order Confirmed",
      value: "CONFIRMED",
      isEnable: true,
      isChecked: false,
      color: '#1c1c1c'
    },
    {
      title: "Out for Delivery",
      value: "OFD",
      isEnable: false,
      isChecked: false,
    },
    {
      title: "Delivered",
      value: "DELIVERED",
      isEnable: false,
      isChecked: false,
    }
  ];

  if (item.orderStatus === 'CONFIRMED') {
    statusOptions[0].isEnable = false;
    statusOptions[0].isChecked = true;

    statusOptions[1].isEnable = true;

    statusOptions[1].color = '#1c1c1c';
  } else if (item.orderStatus === 'OFD') {
    statusOptions[0].isEnable = false;
    statusOptions[0].isChecked = true;

    statusOptions[1].isEnable = true;
    statusOptions[1].isChecked = true;

    statusOptions[2].isEnable = true;

    statusOptions[1].color = '#1c1c1c';
    statusOptions[2].color = '#1c1c1c';
  } else if (item.orderStatus === 'DELIVERED') {
    statusOptions[0].isEnable = false;
    statusOptions[0].isChecked = true;


    statusOptions[1].isEnable = false;
    statusOptions[1].isChecked = true;


    statusOptions[2].isEnable = false;
    statusOptions[2].isChecked = true;

    statusOptions[1].color = '#1c1c1c';
    statusOptions[2].color = '#1c1c1c';
  }

  return statusOptions;
}

export const getOrderTrackData = (item) => {

  const orderStatusOptions = [
    {
      id: 1,
      title: "Order Placed",
      status: "INPROGRESS",
      value: false,
      date: moment(item.orderPlacedDate).format("ddd, Do MMM 'YY"),
    },
    {
      id: 2,
      title: "Order Confirmed",
      status: "CONFIRMED",
      value: false,
      date: moment(item.orderConfirmedDate).format("ddd, Do MMM 'YY"),
    },
    {
      id: 3,
      title: "Out for Delivery",
      status: "OFD",
      value: false,
      date: moment(item.orderOutForDeliveryDate).format("ddd, Do MMM 'YY"),
    },
    {
      id: 4,
      title: "Delivered",
      status: "DELIVERED",
      value: false,
      date: moment(item.orderDeliveredDate).format("ddd, Do MMM 'YY"),
    },

  ]

  let data = orderStatusOptions.map(option => ({
    ...option,
    value: option.status === item.orderStatus || option.id <= orderStatusOptions.find(o => o.status === item.orderStatus)?.id
  }));



  if (item.orderCancelled.status) {
    const index = (data.findIndex((val) => val.status === item.orderStatus)) + 1;

    const cancelStatus = {
      id: 5,
      title: "Order Cancelled",
      status: "CANCELLED",
      value: true,
      date: moment(item.orderCancelled.date).format("ddd, Do MMM 'YY"),
    }

    data = [...data.slice(0, index), cancelStatus];
  }

  if (item.orderReturned.status) {
    const index = (data.findIndex((val) => val.status === item.orderStatus)) + 1;

    const cancelStatus = [
      {
        id: 5,
        title: "Return Requested",
        status: "RETURN",
        value: true,
        date: moment(item.orderReturned.date).format("ddd, Do MMM 'YY"),
      }
    ]

    data = [...data.slice(0, index), ...cancelStatus];
  }

  if (item.orderRefund.status) {
    const cancelStatus = [
      {
        id: 6,
        title: "Return Completed",
        status: "REFUND",
        value: true,
        date: moment(item.orderRefund.date).format("ddd, Do MMM 'YY"),
      }
    ]

    data = [...data, ...cancelStatus];
  }

  return data;
}

export const formatEnum = (item) => item.replace("_", " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

export const addIsShowToCategories = (categories, showVal) =>
  categories.map((category) => ({
    ...category,
    isShow: category.isShow ?? showVal,
    secondLevelCategories: category.secondLevelCategories.map((secondLevel) => ({
      ...secondLevel,
      isShow: secondLevel.isShow ?? showVal,
    })),
  }));

export const isResetPassValidated = (resetPassword, showInst, isPassMatch) => {
  const result = !resetPassword.currentPassword || !resetPassword.newPassword || !resetPassword.confirmNewPassword || showInst || isPassMatch;
  return !result;
}

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const nameRegex = /^[a-zA-Z\s]+$/;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{8,}$/;

export const validateSignup = (name, value, newErrors, user) => {
  if (name === "name") {
    if (!value.trim()) {
      newErrors.name = "Please enter your name";
    } else if (!nameRegex.test(value)) {
      newErrors.name = "Please enter a valid name (letters and spaces only)";
    } else {
      newErrors.name = "";
    }
  }

  if (name === "email") {
    if (!value.trim()) {
      newErrors.email = "Please enter your email address";
    } else if (!emailRegex.test(value)) {
      newErrors.email = "Please enter your valid email address";
    } else {
      newErrors.email = "";
    }
  }

  if (name === "password") {
    if (!value.trim()) {
      newErrors.password = "Please create your password";
    } else if (!passwordRegex.test(value)) {
      newErrors.password = "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.";
    } else {
      newErrors.password = "";
    }
  }

  if (name === "cpassword") {
    if (!value.trim()) {
      newErrors.cpassword = "Please confirm your password";
    } else if (value !== user.password) {
      newErrors.cpassword = "Passwords do not match";
    } else {
      newErrors.cpassword = "";
    }
  }

  // Validate cpassword when password is changed
  if (name === "password" && user.cpassword) {
    newErrors.cpassword = value === user.cpassword ? "" : "Passwords do not match";
  }

  return newErrors;
}

export const getCategoryData = (categories, topLevel, secondLevel, thirdLevel, categoryParams) => {
  let categoryData = [];

  const secondCat = categories.find((item) => item.topLevelCategory === topLevel).secondLevelCategories;

  if (topLevel && !secondLevel && !thirdLevel) {
    const secondCatResult = secondCat.map((item) => ({ checked: false, id: item._id, name: item.secondLevelCategory }));
    if (categoryParams) secondCatResult.forEach(item => (item.checked = categoryParams.split(',').includes(item.name)));
    categoryData = secondCatResult;
  }

  if (topLevel && secondLevel && !thirdLevel) {
    const thirdCat = secondCat.find((item) => item.secondLevelCategory === secondLevel).thirdLevelCategories;
    const thirdCatResult = thirdCat.map((item) => ({ checked: false, id: item._id, name: item.thirdLevelCategory }));
    if (categoryParams) thirdCatResult.forEach(item => (item.checked = categoryParams.split(',').includes(item.name)));
    categoryData = thirdCatResult;
  }

  return categoryData;
}

export const validateAddress = (prev, name, value) => {
  const newError = { ...prev };

  if (name === 'fullName') {
    if (!value) {
      newError.fullName = 'Please enter your full name';
    } else if (!/^[a-zA-Z ]{3,}$/.test(value)) {
      newError.fullName = 'Name must be at least 3 characters long, Eg: John Doe';
    } else {
      newError.fullName = ''
    }
  } else if (name === 'mobile') {
    if (!value) {
      newError.mobile = 'Please enter your mobile number';
    } else if (!/^\d{10}$/.test(value)) {
      newError.mobile = 'Mobile No. must be ten digits';
    } else {
      newError.mobile = ''
    }
  } else if (name === 'streetAddress') {
    if (!value) {
      newError.streetAddress = 'Please enter your full address';
    } else {
      newError.streetAddress = ''
    }
  } else if (name === 'city') {
    if (!value) {
      newError.city = 'Please enter your City/District';
    } else if (!/^[a-zA-Z ]{3,}$/.test(value)) {
      newError.city = 'City/District must be at least 3 characters long, Eg: Ranchi';
    } else {
      newError.city = ''
    }
  } else if (name === 'state') {
    if (!value) {
      newError.state = 'Please select your state';
    } else {
      newError.state = ''
    }
  } else if (name === 'pinCode') {
    if (!value) {
      newError.pinCode = 'Please enter your 6 digit Pin Code';
    } else if (!/^\d{6}$/.test(value)) {
      newError.pinCode = 'Please enter your 6 digit Pin Code';
    } else {
      newError.pinCode = ''
    }
  }

  return newError;
}