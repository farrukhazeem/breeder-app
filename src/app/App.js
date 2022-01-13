import React, { Suspense, lazy } from "react";
import "./App.scss";
import { Route, Switch } from "react-router-dom";
// import Login from "./screens/auth/login/login";
// import ForgetPassword from "./screens/auth/forgetpassword/forgetpassword";
// import ChangePassword from "./screens/auth/forgetpassword/changepassword";

// import MainRegister from "./screens/auth/register/register";
// import AppLayout from "./screens/layout/layout";
// import Policy from "./screens/Policy/Policy";
// import Terms from "./screens/Policy/Terms";


// import EmpManagement from "./screens/Employees/EmpManagement";
// import EmployeeProfile from "./screens/Employees/EmployeeProfile/EmployeeProfile";
// import Inventory from "./screens/Inventory/Inventory";
// import Employee from "./screens/Employees/Employee";
// import EditEmployee from "./screens/Employees/EditEmployee";

// import AnimalManagemenet from "./screens/Animal/AnimalManagement";
// import RegisterAnimal from "./screens/Animal/RegisterAnimalProduct";
// import UpdateProduct from "./screens/Animal/UpdateProduct";
// import Profile from "./screens/Animal/Profile/Profile";
// import ProfileShared from "./screens/Animal/ProfileShared/Profile";
// import ProfileSharedProduct from "./screens/Animal/ProfileShared/ProfileProduct";

// import Spinner from "./components/spinner/spinner";
// import Subscription from "./screens/subscription/Subscription";
// import GroupList from "./screens/groupManagement/groupList/GroupList";
// import GroupDetail from "./screens/groupManagement/groupDetail/GroupDetail";

// import Notification from "./screens/Notification/Notification";
// import CreateNotification from "./screens/Notification/CreateNotification";
// import Settings from "./screens/settings/Settings";
// import FormList from "./screens/formsManagement/formsList/FormList";
// import ContactList from "./screens/contactmanagement/contactList/ContactList";

// import Reports from "./screens/Report/Reports";
// import ActivityManagement from "./screens/ActivityManagement/ActivityManagement";
// import FormData from "./screens/formsManagement/Form/FormData";
// import BusinessProfile from "./screens/BusinessProfile/BusinessProfile";


// import SalesManagement from "./screens/CRM/SalesManagement/SalesManagement";
// import NewSale from "./screens/CRM/SalesManagement/NewSale";
// import AddNewSale from "./screens/CRM/SalesManagement/addNewSale/addNewSale";
// import CustomerProfile from "./screens/CRM/SalesManagement/CustomerProfile";
// import OrderDetail from "./screens/CRM/SalesManagement/orderDetail/OrderDetail";
// import Product from "./screens/Product/Product";
// import ProductDetail from "./screens/Product/ProductDetail";
// import EmailVerification from "./screens/auth/EmailVerification";


//Admin
// import AppLayoutAdmin from "./screens/layout/adminLayout";
// import AdminSetting from "./screens/ADMIN/Setting/Setting";
// import AdminNotification from "./screens/ADMIN/Notification/Notification";
// import AdminCreateNotification from "./screens/ADMIN/Notification/CreateNotification";

// import AdminCreatePackage from "./screens/ADMIN/PackageManagement/NewPackage";
// import AdminPackageManagement from "./screens/ADMIN/PackageManagement/PackageManagement";

// import AdminAccountManagement from "./screens/ADMIN/AccountManagement/AccountManagement";
// import AdminAccountViewMain from "./screens/ADMIN/AccountManagement/ViewDetail/ViewMain";
// import AdminDashboard from "./screens/ADMIN/Dashboard/Dashboard";

// import AdminFormManagement from "./screens/ADMIN/Form/FormManagement";
// import AdminCreateForm from "./screens/ADMIN/Form/CreateForm/CreateForm";
// import AdminFormMain from "./screens/ADMIN/Form/CreateForm/FormMain";
// import AdminFormMain2 from "./screens/ADMIN/CategoryManagement/CreateCategory/FormMain";
// import AdminActivityManagement from "./screens/ADMIN/Activity Management/ActivityManagement";

