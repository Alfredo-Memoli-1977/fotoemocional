import { createBrowserRouter, Navigate } from "react-router-dom";
import { PhotosLayouts } from "./photos/layouts/PhotosLayouts";
import { HomePage } from "./photos/pages/home/HomePage";
import { GalleryPage } from "./photos/pages/gallery/GalleryPage";
import { AboutPage } from "./photos/pages/about/AboutPage";
import { ContactPage } from "./photos/pages/contact/ContactPage";
import { PhotoPage } from "./photos/pages/gallery/PhotoPage";
import { AuthLayouts } from "./auth/layouts/AuthLayouts";
import { LoginPage } from "./auth/pages/login/LoginPage";
import { RegisterPage } from "./auth/pages/register/RegisterPage";
import { AdminLayouts } from "./admin/layouts/AdminLayouts";
import { AdminPhotosPage } from "./admin/pages/AdminPhotosPage";
import { AdminUserPage } from "./admin/pages/AdminUserPage";
import {
  AdminRoute,
  NotAuthenticatedRoutes,
} from "./components/routes/ProtectedRoutes";
import { AdminPhotoEditor } from "./admin/pages/AdminPhotoEditor";

export const apprRouter = createBrowserRouter([
  {
    //Main routes
    path: "/",
    element: <PhotosLayouts />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "gallery",
        element: <GalleryPage />,
      },
      {
        path: "about/",
        element: <AboutPage />,
      },
      {
        path: "contact/",
        element: <ContactPage />,
      },
      {
        path: "photo/:id",
        element: <PhotoPage />,
      },
    ],
  },

  //Auth Routes
  {
    path: "/auth",

    element: (
      <NotAuthenticatedRoutes>
        <AuthLayouts />
      </NotAuthenticatedRoutes>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login" />, //esto nos redirige en caso de entrar a auth
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
  //Admin Routes
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminLayouts />
      </AdminRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/admin/photos" />,
      },
      {
        path: "photos",
        element: <AdminPhotosPage />,
      },
      {
        path: "users",
        element: <AdminUserPage />,
      },
      {
        path: "photo-editor",
        element: <AdminPhotoEditor />,
      },
    ],
  },

  //En caso de no existir la pagina
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
