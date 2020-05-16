import React from 'react';

const RemoteButton = React.lazy(() => import("app2/Button"));

const App: React.FC = () => {
  return <div>
    <React.Suspense fallback="Loading Button">
      app1
      <RemoteButton />
    </React.Suspense>
  </div>
}

export default App;