import loginAuth from "./hoc/loginAuth";
import PrivateRoute from "./hoc/privateRoute";
import adminLoginAuth from "./hoc/adminLoginAuth";
import landingPageAuth from "./hoc/landingPage";
// import AdminReport from "./screens/ADMIN/Report/Report";
// import AppWizard from "./screens/App_Wizard";
// import QuickAccess from "./screens/QuickAccess/QuickAccess";
// import About from "./screens/About";
// import AdminLogin from "./screens/ADMIN/AdminLogin";

// import CategoryManagement from "./screens/ADMIN/CategoryManagement";
// import CreateCategory from "./screens/ADMIN/CategoryManagement/CreateCategory";
// import PageBusiness from "./screens/Logly/PageBusiness";


import firebase from "../firebase";


import Auth from "./hoc/auth";
// import LandingPage from "./screens/LandingPage/LandingPage";
const LandingPage = lazy(() => import('./screens/LandingPage/LandingPage'));
const Dashboard = lazy(() => import('./screens/Dashboard/Dashboard'));

const Login = lazy(() => import('./screens/auth/login/login'));
const ForgetPassword = lazy(() => import('./screens/auth/forgetpassword/forgetpassword'));
const ChangePassword = lazy(() => import('./screens/auth/forgetpassword/changepassword'));

const MainRegister = lazy(() => import('./screens/auth/register/register'));
const AppLayout = lazy(() => import('./screens/layout/layout'));
const Policy = lazy(() => import('./screens/Policy/Policy'));
const Terms = lazy(() => import('./screens/Policy/Terms'));

const EmpManagement = lazy(() => import('./screens/Employees/EmpManagement'));
const EmployeeProfile = lazy(() => import('./screens/Employees/EmployeeProfile/EmployeeProfile'));
const Inventory = lazy(() => import('./screens/Inventory/Inventory'));
const Employee = lazy(() => import('./screens/Employees/Employee'));
const EditEmployee = lazy(() => import('./screens/Employees/EditEmployee'));

const AnimalManagemenet = lazy(() => import('./screens/Animal/AnimalManagement'));
const RegisterAnimal = lazy(() => import('./screens/Animal/RegisterAnimalProduct'));
const UpdateProduct = lazy(() => import('./screens/Animal/UpdateProduct'));
const Profile = lazy(() => import('./screens/Animal/Profile/Profile'));
const ProfileShared = lazy(() => import('./screens/Animal/ProfileShared/Profile'));
const ProfileSharedProduct = lazy(() => import('./screens/Animal/ProfileShared/ProfileProduct'));

const Spinner = lazy(() => import('./components/spinner/spinner'));
const Subscription = lazy(() => import('./screens/subscription/Subscription'));
const GroupList = lazy(() => import('./screens/groupManagement/groupList/GroupList'));
const GroupDetail = lazy(() => import('./screens/groupManagement/groupDetail/GroupDetail'));

const Notification = lazy(() => import('./screens/Notification/Notification'));
const CreateNotification = lazy(() => import('./screens/Notification/CreateNotification'));
const Settings = lazy(() => import('./screens/settings/Settings'));
const FormList = lazy(() => import('./screens/formsManagement/formsList/FormList'));
const ContactList = lazy(() => import('./screens/contactmanagement/contactList/ContactList'));

const Reports = lazy(() => import('./screens/Report/Reports'));
const ActivityManagement = lazy(() => import('./screens/ActivityManagement/ActivityManagement'));
const FormData = lazy(() => import('./screens/formsManagement/Form/FormData'));
const BusinessProfile = lazy(() => import('./screens/BusinessProfile/BusinessProfile'));


