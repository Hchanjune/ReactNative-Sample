export type NavigationTypes = {
  LoadingScreen: undefined,
  LoginScreen: undefined,
  HomeScreen: {
    photoUri?: string
  },
  UserRegisterScreen: {
    companyNameList : CompanyNameList;
  },

}
