import { AddressSearchKey } from "@sc-models/core";

export const apiRoutes = {
  auth: {
    profile: '/auth/profile',
    signin: `/auth/sign-in`,
    sendOtp: `/auth/send-otp`,
    resetPassword: `/auth/reset-password`,
  },
  address: {
    completeAddress: `/address-helper`,
    addressKey: (key: AddressSearchKey) => `/address-helper/${key}`,
  },
  class: {
    get: '/class',
  },
  school: {
    update: (id: string) => `/school/${id}`,
  },
};
