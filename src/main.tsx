import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App.tsx";
import "react-quill/dist/quill.snow.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Crm from "./container/dashboards/crm/crm.tsx";
import Ecommerce from "./container/dashboards/ecommerce/ecommerce.tsx";
import Sales from "./container/dashboards/sales/sales.tsx";
import Analytics from "./container/dashboards/analytics/analytics.tsx";
import Personal from "./container/dashboards/personal/personal.tsx";
import Users from "./container/dashboards/users/users.tsx";
import Kanbanboard from "./container/task/kanbanboard/kanbanboard.tsx";
import Listview from "./container/task/listview/listview.tsx";
import Taskdetails from "./container/task/taskdetails/taskdetails.tsx";
import Alerts from "./container/uielements/alerts/alerts.tsx";
import Badge from "./container/uielements/badge/badge.tsx";
import Breadcrumb from "./container/uielements/breadcrumb/breadcrumb.tsx";
import Buttons from "./container/uielements/buttons/buttons.tsx";
import Buttongroup from "./container/uielements/buttongroup/buttongroup.tsx";
import Cards from "./container/uielements/cards/cards.tsx";
import Dropdowns from "./container/uielements/dropdowns/dropdowns.tsx";
import Imagesandfigure from "./container/uielements/imagesandfigure/imagesandfigure.tsx";
import Listgroup from "./container/uielements/listgroup/listgroup.tsx";
import Navtabs from "./container/uielements/navtabs/navtabs.tsx";
import Objectfit from "./container/uielements/objectfit/objectfit.tsx";
import Pagination from "./container/uielements/pagination/pagination.tsx";
import Popovers from "./container/uielements/popovers/popovers.tsx";
import Progress from "./container/uielements/progress/progress.tsx";
import Spinners from "./container/uielements/spinners/spinners.tsx";
import Tooltips from "./container/uielements/tooltips/tooltips.tsx";
import Avatars from "./container/utilities/avatars/avatars.tsx";
import Borders from "./container/utilities/borders/borders.tsx";
import Colors from "./container/utilities/colors/colors.tsx";
import Grids from "./container/utilities/grids/grids.tsx";
import Flex from "./container/utilities/flex/flex.tsx";
import Columns from "./container/utilities/columns/columns.tsx";
import Inputs from "./container/forms/formelements/inputs/inputs.tsx";
import Checkradios from "./container/forms/formelements/checkradios/checkradios.tsx";
import Inputgroup from "./container/forms/formelements/inputgroup/inputgroup.tsx";
import Formselect from "./container/forms/formelements/formselect/formselect.tsx";
import Rangesliders from "./container/forms/formelements/rangeslider/rangeslider.tsx";
// import Rangeslider from './container/forms/formelements/rangeslider/rangeslider.tsx'
import Fileuploads from "./container/forms/formelements/fileuploads/fileuploads.tsx";
import Datetimepicker from "./container/forms/formelements/datetimepicker/datetimepicker.tsx";
import Colorpicker from "./container/forms/formelements/colorpicker/colorpicker.tsx";
import Formlayouts from "./container/forms/formlayouts/formlayouts.tsx";
import Quilleditor from "./container/forms/formeditors/quilleditor/quilleditor.tsx";
import Select2 from "./container/forms/select2/select2.tsx";
import Validation from "./container/forms/validation/validation.tsx";
import Accordioncollapse from "./container/advancedui/accordioncollapse/accordioncollapse.tsx";
import Draggablecards from "./container/advancedui/draggablecards/draggablecards.tsx";
import Modalcloses from "./container/advancedui/modalcloses/modalcloses.tsx";
import Navbar from "./container/advancedui/navbar/navbar.tsx";
import Offcanvas from "./container/advancedui/offcanvas/offcanvas.tsx";
import Swiperjs from "./container/advancedui/swiperjs/swiperjs.tsx";
import Widgets from "./container/widgets/widgets.tsx";
import Fullacalendar from "./container/apps/fullacalendar/fullacalendar.tsx";
import Gallery from "./container/apps/gallery/gallery.tsx";
import Companies from "./container/apps/crm/companies/companies.tsx";
import Deals from "./container/apps/crm/deals/deals.tsx";
import Leads from "./container/apps/crm/leads/leads.tsx";
import Tables from "./container/tables/tables/tables.tsx";
import Gridjstables from "./container/tables/gridjstables/gridjstables.tsx";
import Datatables from "./container/tables/datatables/datatables.tsx";
import Linechart from "./container/charts/apexcharts/linechart/linechart.tsx";
import Areachart from "./container/charts/apexcharts/areachart/areachart.tsx";
import Columnchart from "./container/charts/apexcharts/columnchart/columnchart.tsx";
import Barchart from "./container/charts/apexcharts/barchart/barchart.tsx";
import Mixedchart from "./container/charts/apexcharts/mixedchart/mixedchart.tsx";
import Rangeareachart from "./container/charts/apexcharts/rangeareachart/rangeareachart.tsx";
import Timelinechart from "./container/charts/apexcharts/timelinechart/timelinechart.tsx";
import Candlestickchart from "./container/charts/apexcharts/candlestickchart/candlestickchart.tsx";
import Boxplotchart from "./container/charts/apexcharts/boxplotchart/boxplotchart.tsx";
import Bubblechart from "./container/charts/apexcharts/bubblechart/bubblechart.tsx";
import Scatterchart from "./container/charts/apexcharts/scatterchart/scatterchart.tsx";
import Heatmapchart from "./container/charts/apexcharts/heatmapchart/heatmapchart.tsx";
import Treemapchart from "./container/charts/apexcharts/treemapchart/treemapchart.tsx";
import Piechart from "./container/charts/apexcharts/piechart/piechart.tsx";
import Radialbarchart from "./container/charts/apexcharts/radialbarchart/radialbarchart.tsx";
import Polarareachart from "./container/charts/apexcharts/polarareachart/polarareachart.tsx";
import Radarchart from "./container/charts/apexcharts/radarchart/radarchart.tsx";
import Chartjs from "./container/charts/chartjs/chartjs.tsx";
import Echarts from "./container/charts/echarts/echarts.tsx";
import Leafletmaps from "./container/maps/leafletmaps/leafletmaps.tsx";
import Vectormaps from "./container/maps/vectormaps/vectormaps.tsx";
import Icons from "./container/icons/icons.tsx";
import "./index.scss";
import "react-datepicker/dist/react-datepicker.css";
import Comingsoon from "./container/authentication/comingsoon/comingsoon.tsx";
import Undermaintanace from "./container/authentication/undermaintanace/undermaintanace.tsx";
import Lockbasic from "./container/authentication/lockscreen/lockbasic/lockbasic.tsx";
import Lockcover from "./container/authentication/lockscreen/lockcover/lockcover.tsx";
import Resetbasic from "./container/authentication/resetpassword/resetbasic/resetbasic.tsx";
import Resetcover from "./container/authentication/resetpassword/resetcover/resetcover.tsx";
import Twostepbasic from "./container/authentication/twostepverification/twostepbasic/twostepbasic.tsx";
import Twostepcover from "./container/authentication/twostepverification/twostepcover/twostepcover.tsx";
import Createbasic from "./container/authentication/createpassword/basic/basic.tsx";
import Createcover from "./container/authentication/createpassword/cover/cover.tsx";
import Authenticationlayout from "./pages/authenticationlayout.tsx";
import Error401 from "./container/error/401error/401error.tsx";
import Error404 from "./container/error/404error/404error.tsx";
import Error500 from "./container/error/500error/500error.tsx";
import Ratings from "./container/advancedui/rating/rating.tsx";
import Auth from "./firebase/auth.tsx";
// import Login from "./firebase/login.tsx";
import Signup from "./firebase/signup.tsx";
import Scrollspy from "./container/advancedui/scrollspy/scrollspy.tsx";
import Indicators from "./container/uielements/indicators/indicators.tsx";
import PostDetail from "./container/dashboards/posts/components/post-detail.tsx";
import PostList from "./container/dashboards/posts/post-list.tsx";
import Advertises from "./container/dashboards/advertises/advertise.tsx";
import Profile from "./container/pages/profile/profile.tsx";
import AdvertiseDetail from "./container/dashboards/advertises/components/detail/advertise-detail.tsx";
import PaymentsTable from "./container/dashboards/payments/payments-table.tsx";
import Payment from "./container/pages/payment";
import Login from "./pages/authentication/login";
import SupportTicket from "./container/dashboards/support-ticket";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.Fragment>
    <BrowserRouter>
      <React.Suspense>
        <Routes>
          <Route path={`${import.meta.env.BASE_URL}`} element={<Auth />}>
            <Route index element={<Login />} />
            {/* <Route
              path={`${import.meta.env.BASE_URL}firebase/login`}
              element={<Login />}
            /> */}
            <Route
              path={`${import.meta.env.BASE_URL}firebase/signup`}
              element={<Signup />}
            />
          </Route>
          <Route path={`${import.meta.env.BASE_URL}`} element={<App />}>
            <Route
              path={`${import.meta.env.BASE_URL}dashboards/crm`}
              element={<Crm />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}pages/profile`}
              element={<Profile />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}dashboards/payments`}
              element={<PaymentsTable />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}pages/payment`}
              element={<Payment />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}dashboards/support-ticket`}
              element={<SupportTicket />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}dashboards/ecommerce`}
              element={<Ecommerce />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}dashboards/sales`}
              element={<Sales />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}dashboards/analytics`}
              element={<Analytics />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}dashboards/personal`}
              element={<Personal />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}dashboards/users`}
              element={<Users />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}dashboards/posts`}
              element={<PostList />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}dashboards/advertises`}
              element={<Advertises />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}dashboards/advertises/:id`}
              element={<AdvertiseDetail />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}dashboards/post/:id`}
              element={<PostDetail />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}task/kanbanboard`}
              element={<Kanbanboard />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}task/listview`}
              element={<Listview />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}task/taskdetails`}
              element={<Taskdetails />}
            />

            <Route
              path={`${import.meta.env.BASE_URL}uielements/alerts`}
              element={<Alerts />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}uielements/badge`}
              element={<Badge />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}uielements/breadcrumb`}
              element={<Breadcrumb />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}uielements/buttons`}
              element={<Buttons />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}uielements/buttongroup`}
              element={<Buttongroup />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}uielements/cards`}
              element={<Cards />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}uielements/dropdowns`}
              element={<Dropdowns />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}uielements/imagesfigures`}
              element={<Imagesandfigure />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}uielements/listgroup`}
              element={<Listgroup />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}uielements/navtabs`}
              element={<Navtabs />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}uielements/objectfit`}
              element={<Objectfit />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}uielements/pagination`}
              element={<Pagination />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}uielements/popoovers`}
              element={<Popovers />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}uielements/progress`}
              element={<Progress />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}uielements/spinners`}
              element={<Spinners />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}uielements/indicators`}
              element={<Indicators />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}uielements/tooltips`}
              element={<Tooltips />}
            />

            <Route
              path={`${import.meta.env.BASE_URL}utilities/avatars`}
              element={<Avatars />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}utilities/borders`}
              element={<Borders />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}utilities/colors`}
              element={<Colors />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}utilities/grids`}
              element={<Grids />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}utilities/flex`}
              element={<Flex />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}utilities/columns`}
              element={<Columns />}
            />

            <Route
              path={`${import.meta.env.BASE_URL}forms/formelements/inputs`}
              element={<Inputs />}
            />
            <Route
              path={`${import.meta.env.BASE_URL
                }forms/formelements/checksradios`}
              element={<Checkradios />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}forms/formelements/inputgroup`}
              element={<Inputgroup />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}forms/formelements/formselect`}
              element={<Formselect />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}forms/formelements/rangeslider`}
              element={<Rangesliders />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}forms/formelements/fileuploads`}
              element={<Fileuploads />}
            />
            <Route
              path={`${import.meta.env.BASE_URL
                }forms/formelements/datetimepicker`}
              element={<Datetimepicker />}
            />
            <Route
              path={`${import.meta.env.BASE_URL
                }forms/formelements/colorpickers`}
              element={<Colorpicker />}
            />

            <Route
              path={`${import.meta.env.BASE_URL}forms/formlayouts`}
              element={<Formlayouts />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}forms/validation`}
              element={<Validation />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}forms/select2`}
              element={<Select2 />}
            />

            <Route
              path={`${import.meta.env.BASE_URL}forms/formeditor/quilleditor`}
              element={<Quilleditor />}
            />

            <Route
              path={`${import.meta.env.BASE_URL}advancedui/accordionscollapse`}
              element={<Accordioncollapse />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}advancedui/draggablecards`}
              element={<Draggablecards />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}advancedui/modalscloses`}
              element={<Modalcloses />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}advancedui/navbar`}
              element={<Navbar />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}advancedui/offcanvas`}
              element={<Offcanvas />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}advancedui/scrollspy`}
              element={<Scrollspy />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}advancedui/ratings`}
              element={<Ratings />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}advancedui/swiperjs`}
              element={<Swiperjs />}
            />

            <Route
              path={`${import.meta.env.BASE_URL}widgets`}
              element={<Widgets />}
            />

            <Route
              path={`${import.meta.env.BASE_URL}apps/fullcalendar`}
              element={<Fullacalendar />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}apps/gallery`}
              element={<Gallery />}
            />

            <Route
              path={`${import.meta.env.BASE_URL}apps/crm/companies`}
              element={<Companies />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}apps/crm/deals`}
              element={<Deals />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}apps/crm/leads`}
              element={<Leads />}
            />

            <Route
              path={`${import.meta.env.BASE_URL}tables/tables`}
              element={<Tables />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}tables/gridjstables`}
              element={<Gridjstables />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}tables/datatables`}
              element={<Datatables />}
            />

            <Route
              path={`${import.meta.env.BASE_URL}apexcharts/linecharts`}
              element={<Linechart />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}apexcharts/areacharts`}
              element={<Areachart />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}apexcharts/columncharts`}
              element={<Columnchart />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}apexcharts/barcharts`}
              element={<Barchart />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}apexcharts/mixedcharts`}
              element={<Mixedchart />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}apexcharts/rangeareacharts`}
              element={<Rangeareachart />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}apexcharts/timelinecharts`}
              element={<Timelinechart />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}apexcharts/candlestickcharts`}
              element={<Candlestickchart />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}apexcharts/boxplotcharts`}
              element={<Boxplotchart />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}apexcharts/bubblecharts`}
              element={<Bubblechart />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}apexcharts/scattercharts`}
              element={<Scatterchart />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}apexcharts/heatmapcharts`}
              element={<Heatmapchart />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}apexcharts/treemapcharts`}
              element={<Treemapchart />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}apexcharts/piecharts`}
              element={<Piechart />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}apexcharts/radialbarcharts`}
              element={<Radialbarchart />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}apexcharts/polarareacharts`}
              element={<Polarareachart />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}apexcharts/radarcharts`}
              element={<Radarchart />}
            />

            <Route
              path={`${import.meta.env.BASE_URL}charts/chartjscharts`}
              element={<Chartjs />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}charts/echartscharts`}
              element={<Echarts />}
            />

            <Route
              path={`${import.meta.env.BASE_URL}maps/leafletmaps`}
              element={<Leafletmaps />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}maps/vectormaps`}
              element={<Vectormaps />}
            />

            <Route
              path={`${import.meta.env.BASE_URL}icons`}
              element={<Icons />}
            />
          </Route>
          <Route
            path={`${import.meta.env.BASE_URL}`}
            element={<Authenticationlayout />}
          >
            <Route
              path={`${import.meta.env.BASE_URL}authentication/comingsoon`}
              element={<Comingsoon />}
            />
            <Route
              path={`${import.meta.env.BASE_URL
                }authentication/createpassword/basic`}
              element={<Createbasic />}
            />
            <Route
              path={`${import.meta.env.BASE_URL
                }authentication/createpassword/cover`}
              element={<Createcover />}
            />

            <Route
              path={`${import.meta.env.BASE_URL
                }authentication/lockbasic/lockbasic`}
              element={<Lockbasic />}
            />
            <Route
              path={`${import.meta.env.BASE_URL
                }authentication/lockcover/lockcover`}
              element={<Lockcover />}
            />

            <Route
              path={`${import.meta.env.BASE_URL
                }authentication/resetpassword/resetbasic`}
              element={<Resetbasic />}
            />
            <Route
              path={`${import.meta.env.BASE_URL
                }authentication/resetpassword/resetcover`}
              element={<Resetcover />}
            />

            <Route
              path={`${import.meta.env.BASE_URL
                }pages/authentication/login`}
              element={<Login />}
            />

            <Route
              path={`${import.meta.env.BASE_URL
                }authentication/twostepverification/twostepbasic`}
              element={<Twostepbasic />}
            />
            <Route
              path={`${import.meta.env.BASE_URL
                }authentication/twostepverification/twostepcover`}
              element={<Twostepcover />}
            />

            <Route
              path={`${import.meta.env.BASE_URL
                }authentication/undermaintenance`}
              element={<Undermaintanace />}
            />

            <Route
              path={`${import.meta.env.BASE_URL}error/401error`}
              element={<Error401 />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}error/404error`}
              element={<Error404 />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}error/500error`}
              element={<Error500 />}
            />
          </Route>
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  </React.Fragment>
);
