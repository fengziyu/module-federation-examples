import React from "react";

const RemoteButton = React.lazy(() => import("app1/Button"));

const Button: React.FC = () => {
  return <div>
    <React.Suspense fallback="Loading Button">
      <RemoteButton text="this is app1 button"/>
    </React.Suspense>
  </div>
}

export default Button;
