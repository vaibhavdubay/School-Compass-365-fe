export const apiRoutes = {
  auth: {
    profile: '/auth/profile',
    signin: `/auth/sign-in`,
  },
  class: {
    get: '/class',
  },
  school: {
    update: (id: string) => `/school/${id}`,
  },
};
