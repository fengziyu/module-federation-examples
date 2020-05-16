import React from 'react';

const RemoteButton = React.lazy(() => import("remote/Button"));

const App: React.FC = () => {
  return <div>
    <React.Suspense fallback="Loading Button">
      host
      <RemoteButton />
    </React.Suspense>
  </div>
}

export default App;