const SalesManagement = lazy(() => import('./screens/CRM/SalesManagement/SalesManagement'));
const AddNewSale = lazy(() => import('./screens/CRM/SalesManagement/addNewSale/addNewSale'));
const CustomerProfile = lazy(() => import('./screens/CRM/SalesManagement/CustomerProfile'));
const OrderDetail = lazy(() => import('./screens/CRM/SalesManagement/orderDetail/OrderDetail'));
const Product = lazy(() => import('./screens/Product/Product'));
const ProductDetail = lazy(() => import('./screens/Product/ProductDetail'));
const EmailVerification = lazy(() => import('./screens/auth/EmailVerification'));


const AppLayoutAdmin = lazy(() => import('./screens/layout/adminLayout'));
const AdminSetting = lazy(() => import('./screens/ADMIN/Setting/Setting'));
const AdminNotification = lazy(() => import('./screens/ADMIN/Notification/Notification'));
const AdminCreateNotification = lazy(() => import('./screens/ADMIN/Notification/CreateNotification'));

const AdminCreatePackage = lazy(() => import('./screens/ADMIN/PackageManagement/NewPackage'));
const AdminPackageManagement = lazy(() => import('./screens/ADMIN/PackageManagement/PackageManagement'));

const AdminAccountManagement = lazy(() => import('./screens/ADMIN/AccountManagement/AccountManagement'));
const AdminAccountViewMain = lazy(() => import('./screens/ADMIN/AccountManagement/ViewDetail/ViewMain'));
const AdminDashboard = lazy(() => import('./screens/ADMIN/Dashboard/Dashboard'));

const AdminFormManagement = lazy(() => import('./screens/ADMIN/Form/FormManagement'));
const AdminCreateForm = lazy(() => import('./screens/ADMIN/Form/CreateForm/CreateForm'));
const AdminFormMain = lazy(() => import('./screens/ADMIN/Form/CreateForm/FormMain'));
const AdminFormMain2 = lazy(() => import('./screens/ADMIN/CategoryManagement/CreateCategory/FormMain'));
const AdminActivityManagement = lazy(() => import('./screens/ADMIN/Activity Management/ActivityManagement'));

const AdminReport = lazy(() => import('./screens/ADMIN/Report/Report'));
const AppWizard = lazy(() => import('./screens/App_Wizard'));
const QuickAccess = lazy(() => import('./screens/QuickAccess/QuickAccess'));
const About = lazy(() => import('./screens/About'));
const AdminLogin = lazy(() => import('./screens/ADMIN/AdminLogin'));

const CategoryManagement = lazy(() => import('./screens/ADMIN/CategoryManagement'));
const CreateCategory = lazy(() => import('./screens/ADMIN/CategoryManagement/CreateCategory'));
const PageBusiness = lazy(() => import('./screens/Logly/PageBusiness'));


