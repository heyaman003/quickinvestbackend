const symbols = /[!@#$%^&*()_+{:;"'|/}]/;
const numbers = /[0-9]/;
const re = /\S+@\S+\.\S+/;
const chars = /^[a-zA-Z\s]+$/;
const lowercase = /[a-z]/;
const uppercase = /[A-Z]/;
export const Validate = (values) => {
  let errors = {};
  // Sponsor Id validation
  if (!values.sponsorId) {
    errors.sponsorId = "Sponsor Id is required";
  }
  // Fist name validation
  if (!values.fullName) {
    errors.fullName = "Name is required";
  } else if (!chars.test(values.fullName)) {
    errors.fullName = "Please write only character";
  }
  // email validation
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!re.test(values.email)) {
    errors.email = "Please Write Valid Email";
  }
  // // mobile validation
  // if (!values.mobile) {
  //   errors.mobile = "Mobile is required";
  // } else if (values.mobile.length > 11) {
  //   errors.mobile = "Please write valid mobile number";
  // } else if (values.mobile.length < 11) {
  //   errors.mobile = "Please write valid mobile number";
  // }
  // Password validation
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Please Write More than 6 characters";
  }
  // else if (
  //   !lowercase.test(values.password) ||
  //   !uppercase.test(values.password)
  // ) {
  //   errors.password = "Please write atleast one letter";
  // }
  // else if (!symbols.test(values.password)) {
  //   errors.password = "Please write atleast one special character";
  // } else if (!numbers.test(values.password)) {
  //   errors.password = "Please write atleast one number";
  // } else if (!isNaN(values.password)) {
  //   errors.password = "Please write atlaest one character";
  // }
  // confirm password validation
  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm Password is required";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Password not match";
  }
  return errors;
};
// login validator
export const loginValidate = (values) => {
  let errors = {};
  // email validation
  if (!values.userId) {
    errors.userId = "User ID is required";
  }
  // Password validation
  if (!values.password) {
    errors.password = "Password is required";
  }
  return errors;
};
export const forgotPasswordValidate = (values) => {
  let errors = {};
  if (!values.email) {
    errors.email = "User ID is required";
  }
  return errors;
};
export const resetPasswordValidate = (values) => {
  const numbers = /[0-9]/;
  let errors = {};
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Please Write More than 6 characters";
  } else if (
    !lowercase.test(values.password) &&
    !uppercase.test(values.password)
  ) {
    errors.password = "Please write atleast one letter";
  } else if (!symbols.test(values.password)) {
    errors.password = "Please write atleast one special character";
  } else if (!numbers.test(values.password)) {
    errors.password = "Please write atleast one number";
  } else if (!isNaN(values.password)) {
    errors.password = "Please write atlaest one character";
  }
  return errors;
};

// user update password
export const updatePasswordValidate = (values) => {
  const numbers = /[0-9]/;
  let errors = {};
  // Password validation
  if (!values.new_password) {
    errors.new_password = "Password is required";
  } else if (values.new_password.length < 6) {
    errors.new_password = "Please Write More than 6 characters";
  }
  // else if (
  //   !lowercase.test(values.new_password) &&
  //   !uppercase.test(values.new_password)
  // ) {
  //   errors.new_password = "Please write atleast one letter";
  // }
  // else if (!symbols.test(values.new_password)) {
  //   errors.new_password = "Please write atleast one special character";
  // }
  // else if (!numbers.test(values.new_password)) {
  //   errors.new_password = "Please write atleast one number";
  // } else if (!isNaN(values.new_password)) {
  //   errors.new_password = "Please write atlaest one character";
  // }

  // confirm password validation
  if (!values.confirm_new_password) {
    errors.confirm_new_password = "Confirm Password is required";
  } else if (values.new_password !== values.confirm_new_password) {
    errors.confirm_new_password = "Password not match";
  }

  return errors;
};

