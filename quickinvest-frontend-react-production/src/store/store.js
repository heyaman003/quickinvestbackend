import { configureStore } from "@reduxjs/toolkit";
import { userAuthApi } from "../services/User.Auth";
import { userWalletApi } from "../services/User.Wallet";
import { userHomeApi } from "../services/User.Home";
import { adminMemberApi } from "../services/Admin.AllUser";
import { adminRechargeApi } from "../services/AdminRecharge";
import { adminSupportApi } from "../services/Admin.Support";
import { adminDashboardApi } from "../services/Admin.Dashboard";
import { adminDepositApi } from "../services/Admin.Deposit";
import { adminEarningApi } from "../services/Admin.Earning";
import { userTeamApi } from "../services/User.Team";
import { userMineApi } from "../services/User.Mine";
import { adminWithdrawApi } from "../services/AdminWithdraw";
import { adminSettingApi } from "../services/Admin.Setting";

// import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    [userWalletApi.reducerPath]: userWalletApi.reducer,
    [userHomeApi.reducerPath]: userHomeApi.reducer,
    [userTeamApi.reducerPath]: userTeamApi.reducer,
    [adminMemberApi.reducerPath]: adminMemberApi.reducer,
    [adminRechargeApi.reducerPath]: adminRechargeApi.reducer,
    [adminSupportApi.reducerPath]: adminSupportApi.reducer,
    [adminDashboardApi.reducerPath]: adminDashboardApi.reducer,
    [adminDepositApi.reducerPath]: adminDepositApi.reducer,
    [adminEarningApi.reducerPath]: adminEarningApi.reducer,
    [userTeamApi.reducerPath]: userTeamApi.reducer,
    [userMineApi.reducerPath]: userMineApi.reducer,
    [adminWithdrawApi.reducerPath]: adminWithdrawApi.reducer,
    [adminSettingApi.reducerPath]: adminSettingApi.reducer,
  },
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      userAuthApi.middleware,
      userWalletApi.middleware,
      userHomeApi.middleware,
      userTeamApi.middleware,
      adminRechargeApi.middleware,
      adminMemberApi.middleware,
      adminSupportApi.middleware,
      adminDashboardApi.middleware,
      adminDepositApi.middleware,
      adminEarningApi.middleware,
      userTeamApi.middleware,
      userMineApi.middleware,
      adminWithdrawApi.middleware,
      adminSettingApi.middleware,
    ]),
});

// setupListeners(store.dispatch);
