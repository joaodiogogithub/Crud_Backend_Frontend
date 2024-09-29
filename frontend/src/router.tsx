import { createBrowserRouter } from 'react-router-dom'
import GeneralError from './pages/errors/general-error'
import NotFoundError from './pages/errors/not-found-error'
import MaintenanceError from './pages/errors/maintenance-error'
import UnauthorisedError from './pages/errors/unauthorised-error.tsx'
import ProtectedRoute from './protected-route.tsx'
import PublicRoute from './public-route.tsx'

const isAuthenticated = (): boolean => {
  // Check if the user is authenticated (e.g., by checking a token in localStorage)
  return localStorage.getItem('app/token') !== null;
};

const router = createBrowserRouter([
  // Auth routes
  {
    element: <PublicRoute isAuthenticated={isAuthenticated()} />,
    children: [{
      path: '/sign-in',
      lazy: async () => ({
        Component: (await import('./pages/auth/sign-in')).default,
      }),
    },
    {
      path: '/sign-in-2',
      lazy: async () => ({
        Component: (await import('./pages/auth/sign-in-2')).default,
      }),
    },
    {
      path: '/sign-up',
      lazy: async () => ({
        Component: (await import('./pages/auth/sign-up')).default,
      }),
    },
    {
      path: '/forgot-password',
      lazy: async () => ({
        Component: (await import('./pages/auth/forgot-password')).default,
      }),
    },
    {
      path: '/otp',
      lazy: async () => ({
        Component: (await import('./pages/auth/otp')).default,
      }),
    },
    ],

  },


  // Main routes
  {
    element: <ProtectedRoute isAuthenticated={isAuthenticated()} />,
    children: [
      {
        path: '/',
        lazy: async () => {
          const AppShell = await import('./components/app-shell');
          return { Component: AppShell.default };
        },
        errorElement: <GeneralError />,
        children: [
          {
            index: true,
            lazy: async () => ({
              Component: (await import('@/pages/tasks')).default,
            }),
          },

          {
              path: "create",
              lazy: async () => ({
                Component: (await import('@/pages/tasks/create-product')).default,
              }),
            },
            {
              path: "edit/:id",
              lazy: async () => ({
                Component: (await import('@/pages/tasks/edit-product')).default,
              }),
            },
          // {
          //   path: "tasks",
          //   lazy: async () => ({
          //     Component: (await import('@/pages/tasks')).default,
          //   }),
          // },
          // {
          //   path: 'chats',
          //   lazy: async () => ({
          //     Component: (await import('@/pages/chats')).default,
          //   }),
          // },
          // {
          //   path: 'apps',
          //   lazy: async () => ({
          //     Component: (await import('@/pages/apps')).default,
          //   }),
          // },
          // {
          //   path: 'users',
          //   lazy: async () => ({
          //     Component: (await import('@/components/coming-soon')).default,
          //   }),
          // },
          // {
          //   path: 'analysis',
          //   lazy: async () => ({
          //     Component: (await import('@/components/coming-soon')).default,
          //   }),
          // },
          // {
          //   path: 'extra-components',
          //   lazy: async () => ({
          //     Component: (await import('@/pages/extra-components')).default,
          //   }),
          // },
          // {
          //   path: 'settings',
          //   lazy: async () => ({
          //     Component: (await import('./pages/settings')).default,
          //   }),
          //   errorElement: <GeneralError />,
          //   children: [
          //     {
          //       index: true,
          //       lazy: async () => ({
          //         Component: (await import('./pages/settings/profile')).default,
          //       }),
          //     },
          //     {
          //       path: 'account',
          //       lazy: async () => ({
          //         Component: (await import('./pages/settings/account')).default,
          //       }),
          //     },
          //     {
          //       path: 'appearance',
          //       lazy: async () => ({
          //         Component: (await import('./pages/settings/appearance')).default,
          //       }),
          //     },
          //     {
          //       path: 'notifications',
          //       lazy: async () => ({
          //         Component: (await import('./pages/settings/notifications')).default,
          //       }),
          //     },
          //     {
          //       path: 'display',
          //       lazy: async () => ({
          //         Component: (await import('./pages/settings/display')).default,
          //       }),
          //     },
          //     {
          //       path: 'error-example',
          //       lazy: async () => ({
          //         Component: (await import('./pages/settings/error-example')).default,
          //       }),
          //       errorElement: <GeneralError className='h-[50svh]' minimal />,
          //     },
            // ],
          // },
        ],
      },
    ],
  },

  // Error routes
  { path: '/500', Component: GeneralError },
  { path: '/404', Component: NotFoundError },
  { path: '/503', Component: MaintenanceError },
  { path: '/401', Component: UnauthorisedError },

  // Fallback 404 route
  { path: '*', Component: NotFoundError },
])

export default router