// user trx password update
export const updateTrxPasswordValidate = (values) => {
  const numbers = /[0-9]/;
  const symbols = /[!@#$%^&*()_+{:;"'|/}]/;

  let errors = {};
  // Password validation
  if (!values.current_trx_password) {
    errors.current_trx_password = "current trx password is required";
  }
  if (!values.new_trx_password) {
    errors.new_trx_password = "Password is required";
  } else if (values.new_trx_password.length < 10) {
    errors.new_trx_password = "Please Write More than 10 characters";
  } else if (!numbers.test(values.new_trx_password)) {
    errors.new_trx_password = "Please write atleast one number";
  } else if (!isNaN(values.new_trx_password)) {
    errors.new_trx_password = "Please write atleast one character";
  } else if (!symbols.test(values.new_trx_password)) {
    errors.new_trx_password = "Please write atleast one special character";
  }
  return errors;
};

// user email update
export const updateEmailValidate = (values) => {
  const re = /\S+@\S+\.\S+/;
  let errors = {};
  if (!values.new_email) {
    errors.new_email = "Email is required";
  } else if (!re.test(values.new_email)) {
    errors.new_email = "Please Write A Valid Email Address";
  }
  return errors;
};
export const topupVaildation = (values) => {
  let errors = {};
  if (!values.userID) {
    errors.userID = "Please write user ID";
  } else if (!values.trx_password) {
    errors.trx_password = "trx Password is required";
  } else if (!values.package) {
    errors.package = "please select a packages ";
  }
  return errors;
};

// fund transfer
export const fundTransferValidate = (values) => {
  let errors = {};
  if (!values.receiver_id) {
    errors.receiver_id = "Receiver Username is required";
  }
  // else if (!values.confirm_receiver_id) {
  //   errors.confirm_receiver_id = "Receiver Username is required";
  // }
  // else if (values.receiver_id.toLowerCase() !== values.confirm_receiver_id.toLowerCase()) {
  //   errors.confirm_receiver_id = "Receiver Username not match";
  // }
  else if (!values.amount) {
    errors.amount = "Amount is required";
  }
  return errors;
};

export const UsertopupValidate = (values) => {
  let errors = {};
  if (!values.receiver_id) {
    errors.receiver_id = "Receiver Username is required";
  }
  // else if (!values.confirm_receiver_id) {
  //   errors.confirm_receiver_id = "Receiver Username is required";
  // }
  // else if (values.receiver_id.toLowerCase() !== values.confirm_receiver_id.toLowerCase()) {
  //   errors.confirm_receiver_id = "Receiver Username not match";
  // }
  else if (!values.packages) {
    errors.packages = "Select a package";
  }
  return errors;
};

export const boosterTopupValidate = (values) => {
  let errors = {};
  if (!values.user_id) {
    errors.user_id = "Receiver Username is required";
  } else if (!values.packages) {
    errors.packages = "Amount is required";
  }
  return errors;
};

export const RewardTransferValidate = (values) => {
  let errors = {};
  if (!values.receiver_id) {
    errors.receiver_id = "Receiver Username is required";
  } else if (!values.confirm_receiver_id) {
    errors.confirm_receiver_id = "Amount is required";
  } else if (values.receiver_id !== values.confirm_receiver_id) {
    errors.confirm_receiver_id = "Receiver Username not match";
  } else if (!values.amount) {
    errors.amount = "Amount is required";
  } else if (!values.remark) {
    errors.remark = "Remark is required";
  }
  return errors;
};

export const RoyaltyTransferValidate = (values) => {
  let errors = {};
  if (!values.trx_password) {
    errors.receiver_id = "Trx Password is required";
  } else if (!values.amount) {
    errors.amount = "Amount is required";
  }
  //  else if (!values.remark) {
  //   errors.remark = "Remark is required";
  // }
  return errors;
};

// deposit amount
export const depositAmountValidate = (values) => {
  let errors = {};
  if (!values.user_id) {
    errors.user_id = "User ID is required";
  } else if (!values.amount) {
    errors.amount = "Amount is required";
  } else if (!values.proof) {
    errors.proof = "Proof Image is required";
  }
  return errors;
};

// user topup account
export const topupAccountValidate = (values) => {
  let errors = {};
  if (!values.user_id) {
    errors.user_id = "User ID is required";
  } else if (!values.serialNo) {
    errors.serialNo = "Amount is required";
  }
  return errors;
};
// auto Trade upgrade
export const autoTradeUpgradeValidate = (values) => {
  let errors = {};
  if (!values.userId) {
    errors.userId = "User ID is required";
  } else if (!values.packages) {
    errors.packages = "Select a package";
  }
  return errors;
};
// user withdraw amount
export const withdrawAmountValidate = (values) => {
  let errors = {};
  if (!values.amount) {
    errors.amount = "Amount is required";
  } else if (!values.accountNumber) {
    errors.accountNumber = "AccountNumber is required";
  } else if (!values.withdrawType) {
    errors.withdrawType = "Withdraw type is required";
  }
  return errors;
};
// auto trade withdraw
export const autoTradeWithdrawValidate = (values) => {
  let errors = {};
  if (!values.withdrawalAmount) {
    errors.withdrawalAmount = "Amount is required";
  } else if (!values.trxAddress) {
    errors.trxAddress = "TRX address is required";
  }
  return errors;
};

// user update TRX address
export const updateTxrAddressValidate = (values) => {
  let errors = {};
  if (/\s/g.test(values.trx_address)) {
    errors.trx_address = "Space is not allow";
  }
  return errors;
};

// support ticket
export const supportTicketValidate = (values) => {
  let errors = {};
  if (!values.purpose) {
    errors.purpose = "purpose is required";
  } else if (!values.previous_ticket_reff) {
    errors.previous_ticket_reff = "select your Complaint";
  } else if (!values.question) {
    errors.question = "write your description please";
  }
  return errors;
};

// support contact us
export const supportValidate = (values) => {
  let errors = {};
  if (!values.name) {
    errors.name = "Name is required";
  } else if (!values.user_id) {
    errors.user_id = "user id is required";
  } else if (!values.email) {
    errors.email = "Email is required";
  } else if (!values.message) {
    errors.message = "message is required";
  }
  return errors;
};

export const supportCreateNewValidation = (values) => {
  let errors = {};
  if (!values.title) {
    errors.title = "Title is required";
  } else if (!values.description) {
    errors.description = "Decapitation is required";
  }
  return errors;
};

export const ContactValidate = (values) => {
  let errors = {};
  if (!values.name) {
    errors.name = "Your name is required";
  } else if (!values.user_id) {
    errors.user_id = "User ID is required";
  } else if (!values.email) {
    errors.email = "email is required";
  } else if (!values.message) {
    errors.message = "message is required300";
  } else if (!values.subject) {
    errors.subject = "subject is required";
  } else if (!values.mobile) {
    errors.mobile = "mobile number is required";
  }
  return errors;
};
