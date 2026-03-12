// import { getStoredUser } from "./getUser";
// import { canAccessDashboard, canAccessEntryOfficer } from "./role";



// export function guardDashboard() {
//   const user = getStoredUser();

//   if (!user) return "/auth/login";

//   if (!canAccessDashboard(user.role)) {
//     return "/entry-officer";
//   }

//   return null;
// }

// export function guardEntryOfficer() {
//   const user = getStoredUser();

//   if (!user) return "/auth/login";

//   if (!canAccessEntryOfficer(user.role)) {
//     return "/dashboard";
//   }

//   return null;
// }