import { lazy, Suspense, useContext } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from 'src/layouts/dashboard';
import { curr_context } from 'src/contexts.jsx/Trainee';
// Lazy load pages
export const Info = lazy(() => import('src/pages/student_info'));
export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const Event = lazy(() => import('src/pages/events'));
export const VV = lazy(() => import('src/pages/video'));
export const PdfPage = lazy(() => import('src/pages/pdf'));
export const Signup = lazy(() => import('src/pages/Signup'));

// Context or any auth hook to check if the user is logged in



// Router component
export default function Router() {
  const now_context = useContext(curr_context)
// PrivateRoute component
function PrivateRoute({ children }) {
  let auth = now_context.traineeID ;
  return auth ? children : <Navigate to="/login" replace />;
}
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        {
          element: (
            <PrivateRoute>
              <IndexPage />
            </PrivateRoute>
          ),
          index: true,
        },
        {
          path: 'user',
          element: (
            <PrivateRoute>
              <UserPage />
            </PrivateRoute>
          ),
        },
        {
          path: 'products',
          element: (
            <PrivateRoute>
              <ProductsPage />
            </PrivateRoute>
          ),
        },
        {
          path: 'blog',
          element: (
            <PrivateRoute>
              <BlogPage />
            </PrivateRoute>
          ),
        },
        {
          path: 'info',
          element: (
            <PrivateRoute>
              <Info />
            </PrivateRoute>
          ),
        },
        {
          path: 'event',
          element: (
            <PrivateRoute>
              <Event />
            </PrivateRoute>
          ),
        },
        {
          path: 'video',
          element: (
            <PrivateRoute>
              <VV />
            </PrivateRoute>
          ),
        },
        {
          path: 'pdf',
          element: (
            <PrivateRoute>
              <PdfPage />
            </PrivateRoute>
          ),
        },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'Signup',
      element: <Signup />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