function App() {


  function notifyMe() {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (window.Notification.permission === "granted") {
      // If it's okay let's create a notification

      var notification = new window.Notification("Hi there!");
    }

    // Otherwise, we need to ask the user for permission
    else if (window.Notification.permission !== "denied") {
      window.Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification

        if (permission === "granted") {
          var notification = new window.Notification("Hi there!");
        }
      });
    }

    // At last, if the user has denied notifications, and you
    // want to be respectful there is no need to bother them any more.
  }

  // notifyMe();
  React.useEffect(() => {
    console.log('calling firebase messageing');
    try {
      const msg = firebase.messaging();
      // window.Notification.requestPermission()
      console.log(msg);
      if (!("Notification" in window)) {
        console.log("This browser does not support desktop notification");
      } else {
        console.log('This browser support');
      }

      window.Notification.requestPermission().then(() => {
        console.log('requesting permission');
      })
      msg
        .requestPermission()
        .then(() => {
          console.log('My token after permission is : ', msg.getToken());
          return msg.getToken();
        })
        .then((data) => {
          console.warn("token ", data);
          localStorage.setItem("deviceToken", data);
        })
        .catch((error) => {
          localStorage.setItem("deviceToken", null);
        });
    }
    catch (err) {
      console.log("Notification err", err)
    }
  });
  return (
    <div className="default-theme">
      <Suspense fallback={<></>}>
        <Spinner>
          <Switch>

            <Route
              exact
              path="/"
              component={landingPageAuth(LandingPage)}
            />
            <Route
              exact
              path="/LandingPage"
              component={landingPageAuth(LandingPage)}
            />

            <Route
              exact
              path="/loglyBusiness"
              component={PageBusiness}
            />

            <Route
              exact
              path="/loglyPetlover"
              component={PageBusiness}
            />

            <Route
              exact
              path="/loglyNonprofit"
              component={PageBusiness}
            />

            <Route
              exact
              path="/policy"
              component={Policy}
            />

            <Route
              exact
              path="/terms"
              component={Terms}
            />

            <Route exact path="/login" component={loginAuth(Login)} />
            <Route
              exact
              path="/user/verify/:id"
              component={EmailVerification}
            />

            <Route
              exact
              path="/setupWizard"
              component={Auth(AppWizard, true, true)}
            />

            <Route exact path="/forgetpassword" component={ForgetPassword} />
            {/* <Route
              exact
              path="/changepassword"
              component={ChangePassword}
            /> */}
            <Route
              exact
              path="/changepassword/:token"
              component={ChangePassword}
            />
            <Route exact path="/register" component={MainRegister} />

            {/* <Route path="/admin/:path?*" exact> */}
            <Route exact path="/admin/login" component={adminLoginAuth(AdminLogin)} />
            <PrivateRoute path="/admin">
              <AppLayoutAdmin>
                <Route path="/admin/settings" component={Auth(AdminSetting)} />

                <Route
                  exact
                  path="/admin/notification"
                  component={Auth(AdminNotification)}
                />
                <Route
                  exact
                  path="/admin/notification/create"
                  component={AdminCreateNotification}
                />

                <Route
                  exact
                  path="/admin/package"
                  component={Auth(AdminPackageManagement)}
                />
                <Route
                  exact
                  path="/admin/package/create"
                  component={AdminCreatePackage}
                />

                <Route
                  exact
                  path="/admin/package/edit"
                  component={AdminCreatePackage}
                />

                <Route
                  exact
                  path="/admin/account"
                  component={Auth(AdminAccountManagement)}
                />
                <Route
                  exact
                  path="/admin/account/detail"
                  component={Auth(AdminAccountViewMain)}
                />

                <Route
                  exact
                  path="/admin/dashboard"
                  component={Auth(AdminDashboard)}
                />



                <Route
                  exact
                  path="/admin/category"
                  component={Auth(CategoryManagement)}
                />
                <Route
                  exact
                  path="/admin/category/main"
                  component={Auth(AdminFormMain2)}
                />
                <Route
                  exact
                  path="/admin/category/create"
                  component={CreateCategory}
                />
                <Route
                  exact
                  path="/admin/category/edit"
                  component={CreateCategory}
                />
                <Route
                  exact
                  path="/admin/form"
                  component={AdminFormManagement}
                />
                <Route
                  exact
                  path="/admin/form/main"
                  component={Auth(AdminFormMain)}
                />
                <Route
                  exact
                  path="/admin/form/edit"
                  component={AdminCreateForm}
                />
                <Route
                  exact
                  path="/admin/form/create"
                  component={AdminCreateForm}
                />

                <Route exact path="/admin/report" component={Auth(AdminReport)} />

                <Route exact path="/admin/activity" component={Auth(AdminActivityManagement)} />
              </AppLayoutAdmin>
            </PrivateRoute>
            {/* </Route> */}

            <Route exact path="/register" component={MainRegister} />
            {/* <AppLayout isDrawerEnable={true}> */}
            <Route exact path="/main" component={Auth(QuickAccess, true)} />
            {/* </AppLayout> */}

            <Route
              exact
              path="/animalProfile/:id"
              // 5fcf2de5276833f19153bcaa
              component={ProfileShared}
            />

            <Route
              exact
              path="/productProfile/:id"
              component={ProfileSharedProduct}
            />



            <AppLayout isDrawerEnable={true}>
              <Route exact path="/about" component={Auth(About, true)} />

              <Route
                exact
                path="/dashboard"
                component={Auth(Dashboard, true)}
              />
              <Route
                exact
                path="/employees"
                component={Auth(EmpManagement, true)}
              />
              <Route
                exact
                path="/employees/employee/:id"
                component={Auth(EmployeeProfile, true)}
              />
              <Route
                exact
                path="/employees/add-employee"
                component={Auth(Employee, true)}
              />
              <Route
                exact
                path="/employees/edit-employee"
                component={Auth(Employee, true)}
              />
              <Route
                exact
                path="/inventory"
                component={Auth(Inventory, true)}
              />

              {/* Animal Routes */}
              <Route
                exact
                path="/animal"
                component={Auth(AnimalManagemenet, true)}
              />
              <Route
                exact
                path="/animal/register"
                component={Auth(RegisterAnimal, true)}
              />
              <Route
                exact
                path="/animal/profile"
                component={Auth(Profile, true)}
              />


              {/* Groups Routes */}
              <Route exact path="/groups" component={Auth(GroupList, true)} />
              <Route
                exact
                path="/groups/detail"
                component={Auth(GroupDetail, true)}
              />
              <Route
                exact
                path="/groups/create"
                component={Auth(GroupDetail, true)}
              />

              <Route
                exact
                path="/groups/detail/:id"
                component={Auth(GroupDetail, true)}
              />

              {/* Notification Routes */}
              <Route
                exact
                path="/notification"
                component={Auth(Notification, true)}
              />
              <Route
                exact
                path="/notification/create"
                component={Auth(CreateNotification, true)}
              />

              {/* Subscription Routes */}
              <Route
                exact
                path="/subscription"
                component={Auth(Subscription, true)}
              />

              {/* Reports Routes */}
              <Route exact path="/reports" component={Auth(Reports, true)} />

              {/* Activity Management Routes */}
              <Route
                exact
                path="/activity-management"
                component={Auth(ActivityManagement, true)}
              />

              {/* User Routes */}
              <Route exact path="/settings" component={Auth(Settings, true)} />
              <Route
                exact
                path="/businessprofile"
                component={Auth(BusinessProfile, true)}
              />

              {/* Contact Routes */}
              <Route
                exact
                path="/contact"
                component={Auth(ContactList, true)}
              />

              {/* Product Routes */}
              <Route exact path="/product" component={Auth(Product, true)} />
              <Route
                exact
                path="/product/detail"
                component={Auth(ProductDetail, true)}
              />
              <Route
                exact
                path="/product/register"
                component={Auth(RegisterAnimal, true)}
              />
              <Route
                exact
                path="/product/register/:id/:categoryId"
                component={Auth(UpdateProduct, true)}
              />

              {/* Forms Routes */}
              <Route exact path="/form" component={Auth(FormList, true)} />
              <Route
                exact
                path="/form/create"
                component={Auth(FormData, true)}
              />
              <Route exact path="/form/edit" component={Auth(FormData, true)} />

              {/* Sales/CRM Routes */}
              <Route
                exact
                path="/sales"
                component={Auth(SalesManagement, true)}
              />
              {/* <Route exact path="/sales/new-sale" component={Auth(NewSale, true)} /> */}
              <Route
                exact
                path="/sales/new-sale"
                component={Auth(AddNewSale, true)}
              />
              <Route
                exact
                path="/sales/customer/profile"
                component={Auth(CustomerProfile, true)}
              />
              <Route
                exact
                path="/sales/order-detail"
                component={Auth(OrderDetail, true)}
              />

              {/* For Admin ... ####### */}

              {/* ##################### */}
            </AppLayout>
          </Switch>
        </Spinner>
      </Suspense>
    </div>
  );
}

export default App;
