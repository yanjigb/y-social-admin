import { RouteNames } from "../constants/routes";
import ROLE from "../constants/role";
import UserListPage from "../container/dashboards/users/users";
import AdvertiseListPage from "../container/dashboards/advertises/advertise";
import PostListPage from "../container/dashboards/posts/post-list";
import PaymentPage from "../container/pages/payment";
import AdvertiseDetailPage from "../container/dashboards/advertises/components/detail/advertise-detail";
import PostDetailPage from "../container/dashboards/posts/components/post-detail";
import PaymentsTablePage from "../container/dashboards/payments/payments-table";
import ProfilePage from "../container/pages/profile/profile";
import CrmPage from "../container/dashboards/crm/crm";
import PaymentHistories from "../container/dashboards/payment-histories";
import AdvertiseCollection from "../container/dashboards/advertise-collection";

export const authProtectedRoutes = [
  {
    path: RouteNames.USERS,
    component: UserListPage,
    allowRole: [ROLE.SUPER_ADMIN_PROFILE.id, ROLE.STAFF_PROFILE.id, ROLE.ADMIN_PROFILE.id]
  },
  {
    path: RouteNames.ADVERTISES || RouteNames.HOME,
    component: AdvertiseListPage,
    allowRole: [],
  },
  {
    path: RouteNames.POSTS,
    component: PostListPage,
    allowRole: []
  },
  {
    path: RouteNames.PAYMENT,
    component: PaymentPage,
    allowRole: [ROLE.SUPER_ADMIN_PROFILE.id, ROLE.STAFF_PROFILE.id, ROLE.ADMIN_PROFILE.id]
  },
  {
    path: RouteNames.ADVERTISE_DETAIL,
    component: AdvertiseDetailPage,
    allowRole: []
  },
  {
    path: RouteNames.POST_DETAIL,
    component: PostDetailPage,
    allowRole: []
  },
  {
    path: RouteNames.PAYMENTS,
    component: PaymentsTablePage,
    allowRole: [ROLE.SUPER_ADMIN_PROFILE.id, ROLE.STAFF_PROFILE.id, ROLE.ADMIN_PROFILE.id]
  },
  {
    path: RouteNames.PROFILE,
    component: ProfilePage,
    allowRole: [ROLE.SUPER_ADMIN_PROFILE.id, ROLE.STAFF_PROFILE.id, ROLE.ADMIN_PROFILE.id]
  },
  {
    path: RouteNames.CRM,
    component: CrmPage,
    allowRole: [ROLE.SUPER_ADMIN_PROFILE.id, ROLE.STAFF_PROFILE.id, ROLE.ADMIN_PROFILE.id]
  },
  {
    path: RouteNames.PAYMENT_HISTORIES,
    component: PaymentHistories,
    allowRole: []
  },
  {
    path: RouteNames.ADVERTISE_COLLECTION,
    component: AdvertiseCollection,
    allowRole: []
  },
  {
    path: RouteNames.CRM,
    component: CrmPage,
    allowRole: [ROLE.SUPER_ADMIN_PROFILE.id, ROLE.STAFF_PROFILE.id, ROLE.ADMIN_PROFILE.id]
  }
];
