const RECHARGE_COMISSION_SPONSOR = 3;

const ROI_COMISSION = 0.6;

const ALL_INCOME_TYPE_NAMES = {
  RECHARGE_INCOME_TYPE: "recharge-direct-income",
};

const RECHARGE__CONSTS = {
  TOTAL_DAYS: 365,
};

const ROYALTY__CONSTS = {
  vip1: {
    teams: 20,
    level1: 10,
    totalTeamBusinessAmount: 250000,
    amount: 300,
    days: 35,
    rank: "VIP1",
  },
  vip2: {
    teams: 50,
    level1: 30,
    totalTeamBusinessAmount: 500000,
    amount: 500,
    days: 40,
    rank: "VIP2",
  },
  vip3: {
    teams: 80,
    level1: 50,
    totalTeamBusinessAmount: 750000,
    amount: 700,
    days: 40,
    rank: "VIP3",
  },
  vip4: {
    teams: 100,
    level1: 70,
    totalTeamBusinessAmount: 1200000,
    amount: 900,
    days: 40,
    rank: "VIP4",
  },
  vip5: {
    teams: 150,
    level1: 100,
    totalTeamBusinessAmount: 2500000,
    amount: 1200,
    days: 50,
    rank: "VIP5",
  },
  vip6: {
    teams: 200,
    level1: 150,
    totalTeamBusinessAmount: 5000000,
    amount: 1500,
    days: 50,
    rank: "VIP6",
  },
  vip7: {
    teams: 500,
    level1: 350,
    totalTeamBusinessAmount: 8000000,
    amount: 2500,
    days: 70,
    rank: "VIP7",
  },
  vip8: {
    teams: 1000,
    level1: 700,
    totalTeamBusinessAmount: 10000000,
    amount: 3000,
    days: 100,
    rank: "VIP8",
  },
};

module.exports = {
  RECHARGE_COMISSION_SPONSOR,
  ALL_INCOME_TYPE_NAMES,
  RECHARGE__CONSTS,
  ROI_COMISSION,
  ROYALTY__CONSTS,
};
