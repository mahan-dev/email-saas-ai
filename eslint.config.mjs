import clerkNext from '@clerk/eslint-plugin/next'

export default [
  {
    plugins: { '@clerk/next': clerkNext },
    rules: {
      '@clerk/next/require-auth-protection': [
        'error',
        {
          protected: ['src/app/dashboard/**', 'src/actions/dashboard/**'],
          public: ['src/app/sign-in/**', 'src/app/sign-up/**'],
          resources: {
            routeHandlers: true,
            serverFunctions: true,
            serverComponentEntrypoints: false, // Skip for now.
          },
        },
      ],
    },
  },
]